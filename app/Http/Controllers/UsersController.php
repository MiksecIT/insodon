<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Don;
use \App\Models\Reward;
use \App\Models\User;
use \App\Models\Fusion;
use \App\Models\Country;
use \App\Models\Setting;
use \App\Utils\Utils;
use RealRashid\SweetAlert\Facades\Alert;

class UsersController extends Controller
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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $user = User::where('reference', $reference)->first();
        abort_unless(!is_null($user), 404);
        if (auth()->user()->hasAffiliate($user) || auth()->user()->id == $user->id || auth()->user()->isPartOfAdmin()) {
            
            if ($user->isRoot()) {
                if (auth()->user()->isRoot() == false) {
                    abort(403);
                }
            }

            return view('pages.users.show', compact('user'));

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $user = User::where('reference', $reference)->first();
        abort_unless(!is_null($user), 404);
        
        if (auth()->user()->isPartOfAdmin()) {
            
            if ($user->isRoot()) {
                if (auth()->user()->isRoot() == false) {
                    abort(404);
                }
            }            
        }

        $countries = \App\Models\Country::where('is_available', 1)->get();
        $roles = \App\Models\Role::all();

        return view('pages.users.edit', compact('user', 'roles', 'countries'));        
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

        abort_unless(auth()->user()->isPartOfAdmin(), 404);

        $user = User::find($id);

        abort_unless(!is_null($user), 404);

        if ($user->isRoot()) {
            if (auth()->user()->isRoot() == false) {
                abort(404);
            }
        } 

        if ($request->has('lastname') && $request->has('firstname') && $request->has('country') && $request->has('phoneNumber')) {
            
            $edited = 0;

            $setting = Setting::where("user_id", $user->id)->first();
            
            if (is_null($setting)) {
                $setting = $user->initSetting();
            }

            if (!is_null($request->country)) {
                $country = \App\Models\Country::find($request->country);
                if (is_null($country)) {
                    alert()->error("Introuvable", "Le pays est introuvable")->persistent();
                    return redirect()->back()->withInput();
                } else {
                    if ($country->id != $user->country_id) {
                        $user->country_id = $country->id;
                        $user->save();

                        $edited +=1;
                    }
                }
            }

            if (!is_null($request->firstname) && !is_null($request->lastname)) {
                $existingLastFirst = User::where("firstname", $request->firstname)->where('lastname', $request->lastname)->first();
                if (!is_null($existingLastFirst)) {
                    if ($existingLastFirst->id != $user->id) {
                        alert()->error("Erreur", "Le nom et le(s) prénom(s) sont déjà utilisés")->persistent();
                        return redirect()->back()->withInput();
                    } else {
                        if ($user->firstname != $request->firstname) {
                            $user->firstname = $request->firstname;
                            $user->save();

                            $edited +=1;
                        }
                        if ($user->lastname != $request->lastname) {
                            $user->lastname = $request->lastname;
                            $user->save();

                            $edited +=1;
                        }
                        $user->name = ucfirst($request->firstname).' '. ucfirst($request->lastname);
                        $user->save();
                    }
                }
            }
            
            if (!is_null($request->phoneNumber)) {
                $existingPhoneNumber = User::where("phone_number", $request->phoneNumber)->first();
                if (!is_null($existingPhoneNumber)) {
                    if ($existingPhoneNumber->id != $user->id) {
                        alert()->error("Erreur", "Le numéro de téléphone est déjà utilisé")->persistent();
                        return redirect()->back()->withInput();
                    } else {
                        if ($user->phone_number != $request->phoneNumber) {
                            $user->phone_number = $request->phoneNumber;
                            $user->save();

                            $edited +=1;
                        }
                    }
                } 
            }

            # Updating wallets

            # Wallet 1
            if ($request->has("wallet_1")) {
                if (can_edit($user->wallet_1)) {
                    if (!is_null($request->wallet_1)) {
                        $existingW1 = Setting::where('user_id', $user->id)->where('wallet_1', $request->wallet_1)->first();
                        if (!is_null($existingW1)) {
                            if ($existingW1->user_id != $user->id) {
                                alert()->error("Erreur", "Le portefeuille no.1 est déjà utilisé")->persistent();
                                return redirect()->back();
                            }
                        } else {
                            if ($setting->wallet_1 != $request->wallet_1) {
                                $setting->wallet_1 = $request->wallet_1;
                                $setting->save();

                                $edited +=1;
                            }

                        }
                    }
                }
            }
            # Wallet 2
            if ($request->has("wallet_2")) {
                if (can_edit($user->wallet_2)) {
                    if (!is_null($request->wallet_2)) {
                        $existingW2 = Setting::where('user_id', $user->id)->where('wallet_2', $request->wallet_2)->first();
                        if (!is_null($existingW2)) {
                            if ($existingW2->user_id != $user->id) {
                                alert()->error("Erreur", "Le portefeuille no.2 est déjà utilisé")->persistent();
                                return redirect()->back();
                            }
                        } else {
                            if ($setting->wallet_2 != $request->wallet_2) {
                                $setting->wallet_2 = $request->wallet_2;
                                $setting->save();

                                $edited +=1;
                            }

                        }
                    }
                }
            }
            # Wallet 3
            if ($request->has("wallet_3")) {
                if (can_edit($user->wallet_3)) {
                    if (!is_null($request->wallet_3)) {
                        $existingW3 = Setting::where('user_id', $user->id)->where('wallet_3', $request->wallet_3)->first();
                        if (!is_null($existingW3)) {
                            if ($existingW3->user_id != $user->id) {
                                alert()->error("Erreur", "Le portefeuille no.3 est déjà utilisé")->persistent();
                                return redirect()->back();
                            }
                        } else {
                            if ($setting->wallet_3 != $request->wallet_3) {
                                $setting->wallet_3 = $request->wallet_3;
                                $setting->save();

                                $edited +=1;
                            }

                        }
                    }
                }
            }
            # Wallet 4
            if ($request->has("wallet_4")) {
                if (can_edit($user->wallet_4)) {
                    if (!is_null($request->wallet_4)) {
                        $existingW4 = Setting::where('user_id', $user->id)->where('wallet_4', $request->wallet_4)->first();
                        if (!is_null($existingW4)) {
                            if ($existingW4->user_id != $user->id) {
                                alert()->error("Erreur", "Le portefeuille no.4 est déjà utilisé")->persistent();
                                return redirect()->back();
                            }
                        } else {
                            if ($setting->wallet_4 != $request->wallet_4) {
                                $setting->wallet_4 = $request->wallet_4;
                                $setting->save();

                                $edited +=1;
                            }

                        }
                    }
                }
            }
            # Wallet usdt
            if ($request->has("wallet_usdt")) {
                if (can_edit($user->wallet_usdt)) {
                    if (!is_null($request->wallet_usdt)) {
                        $existingWU = Setting::where('user_id', $user->id)->where('wallet_usdt', $request->wallet_usdt)->first();
                        if (!is_null($existingWU)) {
                            if ($existingWU->user_id != $user->id) {
                                alert()->error("Erreur", "Le portefeuille usdt est déjà utilisé")->persistent();
                                return redirect()->back();
                            }
                        } else {
                            if ($setting->wallet_usdt != $request->wallet_usdt) {
                                $setting->wallet_usdt = $request->wallet_usdt;
                                $setting->save();

                                $edited +=1;
                            }

                        }
                    }
                }
            }

            if ($edited > 0) {
                alert()->success("Terminé", "L'utilisateur [".$user->name."] a été modifié avec succès.\n Les portefeuilles ont été modifié également.")->persistent();
            } else {
                alert()->info("Info", "Aucune modification apportée.")->persistent();
            }
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
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }
        
        if (auth()->user()->isTopManager()) {
            
        }
        abort(404);
    }
}
