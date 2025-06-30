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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

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

                # Storing image
                # Checking if image has been uploaded
                if ($request->hasFile('image')) {
                    # Checking image mime type
                    if (in_array($request->file('image')->getMimeType(), Utils::getAllowedImagesMimeTypes())) {
                        # Generating filename for image
                        $tempFilename = 'IMG-'.$pack->reference.'.'.$request->file('image')->getClientOriginalExtension();                        
                        # Moving uploaded image to local storage
                        $request->file('image')->move(public_path('uploads/'), $tempFilename);
                        # Binding uploaded image with db record
                        $pack->image_url = 'uploads/'.$tempFilename;
                        $pack->save();           
                    }
                }

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isTopManager()) {
            $pack = Pack::find($id);
            if (!is_null($pack)) {
                $errors = [];
                if ($request->has('label') && $request->has('amount') && $request->has('amount_usd') && $request->has('description')) {
                    # Updates flag
                    $edited = 0;
                    
                    # Updating label
                    if (!is_null($request->label)) {
                        $existingLabel = Pack::where('label', $request->label)->first();
                        if (!is_null($existingLabel)) {
                            if ($existingLabel->id != $pack->id) {
                                alert()->error("Erreur", "Le nom [ ".$request->label." ] est déjà attribué à un autre pack.")->persistent();
                                return redirect()->back();
                            }
                        }

                        if ($pack->label != $request->label) {
                            $pack->label = $request->label;
                            $pack->save();

                            $edited +=1;
                        }
                    }

                    # Updating price
                    if ($request->amount <= 0 || 
                    $request->amount_usd <= 0 || 
                    is_numeric($request->amount) == false || 
                    is_numeric($request->amount_usd) == false || 
                    $request->amount == "" || 
                    is_null($request->amount) || 
                    $request->amount_usd == "" || 
                    is_null($request->amount_usd)) {
                        alert()->error("Erreur", "Le prix en FCFA ou le prix en USD doit être une valeur numérique.")->persistent();
                        return redirect()->back();    
                    } else {
                        $existingPrice = Pack::where('amount', $request->amount)->orWhere('amount_usd', $request->amount)->first();
                        if (!is_null($existingPrice)) {
                            if ($existingPrice->id != $pack->id) {
                                alert()->error("Erreur", "Le prix en FCFA ou le prix en USD est déjà attribué à un autre pack.")->persistent();
                                return redirect()->back();
                            }
                        }

                        if ($pack->amount != $request->amount || $pack->amount_usd != $request->amount_usd) {
                            if (count($pack->dons) > 0) {
                                alert()->error("Impossible", "Impossible de modifier le prix de ce pack. Il y a déjà ".count($pack->dons)." don(s) associé(s).")->persistent();
                                return redirect()->back();
                            } else {
                                if ($pack->amount != $request->amount) {
                                    $pack->amount = $request->amount;
                                    $pack->save();

                                    $edited +=1;
                                }

                                if ($pack->amount_usd != $request->amount_usd) {
                                    $pack->amount_usd = $request->amount_usd;
                                    $pack->save();

                                    $edited +=1;
                                }
                            }
                        }
                    }

                    # Updating availability
                    if ($request->has('publish')) {
                        if ($pack->is_available != 1) {
                            $pack->is_available = 1;
                            $pack->available_at = now();
                            $pack->save();

                            $edited +=1;
                        }
                    } else {
                        if ($pack->is_available != 0) {
                            $pack->is_available = 0;
                            $pack->available_at = null;
                            $pack->save();

                            $edited +=1;
                        }
                    }

                    # Storing image
                    # Checking if image has been uploaded
                    if ($request->hasFile('image')) {
                        # Checking image mime type
                        if (in_array($request->file('image')->getMimeType(), Utils::getAllowedImagesMimeTypes())) {
                            # Deleting previous image
                            if (!is_null($pack->image_url)) {
                                $assetUrlExploded = explode("/", $pack->image_url);
                                if (is_array($assetUrlExploded)) {
                                    if (count($assetUrlExploded) == 2 && $assetUrlExploded[0] == "uploads") {
                                        if (file_exists(public_path('uploads/'.$assetUrlExploded[1])) || \Storage::disk('public')->exists($assetUrlExploded[1])) {
                                            if (unlink(public_path('uploads/'.$assetUrlExploded[1])) || Utils::diskDeleteFile('public', $assetUrlExploded[1])) {
                                                # Updating image url
                                                $pack->image_url = null;
                                                $pack->save();
                                            }
                                        }
                                    }
                                }
                            }
                            # Generating filename for image
                            $tempFilename = 'IMG-'.$pack->reference.'.'.$request->file('image')->getClientOriginalExtension();                        
                            # Moving uploaded image to local storage
                            $request->file('image')->move(public_path('uploads/'), $tempFilename);
                            # Binding uploaded image with db record
                            $pack->image_url = 'uploads/'.$tempFilename;
                            $pack->save();  
                            
                            $edited +=1;
                        }
                    }

                    if ($edited > 0) {
                        alert()->success("Terminé", "Le pack [".$pack->label."] a été modifié avec succès")->persistent();
                    } else {
                        toast("Aucune modification apportée", "info");
                    }                    

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }
        
        if (auth()->user()->isTopManager()) {
            $pack = Pack::find($id);
            abort_unless(!is_null($pack), 404);
            if (count($pack->dons) == 0) {
                if (is_null($pack->deleted_at)) {
                    $pack->delete();
                    toast("Pack supprimé avec succès", "success");
                    return redirect()->route('packs.index');
                } else {
                    if (auth()->user()->isRoot()) {
                        $pack->forceDelete();
                        toast("Pack supprimé definitivement avec succès", "success");
                        return redirect()->route('packs.index');
                    } else {
                        abort(403);
                    }
                }
            } else {
                alert()->error("Modification impossible", "Ce pack a déjà ".count($pack->dons)." don(s) associé(s).")->persistent();
                return redirect()->route('packs.index');
            }
        }
        else {
            abort(404);
        }
    }
}
