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
        $dons = [];
        if (auth()->user()->isPartOfAdmin()) {
            $dons = Don::all();
            if (auth()->user()->isRoot()) {
                $dons = Don::withTrashed()->get();
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
        abort_unless(auth()->user()->isTopManager(), 403);

        if ($request->has('ack') && $request->has('rec')) {

            $pack = Pack::where("reference", $request->ack)->first();
            $receiver = User::where("reference", $request->rec)->first();

            if (is_null($pack)) {
                alert()->error('Introuvable', "Le pack demandé est introuvable")->persistent();
                return redirect()->route('packs.index');
            }

            if ($pack->is_available != 1) {
                alert()->error('Indisponible', "Le pack demandé n'est pas encore publié")->persistent();
                return redirect()->route('packs.index');
            }

            if (is_null($receiver)) {
                alert()->error('Indisponible', "Le beneficiaire demandé est introuvable")->persistent();
                return redirect()->route('packs.index');
            }

            if (\App\Utils\Utils::appSettings()->reward_don_delay == 0 || is_null(\App\Utils\Utils::appSettings()->reward_don_delay)) {
                alert()->error('Paramètres', "Veuillez renseigner le delais de maturité des recompenses")->persistent();
                return redirect()->route('packs.index');
            }   

            $reward = Reward::create([
                "reference" => \App\Utils\Utils::generateReference(Reward::all(), \App\Utils\Utils::fakeToken(10), 1),
                "don_id" => null, 
                "source" => "don",
                "user_id" => $receiver->id,
                "status" => "pending_fusion",
                "amount" => $pack->amount,
                "created_at" => \Carbon\Carbon::parse(now())->subDays(\App\Utils\Utils::appSettings()->reward_don_delay + 1),
                "updated_at" => now(),
            ]);
            alert()->success('Félicitations', "Une recompense initiale a été créée pour le pack [".$pack->label."]")->persistent();
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
        if ($request->has("u__d")) {
            $pack = Pack::where("reference", $request->u__d)->first();
            if (is_null($pack)) {
                alert()->error("Erreur", "Impossible de trouver le pack demandé")->persistent();
                return \Redirect::back();
            } else {
                if ($pack->is_available != 1) {
                    alert()->error("Erreur", "Le pack demandé n'est pas encore disponible")->persistent();
                    return \Redirect::back();
                }
            }

            if (auth()->user()->hasPendingDonsFor($pack)) {
                alert()->error("Impossible", "Vous avez ".count(auth()->user()->pendingDonsFor($pack))." demande(s) en cours pour le pack [".$pack->label."]. \n\nVeuillez recommencer une fois terminé")->persistent();
                return \Redirect::back();
            }

            $serie = "";

            # Check if user has even donated this pack
            if (auth()->user()->hasDonated($pack)) {
                $waitingSecondDon = Don::where('pack_id', $pack->id)->where('user_id', auth()->user()->id)->where('is_first', 1)->where('second', null)->where('third', null)->where('position', 'first')->first();
                $waitingThirdDon = Don::where('pack_id', $pack->id)->where('user_id', auth()->user()->id)->where('is_first', 1)->where('second', '!=', null)->where('third', null)->where('position', 'first')->first();

                # Check if waiting second don
                if (!is_null($waitingSecondDon)) {
                    $don = auth()->user()->createDon($pack, [
                        "is_first" => 0,
                        "don_id" => $waitingSecondDon->id,
                        "position" => "second",
                    ]);

                    $waitingSecondDon->second = $don->id;
                    $waitingSecondDon->save();

                    $serie = $waitingSecondDon->reference;

                    alert()->success("Bravo!", "Le deuxième don de la série de dons #".$waitingSecondDon->reference." du pack [".$pack->label."] a été ajouté avec succès.\n\nVous serez associé à un ou plusieurs bénéficaires dans un délais maximum de 24h.")->persistent();
                } 
                # Check if waiting third don
                else {
                    if (!is_null($waitingThirdDon)) {
                        # Check is second don exists for given serie
                        if (!is_null(Don::find($waitingThirdDon->second))) {
                            $don = auth()->user()->createDon($pack, [
                                "is_first" => 0,
                                "don_id" => $waitingThirdDon->id,
                                "position" => "third",
                            ]);

                            $waitingThirdDon->third = $don->id;
                            $waitingThirdDon->save();

                            alert()->success("Bravo!", "Le troisième et dernier don de la série de dons #".$waitingSecondDon->reference." du pack [".$pack->label."] a été ajouté avec succès.\n\nVous serez associé à un ou plusieurs bénéficaires dans un délais maximum de 24h.")->persistent();
                        } 
                        # Second don not found
                        else {
                            alert()->error("Introuvable", "Nous ne parvenons pas à trouver le deuxième don de la série #".$waitingSecondDon->reference." du pack [".$pack->label."]. Veuillez contacter l'administrateur si cela persiste")->persistent();
                        }

                        $serie = $waitingThirdDon->reference;
                    } 
                    # Nothing waiting, there is no pending don serie
                    # Create a new serie with a new first don
                    else {
                        $don = auth()->user()->createDon($pack, [
                            "is_first" => 1,
                            "don_id" => null,
                            "position" => "first",
                        ]);

                        $serie = $don->reference;

                        alert()->success("Bravo!!", "Une nouvelle série de dons pour le pack [".$pack->label."] a été ajouté avec succès.\n\nVous serez associé à un ou plusieurs bénéficaires dans un délais maximum de 24h.")->persistent();                        
                    }
                }
            } 
            # First time for user to donate this pack
            else {
                $don = auth()->user()->createDon($pack, [
                    "is_first" => 1,
                    "don_id" => null,
                    "position" => "first",
                ]);
                
                $serie = $don->reference;

                alert()->success("Bravo!", "Une nouvelle série de dons pour le pack [".$pack->label."] a été ajouté avec succès.\n\nVous serez associé à un ou plusieurs bénéficaires dans un délais maximum de 24h.")->persistent();
            }
            # Returning to serie details
            return redirect()->route('gifts.series.details', $serie);
        }
        alert()->error("Error", "Une erreur inattendue est survenue, veuillez contacter l'administrateur si elle persiste.")->persisent();
        return \Redirect::back();
    }

    /**
     * Details of gifts suit
     *
     * @param [type] $reference
     * @return void
     */
    public function suitsDetails ($reference)
    {
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
        $don = Don::find($id);
        abort_unless(!is_null($don), 404);
        if (auth()->user()->hasDon($don) || auth()->user()->isTopManager()) {
            if (count($don->fusions) == 0) {
                if (is_null($don->deleted_at)) {
                    $don->delete();
                    toast("Don supprimé avec succès", "success");
                } else {
                    if (auth()->user()->isRoot()) {
                        $don->forceDelete();
                        toast("Don supprimé definitivement avec succès", "success");
                    }
                }
            } else {
                alert()->error("Erreur", "Modification impossible, ce don a déjà ".count($don->fusions)." fusion(s) associé(s).")->persistent();
            }
            return redirect()->route('dons.index');
        }
        abort(404);
    }
}
