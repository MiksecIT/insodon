<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Pack;
use \App\Utils\Utils;
use RealRashid\SweetAlert\Facades\Alert;

class PacksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $packs = [];
        if (auth()->user()->isPartOfAdmin()) {
            if (auth()->user()->isRoot()) {
                $packs = Pack::withTrashed()->get();
            } else {
                $packs = Pack::all();
            }
        }
        else { 
            $packs = Pack::where('is_available', 1)->get();
        }
        if (count($packs) == 0) {
            alert()->info("Vide", "Aucun pack disponible pour le moment");
        }
        return view('pages.packs.index', compact('packs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (auth()->user()->isTopManager()) {
            return view('pages.packs.create');
        }
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (auth()->user()->isTopManager()) {
            if ($request->has('label') && $request->has('amount') && $request->has('amount_usd') && $request->has('description')) {
                
                if (is_null($request->label) || $request->amount == "" || is_null($request->amount) || $request->amount_usd == "") {
                    alert()->error("Erreur", "Le nom ou le prix en FCFA ou le prix en USD ne peut pas être vide.")->persistent(); 
                    return redirect()->back();   
                }

                if (is_numeric($request->amount) == false || is_numeric($request->amount_usd) == false) {
                    alert()->error("Erreur", "Le prix en FCFA ou le prix en USD doit être une valeur numérique")->persistent();  
                    return redirect()->back();  
                }

                $existing = Pack::where('label', $request->label)->orWhere('amount', $request->amount)->orWhere('amount_usd', $request->amount_usd)->first();
                
                if (!is_null($existing)) {
                    alert()->error("Erreur", "Le nom ou le prix en FCFA ou le prix en USD est déjà utilisé.")->persistent();
                    return redirect()->back();    
                }

                $pack = Pack::create([
                    "reference" => \App\Utils\Utils::generateReference(Pack::all(), \App\Utils\Utils::fakeToken(20), 1),
                    "amount" => $request->amount,
                    "amount_usd" => $request->amount_usd,
                    "label" => $request->label,
                    "description" => $request->description,
                    "is_available" => $request->has('publish') ? 1 : 0,
                    "available_at" => $request->has('publish') ? now() : null,
                    "created_at" => now(),
                    "updated_at" => now(),
                ]);
                alert()->success("Terminé", "[".$pack->label."] a été ajouté avec succès")->persistent();
                return redirect()->route('packs.index');
            } else {
                alert()->error("Erreur", "Un ou plusieurs champs manquants.")->persistent();
                return \Redirect::back()->withInput();
            } 
        }
        abort(404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $reference)
    {
        if (auth()->user()->isTopManager()) {
            $pack = Pack::where('reference', $reference)->first();
            abort_unless(!is_null($pack), 404);
            return view('pages.packs.show', compact('pack'));
        }
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $reference)
    {
        if (auth()->user()->isTopManager()) {
            $pack = Pack::where('reference', $reference)->first();
            abort_unless(!is_null($pack), 404);
            return view('pages.packs.edit', compact('pack'));
        }
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (auth()->user()->isTopManager()) {
            $pack = Pack::find($id);
            if (!is_null($pack)) {
                $errors = [];
                if ($request->has('label') && $request->has('amount') && $request->has('amount_usd') && $request->has('description')) {
                    
                    if (count($pack->dons) > 0) {
                        alert()->error("Modification impossible", "Ce pack a déjà ".count($pack->dons)." don(s) associé(s).")->persistent();
                        return redirect()->back();
                    }

                    if (is_null($request->label) || $request->amount == "" || is_null($request->amount) || $request->amount_usd == "") {
                        alert()->error("Erreur", "Le nom ou le prix en FCFA ou le prix en USD ne peut pas être vide.")->persistent();
                        return redirect()->back();    
                    }

                    if (is_numeric($request->amount) == false || is_numeric($request->amount_usd) == false) {
                        alert()->error("Erreur", "Le prix en FCFA ou le prix en USD doit être une valeur numérique")->persistent();
                        return redirect()->back();    
                    }

                    $existing = Pack::where('label', $request->label)->orWhere('amount', $request->amount)->orWhere('amount_usd', $request->amount_usd)->first();
                    
                    if (!is_null($existing)) {
                        if ($existing->id != $pack->id) {
                            alert()->error("Erreur", "Le nom ou le prix en FCFA ou le prix en USD est déjà utilisé.")->persistent();
                            return redirect()->back(); 
                        }   
                    }

                    $pack->label = $request->label;
                    $pack->amount = $request->amount;
                    $pack->amount_usd = $request->amount_usd;
                    $pack->description = $request->description;
                    $pack->is_available = $request->has('publish') ? 1 : 0;
                    $pack->available_at = $request->has('publish') ? now() : null;
                    $pack->save();

                    alert()->success("Terminé", "[".$pack->label."] a été modifié avec succès")->persistent();

                    return redirect()->route('packs.index');
                } else {
                    alert()->error($errors, "Un ou plusieurs champs manquants.")->persistent();
                    return \Redirect::back()->withInput();
                }
            } 
        }
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (auth()->user()->isTopManager()) {
            $pack = Pack::find($id);
            abort_unless(!is_null($pack), 404);
            if (count($pack->dons) == 0) {
                if (is_null($pack->deleted_at)) {
                    $pack->delete();
                    toast("Pack supprimé avec succès", "success");
                } else {
                    if (auth()->user()->isRoot()) {
                        $pack->forceDelete();
                        toast("Pack supprimé definitivement avec succès", "success");
                    }
                }
            } else {
                alert()->error("Modification impossible", "Ce pack a déjà ".count($pack->dons)." don(s) associé(s).")->persistent();
            }
            return redirect()->route('packs.index');
        }
        abort(404);
    }
}
