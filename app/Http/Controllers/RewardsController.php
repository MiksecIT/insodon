<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Don;
use \App\Models\Reward;
use \App\Models\User;
use \App\Models\Fusion;
use \App\Utils\Utils;
use RealRashid\SweetAlert\Facades\Alert;

class RewardsController extends Controller
{
    public function __construct()
    {
        if (\App\Utils\Utils::appSettings()->enable_maintenance) {
            $block = true;
            if (\Auth::check()) {
                if (auth()->user()->isPartOfAdmin()) {
                    $block = false;
                }
            }

            if ($block) {
                return redirect()->route("app.maintenance");
            } 
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rewards = [];
        if (auth()->user()->isPartOfAdmin()) {
            $rewards = Reward::all();
            if (auth()->user()->isRoot()) {
                $rewards = Reward::withTrashed()->get();
            }
        } else {
            $rewards = auth()->user()->rewards;
        }
        if (count($rewards) == 0) {
            alert()->info("Vide", "Aucune recompense disponible pour le moment")->persistent();
        }
        return view('pages.rewards.index', compact('rewards'));
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
        $reward = Reward::where('reference', $reference)->first();
        abort_unless(!is_null($reward), 404);
        if (auth()->user()->hasReward($reward) || auth()->user()->isPartOfAdmin()) {
            return view('pages.rewards.show', compact('reward'));
        }abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $reference)
    {
        if (auth()->user()->isTopManager()) {
            $reward = Reward::where('reference', $reference)->first();
            abort_unless(!is_null($reward), 404);
            return view('pages.rewards.edit', compact('reward'));
        }
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (auth()->user()->isTopManager()) {
            
        }
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (auth()->user()->isTopManager()) {
            $reward = Reward::find($id);
            abort_unless(!is_null($reward), 404);
            if (count($reward->fusions) == 0) {
                if (is_null($reward->deleted_at)) {
                    $reward->delete();
                    toast("Récompense supprimée avec succès", "success");
                } else {
                    if (auth()->user()->isRoot()) {
                        $reward->forceDelete();
                        toast("Récompense supprimée definitivement avec succès", "success");
                    }
                }
            } else {
                alert()->error("Modification impossible", "Cette recompense a déjà ".count($reward->fusions)." association(s).")->persistent();
            }
            return redirect()->route('rewards.index');
        }
        abort(404);
    }
}
