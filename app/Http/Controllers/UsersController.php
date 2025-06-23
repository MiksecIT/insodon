<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Don;
use \App\Models\Reward;
use \App\Models\User;
use \App\Models\Fusion;
use \App\Models\Country;
use \App\Utils\Utils;
use RealRashid\SweetAlert\Facades\Alert;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = [];
        if (auth()->user()->isPartOfAdmin()) {
            $users = User::all();
            if (auth()->user()->isRoot()) {
                $users = User::withTrashed()->get();
            }
        } else {
            $users = auth()->user()->affiliates;
        }
        return view('pages.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (auth()->user()->isTopManager()) {
            $countries = \App\Models\Country::where('is_available', 1)->get();
            $roles = \App\Models\Role::all();
            return view('pages.users.create', compact('roles', 'countries'));
        }
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (auth()->user()->isTopManager()) {
            if ($request->has('lastname') && $request->has('firstname') && $request->has('email') && $request->has('country') && $request->has('role')) {
                
                $existingEmail = User::where('email', $request->email)->get();
                $existingLastFirst = User::where("firstname", $request->firstname)->where('lastname', $request->lastname)->get();
                $country = \App\Models\Country::find($request->country);
                $role = \App\Models\Role::find($request->role);

                if (is_null($country) || is_null($role)) {
                    alert()->error("Introuvable", "Le pays ou le role est introuvable")->persistent();
                    return redirect()->back()->withInput();
                }

                if (count($existingEmail) > 0) {
                    alert()->error("Erreur", "L'adresse mail est dejà utilisée")->persistent();
                    return redirect()->back()->withInput();
                }

                if (count($existingLastFirst) > 0) {
                    alert()->error("Erreur", "Le nom et le(s) prénom(s) sont déjà utilisés")->persistent();
                    return redirect()->back()->withInput();
                }

                $user = User::create([
                    "reference" => \App\Utils\Utils::generateReference(Reward::all(), \App\Utils\Utils::fakeToken(20), 1),
                    "lastname" => $request->lastname,
                    "firstname" => $request->firstname,
                    "name" => ucfirst($request->firstname).' '.ucfirst($request->lastname),
                    "email" => $request->email,
                    "password" => \Hash::make("1234"),
                    "role_id" => $role->id,
                    "country_id" => $country->id,
                    "email_verified_at" => now(),
                    "created_at" => now(),
                    "updated_at" => now(),
                ]);

                alert()->success("Terminé", "L'utilisateur [".$user->name."] a été créé avec succès")->persistent();
                return redirect()->route("users.show", $user->reference);

            } else {
                alert()->error("Erreur", "Un ou plusieurs champs manquants")->persistent();
                return redirect()->back();
            }
        }
        abort(404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $reference)
    {
        $user = User::where('reference', $reference)->first();
        abort_unless(!is_null($user), 404);
        if (auth()->user()->hasAffiliate($user) || auth()->user()->id == $user->id || auth()->user()->isPartOfAdmin()) {
            
            if ($user->isRoot()) {
                if (auth()->user()->isRoot()) {
                    return view('pages.users.show', compact('user'));
                } else {
                    abort(404);
                }
            } else {
                return view('pages.users.show', compact('user'));
            }
        }abort(404);
    }

    /**
     * Block/Unblock given user
     *
     * @param Request $request
     * @return void
     */
    public function toggleBlock (Request $request)
    {
        abort_unless(\App\Utils\Utils::appSettings()->enable_suspension, 404);
        abort_unless(auth()->user()->isTopManager(), 403);

        if ($request->has("ack")) {
            $user = User::where("reference", $request->ack)->first();
            if (is_null($user)) {
                alert()->error("Introuvable", "Utilisateur introuvable")->persistent();
                return redirect()->back();
            }

            if ($user->isBlocked() == false) {
                $user->is_blocked = 1;
                $user->blocked_at = now();
                $user->blocked_until = \Carbon\Carbon::parse(now())->addDays(\App\Utils\Utils::appSettings()->suspension_delay);
                $user->save();

                alert()->success("Terminé", "Utilisateur suspendu jusqu'au ".$user->blocked_until)->persistent();
                return redirect()->back();
            } else {
                $user->is_blocked = 0;
                $user->blocked_at = null;
                $user->blocked_until = null;
                $user->save();

                alert()->success("Terminé", "Utilisateur admis avec succès")->persistent();
                return redirect()->back();
            }

        } else {
            alert()->error("Erreur", "Un ou plusieurs champs manquants")->persistent();
            return redirect()->back();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $reference)
    {
        abort_unless(auth()->user()->isTopManager(), 403);

        $user = User::where('reference', $reference)->first();
        abort_unless(!is_null($user), 404);
        
        $countries = \App\Models\Country::where('is_available', 1)->get();
        $roles = \App\Models\Role::all();

        return view('pages.users.edit', compact('user', 'roles', 'countries'));        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        abort_unless(auth()->user()->isTopManager(), 403);
        
        $user = User::find($id);

        abort_unless(!is_null($user), 404);

        if ($request->has('lastname') && $request->has('firstname') && $request->has('country') && $request->has('role')) {
            
            $existingLastFirst = User::where("firstname", $request->firstname)->where('lastname', $request->lastname)->first();
            $country = \App\Models\Country::find($request->country);
            $role = \App\Models\Role::find($request->role);

            if (is_null($country) || is_null($role)) {
                alert()->error("Introuvable", "Le pays ou le role est introuvable")->persistent();
                return redirect()->back()->withInput();
            }

            if (!is_null($existingLastFirst)) {
                if ($existingLastFirst->id != $user->id) {
                    alert()->error("Erreur", "Le nom et le(s) prénom(s) sont déjà utilisés")->persistent();
                    return redirect()->back()->withInput();
                }
            }

            $user->firstname = $request->firstname;
            $user->lastname = $request->lastname;
            $user->name = ucfirst($request->firstname).' '. ucfirst($request->lastname);
            $user->country_id = $request->country;
            $user->role_id = $request->role;
            $user->save();

            alert()->success("Terminé", "L'utilisateur [".$user->name."] a été modifié avec succès")->persistent();
            return redirect()->route("users.show", $user->reference);

        } else {
            alert()->error("Erreur", "Un ou plusieurs champs manquants")->persistent();
            return redirect()->back();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (auth()->user()->isTopManager()) {
            
        }
        abort(404);
    }
}
