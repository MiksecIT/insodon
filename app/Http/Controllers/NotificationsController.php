<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;

class NotificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        abort(404);
        
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        return view('pages.notifications.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);

        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            return view('pages.notifications.create');
        }
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        abort(404);

        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            
        }
        abort(404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $string)
    {
        abort(404);

        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        return view('pages.notifications.show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        abort(404);

        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            return view('pages.notifications.edit');
        }
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        abort(404);

        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            
        }
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        abort(404);

        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        if (auth()->user()->isPartOfAdmin()) {
            
        }
        abort(404);
    }
}
