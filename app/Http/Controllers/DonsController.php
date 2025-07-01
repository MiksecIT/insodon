<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Don;
use \App\Models\Pack;
use \App\Models\Reward;
use \App\Models\User;
use \App\Models\Fusion;
use \App\Utils\Utils;
use RealRashid\SweetAlert\Facades\Alert;

class DonsController extends Controller
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

        $dons = [];
        if (auth()->user()->isPartOfAdmin()) {
            $dons = Don::orderByDesc("created_at")->get();
            if (auth()->user()->isRoot()) {
                $dons = Don::withTrashed()->orderByDesc("created_at")->get();
            }
        } else {
            $dons = auth()->user()->dons;
        }
        if (count($dons) == 0) {
            alert()->info('Vide',"Aucun don effectué pour l'instant")->persistent();
        }
        return view('pages.dons.index', compact('dons'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);
        return view('pages.dons.create');
    }

    /**
     * Create a reward for given pack
     *
     * @param Request $request
     * @return void
     */
    public function createReward (Request $request)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (Utils::appSettings()->enable_reward_add == 0) {
            toast("Temp overflow, app maintenance is required", "warning");
            return redirect()->back();
        }

        abort_unless(auth()->user()->isTopManager(), 403);

        if ($request->has('ack') && $request->has('rec') && $request->has('c')) {

            $pack = Pack::where("reference", $request->ack)->first();
            $receiver = User::where("reference", $request->rec)->first();

            if (is_null($pack)) {
                alert()->error('Introuvable', "Le pack demandé est introuvable")->persistent();
                return redirect()->route('packs.index');
            }

            if (in_array($request->c, ["usd", "xof"]) == false) {
                alert()->error("Erreur", "La dévise selectionnée n'est pas disponible")->persistent();
                return \Redirect::back();
            }

            if ($pack->amount <= 0 || $pack->amount_usd <= 0 || $pack->amount == "" || $pack->amount_usd == "" || is_null($pack->amount) || is_null($pack->amount_usd)) {
                alert()->error("Erreur", "Le montant du pack selectionné n'est pas valide.\n Veuillez contacter l'administration si cela persiste.")->persistent();
                return \Redirect::back();
            }

            if ($pack->is_available != 1) {
                alert()->error('Indisponible', "Le pack demandé n'est pas encore publié")->persistent();
                return redirect()->route('packs.index');
            }

            if (is_null($receiver)) {
                alert()->error('Indisponible', "Le beneficiaire demandé est introuvable")->persistent();
                return redirect()->route('packs.index');
            }

            if (is_null($receiver->country)) {
                alert()->error("Erreur", "Veuillez renseigner le pays de résidence du bénéficaire dans les paramètres afin de faciliter les associations.")->persistent();
                return \Redirect::back();
            }

            if (\App\Utils\Utils::appSettings()->reward_don_delay == 0 || is_null(\App\Utils\Utils::appSettings()->reward_don_delay)) {
                alert()->error('Paramètres', "Veuillez renseigner le delais de maturité des recompenses")->persistent();
                return redirect()->route('packs.index');
            }   

            $reward = Reward::create([
                "reference" => \App\Utils\Utils::generateReference(Reward::all(), \App\Utils\Utils::fakeToken(20), 1),
                "don_id" => null, 
                "source" => "don",
                "user_id" => $receiver->id,
                "is_usd" => $request->c == "usd" ? 1 : 0,
                "status" => "pending_fusion",
                "amount" => $request->c == "usd" ? $pack->amount_usd : $pack->amount,
                "created_at" => \Carbon\Carbon::parse(now())->subDays(\App\Utils\Utils::appSettings()->reward_don_delay + 1),
                "updated_at" => now(),
            ]);
            alert()->success('Félicitations', "Une recompense initiale en ".strtoupper($request->c)." a été créée pour le pack [".$pack->label."]")->persistent();
            return redirect()->route('rewards.show', $reward->reference);

        } else {
            alert()->success('Error', "Impossible de continuer, un ou plusieurs champs manquants")->persistent();
            return redirect()->route('packs.index');
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

        if (is_null(auth()->user()->country)) {
            alert()->error("Erreur", "Veuillez renseigner votre pays de résidence dans les paramètres afin de faciliter les associations.")->persistent();
            return \Redirect::back();
        }

        if ($request->has("u__d") && $request->has("c")) {
            $pack = Pack::where("reference", $request->u__d)->first();
            if (is_null($pack)) {
                alert()->error("Erreur", "Impossible de trouver le pack demandé")->persistent();
                return \Redirect::back();
            } else {
                if ($pack->is_available != 1) {
                    alert()->error("Erreur", "Le pack demandé n'est pas encore disponible")->persistent();
                    return \Redirect::back();
                }

                if ($pack->amount <= 0 || $pack->amount_usd <= 0 || $pack->amount == "" || $pack->amount_usd == "" || is_null($pack->amount) || is_null($pack->amount_usd)) {
                    alert()->error("Erreur", "Le montant du pack selectionné n'est pas valide.\n Veuillez contacter l'administration si cela persiste.")->persistent();
                    return \Redirect::back();
                }
            }

            if (in_array($request->c, ["usd", "xof"]) == false) {
                alert()->error("Erreur", "La dévise selectionnée n'est pas disponible")->persistent();
                return \Redirect::back();
            }

            # TODO: Removed temporairy
            if (auth()->user()->hasPendingDonsFor($pack) && 1 == 2) {
                alert()->error("Impossible", "Vous avez ".count(auth()->user()->pendingDonsFor($pack))." demande(s) en cours pour le pack [".$pack->label."]. \n\nVeuillez recommencer une fois terminé")->persistent();
                return \Redirect::back();
            }

            $serie = "";

            # Check if user has even donated this pack
            if (auth()->user()->hasDonation($pack)) {
                $waitingSecondDon = Don::where('pack_id', $pack->id)->where('user_id', auth()->user()->id)->where('is_first', 1)->where('second', null)->where('position', 'first')->first();
                $waitingThirdDon = Don::where('pack_id', $pack->id)->where('user_id', auth()->user()->id)->where('is_first', 1)->where('third', null)->where('position', 'first')->first();

                # Check if waiting second don
                if (!is_null($waitingSecondDon)) {
                    $don = auth()->user()->createDon($pack, [
                        "is_first" => 0,
                        "is_usd" => $request->c == "usd" ? 1 : 0,
                        "don_id" => $waitingSecondDon->id,
                        "position" => "second",
                    ]);

                    $waitingSecondDon->second = $don->id;
                    $waitingSecondDon->save();

                    $serie = $waitingSecondDon->reference;

                    alert()->success("Bravo!", "Le deuxième don de la série de dons #".$waitingSecondDon->reference." du pack [".$pack->label."] a été ajouté avec succès.\n\nVous serez associé à un ou plusieurs bénéficaires dans un délais maximum de 48h.")->persistent();
                } 
                # Check if waiting third don
                else {
                    if (!is_null($waitingThirdDon)) {
                        $don = auth()->user()->createDon($pack, [
                            "is_first" => 0,
                            "is_usd" => $request->c == "usd" ? 1 : 0,
                            "don_id" => $waitingThirdDon->id,
                            "position" => "third",
                        ]);

                        $waitingThirdDon->third = $don->id;

                        $waitingThirdDon->save();

                        $serie = $waitingThirdDon->reference;

                        alert()->success("Bravo!", "Le troisième don de la série de dons #".$waitingThirdDon->reference." du pack [".$pack->label."] a été ajouté avec succès.\n\nVous serez associé à un ou plusieurs bénéficaires dans un délais maximum de 48h.")->persistent();
                        
                    } 
                    # Nothing waiting, there is no pending don serie
                    # Create a new serie with a new first don
                    else {
                        $don = auth()->user()->createDon($pack, [
                            "is_first" => 1,
                            "is_usd" => $request->c == "usd" ? 1 : 0,
                            "don_id" => null,
                            "position" => "first",
                        ]);

                        $serie = $don->reference;

                        alert()->success("Bravo!!", "Une nouvelle série de dons pour le pack [".$pack->label."] a été ajouté avec succès.\n\nVous serez associé à un ou plusieurs bénéficaires dans un délais maximum de 48h.")->persistent();                        
                    }
                }
            } 
            # First time for user to donate this pack
            else {
                $don = auth()->user()->createDon($pack, [
                    "is_first" => 1,
                    "is_usd" => $request->c == "usd" ? 1 : 0,
                    "don_id" => null,
                    "position" => "first",
                ]);
                
                $serie = $don->reference;

                alert()->success("Bravo!", "Une nouvelle série de dons pour le pack [".$pack->label."] a été ajouté avec succès.\n\nVous serez associé à un ou plusieurs bénéficaires dans un délais maximum de 48h.")->persistent();
            }
            # Returning to serie details
            return redirect()->route('gifts.series.details', $serie);
        }
        alert()->error("Error", "Une erreur inattendue est survenue, veuillez contacter l'administrateur si elle persiste.")->persisent();
        return \Redirect::back();
    }

    /**
     * List of gifts series
     *
     * @param [type] $reference
     * @return void
     */
    public function seriesList ()
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (is_null(auth()->user()->isBlocked())) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $series = [
            "all" => [],
            "user" => [],
        ];

        if (auth()->user()->isPartOfAdmin()) {
            $series["all"] = Don::where("is_first", 1)->where("position", "first")->where("don_id", null)->get();
            if (auth()->user()->isRoot()) {
                $series["all"] = Don::withTrashed()->where("is_first", 1)->where("position", "first")->where("don_id", null)->get();
            }
        } 

        $series["user"] = Don::where("user_id", auth()->user()->id)->where("is_first", 1)->where("position", "first")->where("don_id", null)->get();

        return view('pages.dons.series.index', compact('series'));
    }

    /**
     * Details of gifts series
     *
     * @param [type] $reference
     * @return void
     */
    public function seriesDetails ($reference)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $don = Don::where("reference", $reference)->first();
        abort_unless(!is_null($don), 404);
        if (auth()->user()->hasDon($don) || auth()->user()->isPartOfAdmin()) {
            return view('pages.dons.series.show', compact('don'));
        }abort(403);
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

        $don = Don::where('reference', $reference)->first();
        abort_unless(!is_null($don), 404);
        if (auth()->user()->hasDon($don) || auth()->user()->isPartOfAdmin()) {
            return view('pages.dons.show', compact('don'));
        }abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $reference)
    {
        abort(404);
        return view('pages.dons.edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
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
        
        $don = auth()->user()->isRoot() ? Don::withTrashed()->find($id) : Don::find($id);

        abort_unless(!is_null($don), 404);

        if (auth()->user()->hasDon($don) || auth()->user()->isRoot()) {
            if (count($don->fusions) == 0) {
                if (is_null($don->deleted_at)) { 
                    if ($don->position == "first") {
                        # Updating second
                        $second = Don::where("user_id", $don->user_id)->where("don_id", $don->id)->where("position", "second")->first();
                        if (!is_null($second)) {                            
                            $second->don_id = null;
                            $second->is_first = 1;
                            $second->position = "first";
                            $second->save();
                        }
                        # Updating third
                        $third = Don::where("user_id", $don->user_id)->where("don_id", $don->id)->where("position", "third")->first();
                        if (!is_null($third)) {
                            $third->don_id = null;
                            $third->is_first = 1;
                            $third->position = "first";
                            $third->save();
                        }
                    }

                    $don->delete();
                    toast("Don supprimé avec succès", "success");

                } else {
                    if (auth()->user()->isRoot()) {
                        $don->forceDelete();
                        toast("Don supprimé définitivement avec succès", "success");
                    }
                }
            } else {
                alert()->error("Suppression impossible", "Ce don a déjà ".count($don->fusions)." fusion(s) associé(s).")->persistent();
            }
            return redirect()->route('gifts.index');
        }
        abort(404);
    }
}
