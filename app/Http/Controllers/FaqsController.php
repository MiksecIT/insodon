<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\Models\Faq;
use RealRashid\SweetAlert\Facades\Alert;

class FaqsController extends Controller
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

        abort_unless(\App\Utils\Utils::appSettings()->enable_faq, 404);

        $faqs = [];
        if (auth()->user()->isPartOfAdmin()) {
            if (auth()->user()->isRoot()) {
                $faqs = Faq::withTrashed()->get();
            } else {
                $faqs = Faq::all();
            }
        }
        else { 
            $faqs = Faq::where('is_available', 1)->get();
        }
        if (count($faqs) == 0) {
            alert()->info('Vide',"Aucune FAQ disponible pour l'instant")->persistent();
        }
        return view('pages.faqs.index', compact('faqs'));
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

        abort_unless(\App\Utils\Utils::appSettings()->enable_faq, 404);
        if (is_null(auth()->user()->isBlocked())) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            $faqs = Faq::where('is_available', 1)->where('faq_id', null)->get();
            return view('pages.faqs.create', compact('faqs'));
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

        abort_unless(\App\Utils\Utils::appSettings()->enable_faq, 404);
        if (is_null(auth()->user()->isBlocked())) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }
        
        if (auth()->user()->isPartOfAdmin()) {
            
            if ($request->has('title') && $request->has('content')) {
                $existing = Faq::where('title', $request->title)->first();

                if (is_null($request->title) || $request->title == "" || is_null($request->content) || $request->content == "") {
                    alert()->error('Vide',"Le titre ou le contenu ne peut pas être vide.")->persistent();  
                    return redirect()->back();
                }
                if (!is_null($existing)) {
                    alert()->error('Erreur',"Ce titre est déjà utilisé.")->persistent();
                    return redirect()->back();   
                }

                $faq = Faq::create([
                    "reference" => \App\Utils\Utils::generateReference(Faq::all(), \App\Utils\Utils::fakeToken(10), 1),
                    "user_id" => auth()->user()->id,
                    "faq_id" => null,
                    "title" => $request->title,
                    "content" => $request->content,
                    "is_available" => $request->has('publish') ? 1 : 0,
                    "available_at" => $request->has('publish') ? now() : null,
                    "created_at" => now(),
                    "updated_at" => now(),
                ]);
                alert()->success("Terminé", "[".$faq->title."] a été ajouté avec succès")->persistent();
                return redirect()->route('faqs.index');
            } else {
                alert()->error("Erreur", "Un ou plusieurs champs manquants.")->persistent();
                return \Redirect::back();
            }            
        }
        abort(404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $reference)
    {
        abort(404);
        return view('pages.faqs.show');
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

        if (auth()->user()->isPartOfAdmin()) {
            $faq = Faq::where('reference', $reference)->first();
            return view('pages.faqs.edit', compact('faq'));
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

        if (auth()->user()->isPartOfAdmin()) {
            $faq = Faq::find($id);
            if (!is_null($faq)) {
                $errors = [];
                if ($request->has('title') && $request->has('content')) {
                    $existing = Faq::where('title', $request->title)->first();
                    
                    if (is_null($request->title) || $request->title == "" || is_null($request->content) || $request->content == "") {
                        array_push($errors, "Le titre ou le contenu ne peut pas être vide.");    
                    }
                    if (!is_null($existing)) {
                        if ($existing->id != $faq->id) {
                            array_push($errors, "Ce titre est déjà utilisé.");
                        }    
                    }

                    if (count($errors) > 0) {
                        return \Redirect::back()->with("errors", $errors);
                    }

                    $faq->title = $request->title;
                    $faq->content = $request->content;
                    $faq->is_available = $request->has('publish') ? 1 : 0;
                    $faq->available_at = $request->has('publish') ? now() : null;
                    $faq->save();
                    
                    session()->flash("success", "[".$faq->title."] a été modifé avec succès");
                    return redirect()->route('faqs.index');

                } else {
                    array_push($errors, "Un ou plusieurs champs manquants.");
                    return \Redirect::back()->with("errors", $errors);
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
        
        if (auth()->user()->isPartOfAdmin()) {
            $faq = Faq::find($id);
            abort_unless(!is_null($faq), 404);
            if (is_null($faq->deleted_at)) {
                $faq->delete();
                session()->flash("success", "Faq supprimé avec succès");
            } else {
                if (auth()->user()->isRoot()) {
                    $faq->forceDelete();
                    session()->flash("success", "Faq supprimé definitivement avec succès");
                }
            }
            return redirect()->route('faqs.index');
        }
        abort(404);
    }
}
