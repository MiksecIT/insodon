<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Country;
use App\Utils\Utils;

use RealRashid\SweetAlert\Facades\Alert;

class CountriesController extends Controller
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

        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        $countries = [];
        if (auth()->user()->isPartOfAdmin()) {
            $countries = Country::orderBy("label")->get();
            if (auth()->user()->isRoot()) {
                $countries = Country::withTrashed()->orderBy("label")->get();
            }
        }
        if (count($countries) == 0) {
            alert()->info('Vide',"Aucun pays pour l'instant")->persistent();
        }
        return view('pages.countries.index', compact('countries'));
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

        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        return view('pages.countries.create'); 
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

        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        if ($request->has('shortern') && $request->has('label')) {
            $existing = Country::where('shortern', strtolower($request->shortern))->orWhere("label", $request->label)->first();
            if (!is_null($existing)) {
                alert()->error("Risque de doublon", "Le shortern ou le nom du pays est déjà attribué.")->persistent();
                return redirect()->back()->withInput();
            }

            $country = Country::create([
                "reference" => \App\Utils\Utils::generateReference(Country::all(), \App\Utils\Utils::fakeToken(10), 1),
                "shortern" => strtolower($request->shortern),
                "label" => $request->label,
                "description" => $request->has('description') ? $request->description : null,
                "is_available" => $request->has('publish') ? 1 : 0,
                "available_at" => $request->has('publish') ? now() : null,
                "created_at" => now(),
                "updated_at" => now(),
            ]);

            alert()->success("Terminé", "Le pays [ ".$country->label." ] a été ajouté avec succès!")->persistent();
            return redirect()->route('countries.index');

        } else {
            alert()->error("Erreur", "Un ou plusieurs sont manquants.")->persistent();
            return redirect()->back();
        }
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

        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        $country = Country::where('reference', $reference)->first();

        abort_unless(!is_null($country), 404);

        return view('pages.countries.show', compact('country'));
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

        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        $country = Country::where('reference', $reference)->first();

        abort_unless(!is_null($country), 404);

        return view ("pages.countries.edit", compact('country'));

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

        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        $country = Country::find($id);

        abort_unless(!is_null($country), 404);

        $edited = 0;

        if ($request->has('shortern') && $request->has('label')) {
            $existing = Country::where('shortern', $request->shortern)->orWhere("label", $request->label)->first();
            if (!is_null($existing)) {
                if ($existing->id != $country->id) {
                    alert()->error("Risque de doublon", "Le shortern ou le nom du pays est déjà attribué.")->persistent();
                    return redirect()->back()->withInput();
                }
            }

            if (!is_null($request->shortern)) {
                if ($request->shortern != $country->shortern) {
                    $country->shortern = strtolower($request->shortern);
                    $country->save();

                    $edited +=1;
                }
            }

            if (!is_null($request->label)) {
                if ($request->label != $country->label) {
                    $country->label = $request->label;
                    $country->save();

                    $edited +=1;
                }
            }
        }

        if ($request->has('description')) {
            if (!is_null($request->description)) {
                if ($request->description != $country->description) {
                    $country->description = $request->description;
                    $country->save();

                    $edited +=1;
                }
            }
        }

        if ($request->has('publish')) {
            if ($country->is_available != 1) {
                $country->is_available = 1;
                $country->available_at = now();
                $country->save();

                $edited +=1;
            }
        } else {
            if ($country->is_available != 0) {
                $country->is_available = 0;
                $country->available_at = null;
                $country->save();

                $edited +=1;
            }
        }

        if ($edited > 0) {
            alert()->success("Terminé", "Le pays [ ".$country->label." ] a été modifié avec succès!")->persistent();
        } else {
            toast("Aucune modification apportée", "info");
        }

        return redirect()->route('countries.index');
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

        abort_unless(auth()->user()->isPartOfAdmin(), 403);

        $country = auth()->user()->isRoot() ? Country::withTrashed()->where("id", $id)->first() : Country::find($id);

        abort_unless(!is_null($country), 404);

        if (is_null($country->deleted_at)) {
            $country->delete();
            toast("Pays supprimé avec succès", "success");
        } else {
            if (auth()->user()->isRoot()) {
                $country->forceDelete();
                toast("Pays supprimé définitivement avec succès", "success");                
            }
        }
        return redirect()->route('countries.index');
    }
}
