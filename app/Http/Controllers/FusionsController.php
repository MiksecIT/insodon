<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Don;
use \App\Models\Reward;
use \App\Models\User;
use \App\Models\Fusion;
use \App\Utils\Utils;
use RealRashid\SweetAlert\Facades\Alert;

class FusionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $fusions = [];
        if (auth()->user()->isPartOfAdmin()) {
            $fusions = Fusion::all();
            if (auth()->user()->isRoot()) {
                $fusions = Fusion::withTrashed()->get();
            }
        } else {
            $fusions = auth()->user()->relatedFusions();
        }
        if (count($fusions) == 0) {
            alert()->info('Vide',"Aucune association disponible pour l'instant")->persistent();
        }
        return view('pages.fusions.index', compact('fusions'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isTopManager()) {
            return view('pages.fusions.create');
        }
        abort(404);
    }

    /**
     * Confirm an association transaction
     *
     * @param Request $request
     * @return void
     */
    public function confirm (Request $request)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if ($request->has('ack') && $request->has('r')) {
            if (
                is_null(\App\Utils\Utils::appSettings()->reward_don_factor) && 
                is_null(\App\Utils\Utils::appSettings()->reward_don_delay) && 
                \App\Utils\Utils::appSettings()->reward_don_factor > 0 && 
                \App\Utils\Utils::appSettings()->reward_don_delay > 0) {

                alert()->error("Erreur", "[Set] Impossible de continuer, veuillez contacter les administrateurs")->persistent();
                return \Redirect::back();

            }

            $fusion = Fusion::where('reference', $request->ack)->first();
            
            if (is_null($fusion)) {
                alert()->error("Erreur", "Impossible de trouver l'association demandée")->persistent();
                return \Redirect::back();
            }

            if (is_null($fusion->don) || is_null($fusion->reward)) {
                alert()->error("Erreur", "Impossible de trouver le don ou la recompense associé.")->persistent();
                return \Redirect::back();
            }

            if ($fusion->isCompleted()) {
                alert()->error("Erreur", "Cette association a déjà été envoyée et reçue.")->persistent();
                return \Redirect::back();
            }

            if (is_null($fusion->don->pack) ) {
                alert()->error("Erreur", "Impossible de trouver le pack associé.")->persistent();
                return \Redirect::back();
            }

            if (is_null($fusion->don->pack->amount) || is_null($fusion->don->pack->amount) || $fusion->don->pack->amount == "" || $fusion->don->pack->amount_usd == "") {
                alert()->error("Erreur", "Le montant du pack associé n'est pas correcte.")->persistent();
                return \Redirect::back();
            }

            if (is_null($fusion->don->user) || is_null($fusion->reward->user)) {
                alert()->error("Erreur", "Impossible de trouver l'expéditeur ou le destinataire associé.")->persistent();
                return \Redirect::back();
            }

            if ($fusion->don->user->id == $fusion->reward->user->id) {
                alert()->error("Erreur", "L'expéditeur et le destinataire sont identiques.")->persistent();
                return \Redirect::back();
            }

            if (!in_array($request->r, ['in', 'out'])) {
                alert()->error("Erreur", "Impossible de continuer, type de transaction inconnue. Veuillez les administrateurs.")->persistent();
                return \Redirect::back();
            }

            if (is_null($fusion->sender()) || is_null($fusion->receiver())) {
                alert()->error("error", "Impossible de continuer, expéditeur ou destinataire introuvable")->persistent();
                return \Redirect::back();
            }

            # Only involved users can confirm
            abort_unless (auth()->user()->id == $fusion->sender()->id || auth()->user()->id == $fusion->receiver()->id, 403);

            # Confirm sent
            if (
                $request->r == "out" && 
                $fusion->isSent() == false && 
                $fusion->isReceived() == false && 
                auth()->user()->id == $fusion->sender()->id
                ) {

                $fusion->is_sent = 1;
                $fusion->sent_at = now();
                $fusion->status = "pending_receiver";
                $fusion->status_at = now();
                $fusion->status_comment = "Waiting receiver to confirm";
                $fusion->save();

                alert()->success("Envoi confirmé", "Félicitations ".$fusion->sender()->name." !! Vous avez confirmé l'envoi du montant de cette transaction. Veuillez patienter le temps que ".$fusion->receiver()->name." confirme la reception.")->persistent();
                return redirect()->route("associations.index");
            }

            # Confirm receipt
            elseif (
                    $request->r == "in" && 
                    $fusion->isSent() && 
                    $fusion->isReceived() == false && 
                    auth()->user()->id == $fusion->receiver()->id
                ) {

                $fusion->is_received = 1;
                $fusion->received_at = now();
                $fusion->status = "completed";
                $fusion->status_at = now();
                $fusion->status_comment = "Transaction complete";
                $fusion->save();

                # Updating don
                # Creating a reward if don completed
                if ($fusion->don->isCompleted()) {
                    $fusion->don->is_sent = 1;
                    $fusion->don->last_sent_at = $fusion->received_at;
                    $fusion->don->status = "completed";
                    $fusion->don->save();

                    # Generating royalty (bonus) for fusion don user's parent
                    if (\App\Utils\Utils::appSettings()->enable_royalties) {
                        if ($fusion->don->isFirst()) {
                            # Make sure current has a parent
                            if (!is_null($fusion->don->user->parent)) {
                                $existingRoyalties = \App\Models\Royalty::where("don_id", $fusion->don->id)->where("user_id", $fusion->don->user->id)->get();
                                if (count($existingRoyalties) == 0) {
                                    $royalty = \App\Models\Royalty::create([
                                        "reference" => \App\Utils\Utils::generateReference(\App\Models\Royalty::all(), \App\Utils\Utils::fakeToken(20), 1),
                                        "don_id" => $fusion->don->id,
                                        "reward_id" => null, 
                                        "target" => $fusion->don->user->parent->id,
                                        "user_id" => $fusion->don->user->id,
                                        "is_usd" => $fusion->don->is_usd == 1 ? 1 : 0,
                                        "value" => intval(round(\App\Utils\Utils::appSettings()->royalties_percent * $fusion->don->amount / 100, 0, PHP_ROUND_HALF_UP)),
                                        "created_at" => now(),
                                        "updated_at" => now(),
                                    ]);
                                }
                            }
                        }
                    }

                    # Creating Reward for don
                    $existingRewards = Reward::where("don_id", $fusion->don->id)->where("user_id", $fusion->don->user->id)->get();
                    if (count($existingRewards) == 0) {
                        $reward = Reward::create([
                            "reference" => \App\Utils\Utils::generateReference(Reward::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $fusion->don->id,
                            "is_usd" => $fusion->don->is_usd == 1 ? 1 : 0, 
                            "source" => "don",
                            "user_id" => $fusion->don->user->id,
                            "status" => "pending_fusion",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);
                        # Amount according to given currency
                        if ($reward->is_usd) {
                            if ($fusion->don->isFirst()) {
                                $reward->amount = $fusion->don->pack->amount_usd;
                                $reward->save();
                            } else {
                                $reward->amount = \App\Utils\Utils::appSettings()->reward_don_factor * $fusion->don->pack->amount_usd;
                                $reward->save();
                            }
                        } else {
                            if ($fusion->don->isFirst()) {
                                $reward->amount = $fusion->don->pack->amount;
                                $reward->save();
                            } else {
                                $reward->amount = \App\Utils\Utils::appSettings()->reward_don_factor * $fusion->don->pack->amount;
                                $reward->save();
                            }
                        }
                    }                    
                }

                # Updating reward
                if ($fusion->reward->isCompleted()) {
                    $fusion->reward->status = "completed";
                    $fusion->reward->is_received = 1;
                    $fusion->reward->last_received_at = $fusion->received_at;
                    $fusion->reward->save();

                    # Creating royalties for reward user's parent
                    if (\App\Utils\Utils::appSettings()->enable_royalties) {
                        # Updating related royalties that are valid and waiting payment
                        if ($fusion->reward->source == "bonus" && $fusion->reward->isInitiale() == false) {
                            $fusion->reward->completeRoyalties();
                        }
                    }
                }

                alert()->success("Reception confirmé", "Félicitations ".$fusion->receiver()->name." !! Vous avez confirmé la reception du montant envoyé par ".$fusion->sender()->name.".")->persistent();               
                return redirect()->route("associations.index");
            }
            # Unknown
            else {
                alert()->error("Erreur", "Impossible de confirmer, veuillez contacter les administrateurs si cela persiste.")->persistent();
                return \Redirect::back();
            } 
        } else {
            alert()->error("Erreur", "Un ou plusieurs champs manquants dans la requête.")->persistent();
            return \Redirect::back();
        }
    }

    /**
     * Create a reward to take the amount of given don and automatically create a fusion
     */
    public function createFromDonButRewardFirst(Request $request)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isTopManager()) {
            if ($request->has('ack') && $request->has('rec')) {
                $don = Don::where('reference', $request->ack)->first();
                $receiver = User::where('reference', $request->rec)->first();
                if (is_null($don)) {
                    alert()->error("Introuvable", "Impossible de trouver le don demandé")->persistent();
                    return \Redirect::back();
                }

                if ($don->hasFusions()) {
                    alert()->error("Erreur", "Impossible de continuer, le don demandé a au moins une association")->persistent();
                    return \Redirect::back();
                }
                
                if (is_null($receiver)) {
                    alert()->error("Introuvable", "Impossible de trouver le bénéficiaire renseigné")->persistent();
                    return \Redirect::back();
                }

                if (is_null($don->pack)) {
                    alert()->error("Introuvable", "Impossible de trouver le pack du don demandé")->persistent();
                    return \Redirect::back();
                }
                
                if (is_null($don->pack->amount) || is_numeric($don->pack->amount) == false) {
                    alert()->error("Erreur", "Le montant du don est nul")->persistent();
                    return \Redirect::back();
                }

                if (is_null($don->user)) {
                    alert()->error("Erreur", "Impossible de trouver l'utilisateur du don demandé")->persistent();
                    return \Redirect::back();
                }

                if ($don->user->id == $receiver->id) {
                    alert()->error("Erreur", "Impossible de continuer, le donateur et le bénéficiaire sont identiques")->persistent();
                    return \Redirect::back();
                }

                if (is_null(\App\Utils\Utils::appSettings()->reward_don_factor) || is_numeric(\App\Utils\Utils::appSettings()->reward_don_factor) == false || is_numeric(\App\Utils\Utils::appSettings()->reward_don_delay) == false || is_null(\App\Utils\Utils::appSettings()->reward_don_delay)) {
                    alert()->error("Erreur", "Impossible de continuer.\n\n Veuillez renseigner les valeurs suivantes dans les paramètres avant de continuer.\n\n > Le facteur de récompense \n > Le délai de maturité d'une récompense avant fusion.")->persistent();
                    return \Redirect::back();
                }

                if (count(\App\Utils\Utils::notFusionedRewards()) == 0) {
                    $reward = Reward::create([
                        "reference" => \App\Utils\Utils::generateReference(Reward::all(), \App\Utils\Utils::fakeToken(20), 1),
                        "don_id" => null, 
                        "source" => "don",
                        "user_id" => $receiver->id,
                        "amount" => $don->is_usd ? $don->pack->amount_usd : $don->pack->amount,
                        "status" => "pending_fusion",
                        "created_at" => \Carbon\Carbon::parse(now())->subDays(\App\Utils\Utils::appSettings()->reward_don_delay + 1),
                        "updated_at" => now(),
                    ]);

                    ## Creating fusion
                    $fusion = Fusion::create([
                        "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                        "don_id" => $don->id,
                        "reward_id" => $reward->id,
                        "sender" => $don->user->id, 
                        "receiver" => $receiver->id,
                        "amount" => $reward->amount, 
                        "source" => "don",
                        "user_id" => auth()->user()->id,
                        "status" => "pending_sender",
                        "status_comment" => "Reward created manually to receive a don",
                        "created_at" => now(),
                        "updated_at" => now(),
                    ]);

                    alert()->success("Bravo!", "L'association a été effectué avec succès. En attente de la confirmation des deux correspondants.")->persistent();
                    return redirect()->route('associations.index');

                } else {
                    alert()->error("Erreur", "Toutes les recompenses ont été fusionées.")->persistent();
                    return \Redirect::back();
                }
            } else {
                alert()->error("Erreur", "Un ou plusieurs champs manquants dans la requête.")->persistent();
                return \Redirect::back();
            }
        }
        abort(404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createFromDon($reference)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            $don = Don::where("reference", $reference)->first();
            abort_unless (!is_null($don), 404);

            $rewards = Reward::orderByDesc("created_at")->get();

            if (count($rewards) == 0) {
                alert()->error("Impossible de continuer", "Pas de recompense disponible pour le moment")->persistent();
                return \Redirect::back();
            }

            if ($don->isCompleted()) {
                alert()->error("Impossible de continuer", "Ce don a déjà été totalement envoyé par le donateur")->persistent();
                return \Redirect::back();
            }
            
            if ($don->isFusioned()) {
                alert()->error("Impossible de continuer", "Ce don a déjà été totalement associé")->persistent();
                return \Redirect::back();
            }

            if (is_null($don->user)) {
                alert()->error("Impossible de continuer", "Le donateur est introuvable")->persistent();
                return \Redirect::back();
            }

            if (is_null($don->pack)) {
                alert()->error("Impossible de continuer", "Le pack associé est introuvable")->persistent();
                return \Redirect::back();
            }

            if (count(\App\Utils\Utils::notFusionedRewards()) == 0) {
                alert()->error("Impossible de continuer", "Il n'y a pas de recompense en attente actuellement.")->persistent();
                return \Redirect::back();
            }

            $country = [];
            $countries = [];
            $suggested = [];
            
            foreach ($rewards as $reward) {
                if (!is_null($reward->user) && $don->is_usd == $reward->is_usd) {
                    if ($don->user_id != $reward->user_id) {
                        if ($reward->isReady() && $reward->isFusioned() == false && $reward->isCompleted() == false) {
                            if ($don->user->country_id == $reward->user->country_id) {
                                # Newly created don
                                if ($don->remaining_amount == 0 || !is_null($don->remaining_amount)) {
                                    # New created reward
                                    if ($reward->remaining_amount == 0 || !is_null($reward->remaining_amount)) {                                    
                                        if ($don->amount >= $reward->amount) {
                                            array_push($suggested, $reward);
                                        } else {
                                            array_push($country, $reward);
                                        }
                                    }
                                    # Old rewards with remaining amount to be received
                                    else {
                                        if ($don->amount >= $reward->remaining_amount) {
                                            array_push($suggested, $reward);
                                        } else {
                                            array_push($country, $reward);
                                        }
                                    }
                                } 
                                # Old don with remaining amount to be given
                                else {
                                    # New created reward
                                    if ($reward->remaining_amount == 0 || !is_null($reward->remaining_amount)) {                                    
                                        if ($don->remaining_amount >= $reward->amount) {
                                            array_push($suggested, $reward);
                                        } else {
                                            array_push($country, $reward);
                                        }
                                    }
                                    # Old rewards with remaining amount to be received
                                    else {
                                        if ($don->remaining_amount >= $reward->remaining_amount) {
                                            array_push($suggested, $reward);
                                        } else {
                                            array_push($country, $reward);
                                        }
                                    }
                                }
                            } else {
                                array_push($countries, $reward);
                            }
                        }
                    }
                }
            }

            return view('pages.fusions.createFromDon', compact('don', 'country', 'countries', 'suggested'));

        }
        abort(403);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createFromReward($reference)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            $reward = Reward::where("reference", $reference)->first();
            abort_unless (!is_null($reward), 404);

            $dons = Don::orderByDesc("created_at")->get();

            if (count($dons) == 0) {
                alert()->error("Impossible de continuer", "Pas de dons disponible pour le moment")->persistent();
                return \Redirect::back();
            }

            if ($reward->isCompleted()) {
                alert()->error("Impossible de continuer", "Cette recompense a déjà été totalement envoyé par le donateur")->persistent();
                return \Redirect::back();
            }
            
            if ($reward->isFusioned()) {
                alert()->error("Impossible de continuer", "Cette recompense a déjà été totalement associé")->persistent();
                return \Redirect::back();
            }

            if (is_null($reward->user)) {
                alert()->error("Impossible de continuer", "Le bénéficiaire est introuvable")->persistent();
                return \Redirect::back();
            }

            if (count(\App\Utils\Utils::notFusionedDons()) == 0) {
                alert()->error("Impossible de continuer", "Il n'y a pas de dons en attente actuellement.")->persistent();
                return \Redirect::back();
            }

            $country = [];
            $countries = [];
            $suggested = [];
            
            foreach ($dons as $don) {
                if (!is_null($don->user) && $don->is_usd == $reward->is_usd) {
                    if ($don->user_id != $reward->user_id) {
                        if ($don->isFusioned() == false && $don->isCompleted() == false) {
                            if ($don->user->country_id == $reward->user->country_id) {
                                # Newly created don
                                if ($don->remaining_amount == 0 || !is_null($don->remaining_amount)) {
                                    # New created reward
                                    if ($reward->remaining_amount == 0 || !is_null($reward->remaining_amount)) {                                    
                                        if ($don->amount >= $reward->amount) {
                                            array_push($suggested, $don);
                                        } else {
                                            array_push($country, $don);
                                        }
                                    }
                                    # Old rewards with remaining amount to be received
                                    else {
                                        if ($don->amount >= $reward->remaining_amount) {
                                            array_push($suggested, $don);
                                        } else {
                                            array_push($country, $don);
                                        }
                                    }
                                } 
                                # Old don with remaining amount to be given
                                else {
                                    # New created reward
                                    if ($reward->remaining_amount == 0 || !is_null($reward->remaining_amount)) {                                    
                                        if ($don->remaining_amount >= $reward->amount) {
                                            array_push($suggested, $don);
                                        } else {
                                            array_push($country, $don);
                                        }
                                    }
                                    # Old rewards with remaining amount to be received
                                    else {
                                        if ($don->remaining_amount >= $reward->remaining_amount) {
                                            array_push($suggested, $don);
                                        } else {
                                            array_push($country, $don);
                                        }
                                    }
                                }
                            } else {
                                array_push($countries, $don);
                            }
                        }
                    }
                }
            }

            return view('pages.fusions.createFromReward', compact('reward', 'country', 'countries', 'suggested'));

        }
        abort(403);
    }

    /**
     * Store Association
     *
     * @param Request $request
     * @return void
     */
    public function storeAssociation (Request $request)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        if ($request->has("d") && $request->has("r")) {

            $don = Don::where('reference', $request->d)->first();
            $reward = Reward::where('reference', $request->r)->first();

            if (is_null($don) || is_null($reward)) {
                alert()->error("Introuvable", "Le don ou la recompense est introuvable")->persistent();
                return redirect()->back();
            }
            
            if (is_null($don->user) || is_null($reward->user)) {
                alert()->error("Introuvable", "Le donateur ou le bénéficaire est introuvable")->persistent();
                return redirect()->back();
            }

            if ($don->is_usd != $reward->is_usd) {
                alert()->error("Introuvable", "Le don et la recompense doivent être de la même devise.")->persistent();
                return redirect()->back();
            }

            if ($don->user->id == $reward->user->id) {
                alert()->error("Erreur", "Correspondants identiques")->persistent();
                return redirect()->back();
            }

            if ($reward->isReady() == false) {
                alert()->error("Erreur", "La recompense n'est pas encore mature.")->persistent();
                return redirect()->back();
            }

            if ($don->isFusioned() || $reward->isFusioned()) {
                alert()->error("Erreur", "Le don ou la recompense est déjà totalement associé")->persistent();
                return redirect()->back();
            }

            if ($don->isCompleted() || $reward->isCompleted()) {
                alert()->error("Erreur", "Le don ou la recompense est déjà totalement envoyé ou totalement reçu")->persistent();
                return redirect()->back();
            }

            # Creating fusion
            # Newly created don
            if (is_null($don->remaining_amount) || $don->remaining_amount == 0) {
                # New created reward
                if ($reward->remaining_amount == 0 || is_null($reward->remaining_amount)) { 
                    # Don amount equals reward amount                                   
                    if ($don->amount == $reward->amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $don->amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                    # Don amount greater than reward amount                                   
                    if ($don->amount > $reward->amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $reward->amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                    # Don amount smaller than reward amount                                   
                    if ($don->amount < $reward->amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $don->amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }                    
                }
                # Old rewards with remaining amount to be received
                elseif ($reward->remaining_amount > 0) {
                    # Don amount equals reward remaining amount                                   
                    if ($don->amount == $reward->remaining_amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $don->amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->remaining_amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                    # Don amount greater than reward remaining amount                                   
                    if ($don->amount > $reward->remaining_amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $reward->remaining_amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->remaining_amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                    # Don amount smaller than reward remaining amount                                   
                    if ($don->amount < $reward->remaining_amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $don->amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->remaining_amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                } 
                # Invalid value for reward remaining amount
                alert()->error("Erreur", "La valeur du montant restant de la recompense est invalide")->persistent();
                return redirect()->back();
            }
            # Old don with remaining amount 
            elseif ($don->remaining_amount > 0) {
                # New created reward
                if ($reward->remaining_amount == 0 || is_null($reward->remaining_amount)) { 
                    # Don remaining amount equals reward amount                                   
                    if ($don->remaining_amount == $reward->amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $don->remaining_amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->remaining_amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                    # Don remaining amount greater than reward amount                                   
                    if ($don->remaining_amount > $reward->amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $reward->amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->remaining_amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                    # Don remaining amount smaller than reward amount                                   
                    if ($don->remaining_amount < $reward->amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $don->remaining_amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->remaining_amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }                    
                }
                # Old rewards with remaining amount to be received
                elseif ($reward->remaining_amount > 0) {
                    # Don remaining amount equals reward remaining amount                                   
                    if ($don->remaining_amount == $reward->remaining_amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $don->remaining_amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->remaining_amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->remaining_amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                    # Don remaining amount greater than reward remaining amount                                   
                    if ($don->remaining_amount > $reward->remaining_amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $reward->remaining_amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->remaining_amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->remaining_amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                    # Don remaining amount smaller than reward remaining amount                                   
                    if ($don->remaining_amount < $reward->remaining_amount) {
                        $fusion = Fusion::create([
                            "reference" => \App\Utils\Utils::generateReference(Fusion::all(), \App\Utils\Utils::fakeToken(20), 1),
                            "don_id" => $don->id,
                            "reward_id" => $reward->id,
                            "sender" => $don->user->id, 
                            "receiver" => $reward->user->id,
                            "amount" => $don->remaining_amount, 
                            "source" => $reward->source,
                            "is_usd" => $don->is_usd == 1 || $reward->is_usd == 1,
                            "user_id" => auth()->user()->id,
                            "status" => "pending_sender",
                            "status_comment" => "Fusion initiated",
                            "created_at" => now(),
                            "updated_at" => now(),
                        ]);

                        # Updating don
                        $don->remaining_amount = $don->remaining_amount - $fusion->amount;
                        $don->save();
                        # Updating reward
                        $reward->remaining_amount = $reward->remaining_amount - $fusion->amount;
                        $reward->save();
                        # Returning to don details
                        alert()->success("Bravo !", "L'association de ".number_format($fusion->amount, 2)." ".($fusion->is_usd ? 'USD' : 'XOF')." entre [ ".$don->user->name." ] et [ ".$reward->user->name." ] a été ajoutée avec succès.")->persistent();
                        return redirect()->route("associations.index");
                    }
                } 
                # Invalid value for reward remaining amount
                alert()->error("Erreur", "La valeur du montant restant de la recompense est invalide")->persistent();
                return redirect()->back();
            }
            # Invalid value for don remaining amount
            alert()->error("Erreur", "La valeur du montant restant du don est invalide")->persistent();
            return redirect()->back();
        } else {
            alert()->error("Erreur", "Un ou plusieurs champs manquants")->persistent();
            return redirect()->back();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }
        abort(404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $reference)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $fusion = Fusion::where('reference', $reference)->first();
        abort_unless(!is_null($fusion), 404);
        if (auth()->user()->hasFusion($fusion) || auth()->user()->isPartOfAdmin()) {
            return view('pages.fusions.show', compact('fusion'));
        }abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            $fusion = auth()->user()->isRoot() ? Fusion::withTrashed()->find($id) : Fusion::find($id);
            abort_unless(!is_null($fusion), 404);
            if ($fusion->isSent() == false && $fusion->isReceived() == false) {
                if (is_null($fusion->deleted_at)) {
                    #TODO: Update related don and reward before deleting...
                    if (!is_null($fusion->don)) {
                        $fusion->don->remaining_amount = $fusion->don->remaining_amount + $fusion->amount;
                        $fusion->don->save();
                    }
                    if (!is_null($fusion->reward)) {
                        $fusion->reward->remaining_amount = $fusion->reward->remaining_amount + $fusion->amount;
                        $fusion->reward->save(); 
                    }
                    $fusion->delete();
                    toast("Association supprimée avec succès", "success");
                } else {
                    if (auth()->user()->isRoot()) {
                        $fusion->forceDelete();
                        toast("Association supprimée definitivement avec succès", "success");
                    }
                }
            } else {
                alert()->error("Suppression impossible", "Le montant de cette association a déjà été envoyé ou reçu.");
            }
            return redirect()->route('associations.index');
        }
        abort(404);
    }
}
