<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Royalty;
use App\Models\User;
use App\Models\Don;
use App\Models\Reward;

use App\Utils\Utils;

class RoyaltiesController extends Controller
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

        abort_unless(\App\Utils\Utils::appSettings()->enable_royalties, 404);
        if (is_null(auth()->user()->isBlocked())) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $royalties = [];
        $all = [];
        $pending = [];
        $claimed = [];
        $approuved = [];
        $completed = [];

        if (auth()->user()->isPartOfAdmin()) {
            $royalties = Royalty::all();
            if (auth()->user()->isRoot()) {
                $royalties = Royalty::withTrashed()->get();
            }
        } else {
            $royalties = auth()->user()->gainedRoyalties;
        }
        if (count($royalties) == 0) {
            alert()->info('Vide',"Aucun bonus disponible pour l'instant")->persistent();
        }
        # Parsing
        if (count($royalties) > 0) {            
            foreach ($royalties as $r) {
                # All
                array_push($all, $r);
                # Completed
                if ($r->isCompleted()) {
                    array_push($completed, $r);
                }
                # Approuved
                if ($r->isClaimed() && $r->isApprouved() && $r->isCompleted() == false) {
                    array_push($approuved, $r);
                }
                # Claimed
                if ($r->isClaimed() && $r->isApprouved() == false && $r->isCompleted() == false) {
                    array_push($claimed, $r);
                }
                # Pending
                if ($r->isClaimed()== false) {
                    array_push($pending, $r);
                }
            }
        }

        return view('pages.bonus.index', compact('all', 'pending', 'claimed', 'completed', 'approuved'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

        abort_unless(\App\Utils\Utils::appSettings()->enable_royalties, 404);
        $royalty = Royalty::where('reference', $reference)->first();
        abort_unless(!is_null($royalty), 404);
        abort_unless(auth()->user()->hasGainedRoyalty($royalty) || auth()->user()->isPartOfAdmin(), 403);
        return view("pages.bonus.show", compact("royalty"));
    }
    
    /**
     * Claim royalties
     *
     * @return void
     */
    public function claim (Request $request)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        abort_unless(\App\Utils\Utils::appSettings()->enable_royalties, 404);

        if (!is_null(\App\Utils\Utils::appSettings()->royalties_threshold) && \App\Utils\Utils::appSettings()->royalties_threshold > 0) {
            
            if (today()->dayOfWeek != \Carbon\Carbon::FRIDAY) {
                alert()->info('Pas disponible',"Les reclamations de bonus se font uniquement les vendredis")->persistent();
                return redirect()->back();
            }

            if (count(auth()->user()->elligibleRoyalties()) > 0) {
                $count = 0;
                # XOF
                if (count(auth()->user()->elligibleRoyaltiesXOF()) > 0) {
                    $reward = Reward::create([
                        "reference" => Utils::generateReference(Reward::all(), Utils::fakeToken(20), 1),
                        "don_id" => null, 
                        "source" => "bonus",
                        "is_usd" => 0,
                        "user_id" => auth()->user()->id,
                        "status" => "pending_fusion",
                        "created_at" => now(),
                        "updated_at" => now(),
                    ]);

                    foreach (auth()->user()->elligibleRoyaltiesXOF() as $r) {
                        # Updating reward amount
                        $reward->amount += $r->value;
                        $reward->bonuses = $reward->bonuses.";".$r->id;
                        $reward->save();
                        # Linking reward and royalty
                        $reward->addRoyalty($r);
                    }
                    $count +=1;
                }
                # USD
                if (count(auth()->user()->elligibleRoyaltiesUSD()) > 0) {
                    $rewardr = Reward::create([
                        "reference" => Utils::generateReference(Reward::all(), Utils::fakeToken(20), 1),
                        "don_id" => null, 
                        "source" => "bonus",
                        "is_usd" => 1,
                        "user_id" => auth()->user()->id,
                        "status" => "pending_fusion",
                        "created_at" => now(),
                        "updated_at" => now(),
                    ]);

                    foreach (auth()->user()->elligibleRoyaltiesUSD() as $r) {
                        # Updating reward amount
                        $rewardr->amount += $r->value;
                        $rewardr->bonuses = $reward->bonuses.";".$r->id;
                        $rewardr->save();
                        # Linking reward and royalty
                        $rewardr->addRoyalty($r);
                    }
                    $count +=1;
                }

                if ($count > 0) {
                    alert()->info('Bravo !',"Vous avez initié $count demande(s) de reclamation de bonus. \n\nVeuillez patienter, votre demande sera validée dans quelques instants.")->persistent();
                } else {
                    toast("Aucune demande soumise", "info");
                }
                
                return redirect()->back();

            } else {
                alert()->info('Elligibilité',"Vous n'avez pas de bonus élligibibles pour le moment")->persistent();
                return redirect()->back();
            }
        } else {
            alert()->error('Seuil',"Impossible de continuer, veuillez contacter les administrateurs si cela persiste")->persistent();
            return redirect()->back();
        }
    }

    /**
     * Approuve royalties
     *
     * @return void
     */
    public function approuve (Request $request)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        abort_unless(\App\Utils\Utils::appSettings()->enable_royalties, 404);
        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        if ($request->has("ack")) {
            $reward = Reward::where("reference", $request->ack)->first();

            if (is_null($reward)) {
                alert()->error('Introuvable',"La demande de reclamation est introuvable")->persistent();
                return redirect()->back();
            }

            if ($reward->source != "bonus") {
                alert()->error('Introuvable',"La demande de reclamation est mal configuré.\n Veuillez contacter l'administrateur.")->persistent();
                return redirect()->back();
            }

            if ($reward->isApprouvedForBonus()) {
                alert()->error('Erreur',"La demande de reclamation a déjà été approuvée")->persistent();
                return redirect()->back();
            }

            if ($reward->hasFusions()) {
                alert()->error('Erreur',"La demande de reclamation a déjà été fusionnée")->persistent();
                return redirect()->back();
            }

            if ($reward->isCompleted()) {
                alert()->error('Erreur',"La demande de reclamation a déjà été payée")->persistent();
                return redirect()->back();
            }

            $reward->is_royalties_withdraw_enabled = 1;
            $reward->royalties_withdraw_enabled_at = now();
            $reward->save();

            alert()->success('Terminé',"La demande de reclamation a déjà été approuvée avec succès")->persistent();
            return redirect()->back();

        } else {
            alert()->error('Erreur',"Un ou plusieurs champs manquants")->persistent();
            return redirect()->back();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        abort(404);
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
        abort(404);
    }
}
