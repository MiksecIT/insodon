<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Message;
use \App\Models\AppSetting;
use \App\Models\User;
use \App\Models\Setting;
use \App\Models\Country;
use RealRashid\SweetAlert\Facades\Alert;

class PageController extends Controller
{
    /**
     * User settings update
     *
     * @param Request $request
     * @return void
     */
    public function settingsUser (Request $request)
    {        
        $edited = 0;

        $setting = Setting::where("user_id", auth()->user()->id)->first();
        
        if (is_null($setting)) {
            $setting = auth()->user()->initSetting();
        }

        # Lastname && Firstname
        if ($request->has("firstname") && $request->has("lastname")) {
            if (can_edit(auth()->user()->firstname) && can_edit(auth()->user()->lastname)) {
                if (!is_null($request->firstname) && !is_null($request->lastname)) {
                    $existingLastFirst = User::where('lastname', $request->lastname)->where('firstname', $request->firstname)->first();
                    if (!is_null($existingLastFirst)) {
                        if ($existingLastFirst->id != auth()->user()->id) {
                            alert()->error("Erreur", "Le nom et le(s) prénom(s) sont déjà utilisés.")->persistent();
                            return redirect()->back();
                        }
                    } else {
                        if (auth()->user()->lastname != $request->lastname || auth()->user()->firstname != $request->firstname) {
                            auth()->user()->lastname = $request->lastname;
                            auth()->user()->firstname = $request->firstname;
                            auth()->user()->name = ucfirst($request->firstname).' '.ucfirst($request->lastname);
                            auth()->user()->save();

                            $edited +=1;
                        }
                    }
                }
            }
        }
        # PhoneNumber
        if ($request->has("phoneNumber")) {
            if (can_edit(auth()->user()->phone_number)) {
                if (!is_null($request->phoneNumber)) {
                    $existingPhone = User::where('phone_number', $request->phoneNumber)->first();
                    if (!is_null($existingPhone)) {
                        if ($existingPhone->id != auth()->user()->id) {
                            alert()->error("Erreur", "Le numéro de téléphone est déjà utilisé.")->persistent();
                            return redirect()->back();
                        }
                    } else {
                        if (auth()->user()->phone_number != $request->phoneNumber) {
                            auth()->user()->phone_number = $request->phoneNumber;
                            auth()->user()->save();

                            $edited +=1;
                        }

                    }
                }
            }
        }
        # Country
        if ($request->has("country")) {
            if (can_edit(auth()->user()->country_id)) {
                if (!is_null($request->country)) {
                    $country = Country::find($request->country);
                    if (!is_null($country)) {
                        if (auth()->user()->country_id != $country->id) {
                            auth()->user()->country_id = $country->id;
                            auth()->user()->save();

                            $edited +=1;
                        }
                    } else {
                        alert()->error("Erreur", "Le pays selectionné est introuvable")->persistent();
                        return redirect()->back();
                    }
                }
            }
        }
        # Wallet 1
        if ($request->has("wallet_1")) {
            if (can_edit(auth()->user()->wallet_1)) {
                if (!is_null($request->wallet_1)) {
                    $existingW1 = Setting::where('user_id', auth()->user()->id)->where('wallet_1', $request->wallet_1)->first();
                    if (!is_null($existingW1)) {
                        if ($existingW1->user_id != auth()->user()->id) {
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
            if (can_edit(auth()->user()->wallet_2)) {
                if (!is_null($request->wallet_2)) {
                    $existingW2 = Setting::where('user_id', auth()->user()->id)->where('wallet_2', $request->wallet_2)->first();
                    if (!is_null($existingW2)) {
                        if ($existingW2->user_id != auth()->user()->id) {
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
            if (can_edit(auth()->user()->wallet_3)) {
                if (!is_null($request->wallet_3)) {
                    $existingW3 = Setting::where('user_id', auth()->user()->id)->where('wallet_3', $request->wallet_3)->first();
                    if (!is_null($existingW3)) {
                        if ($existingW3->user_id != auth()->user()->id) {
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
            if (can_edit(auth()->user()->wallet_4)) {
                if (!is_null($request->wallet_4)) {
                    $existingW4 = Setting::where('user_id', auth()->user()->id)->where('wallet_4', $request->wallet_4)->first();
                    if (!is_null($existingW4)) {
                        if ($existingW4->user_id != auth()->user()->id) {
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
            if (can_edit(auth()->user()->wallet_usdt)) {
                if (!is_null($request->wallet_usdt)) {
                    $existingWU = Setting::where('user_id', auth()->user()->id)->where('wallet_usdt', $request->wallet_usdt)->first();
                    if (!is_null($existingWU)) {
                        if ($existingWU->user_id != auth()->user()->id) {
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
            toast("Paramètres modifiés avec succès", "success");
        } else {
            toast("Pas de changement appliqué", "info");
        }

        return redirect()->back();
    }

    /**
     * App settings update
     *
     * @param Request $request
     * @return void
     */
    public function settingsApp (Request $request) 
    {
        abort_unless(auth()->user()->isTopManager(), 403);

        # Loading appSetting
        $appSetting = AppSetting::get()->first();
        if (is_null($appSetting)) {
            $appSetting = AppSetting::create([
                "created_at" => now(),
                "updated_at" => now(),
            ]);
        }
        # Google authentification
        if ($request->has('enable_google_auth')) {
            $appSetting->enable_google_auth = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_google_auth = 0;
            $appSetting->save();
        }
        # Notifications
        if ($request->has('enable_notifications')) {
            $appSetting->enable_notifications = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_notifications = 0;
            $appSetting->save();
        }
        # Support
        if ($request->has('enable_support')) {
            $appSetting->enable_support = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_support = 0;
            $appSetting->save();
        }
        # FAQ
        if ($request->has('enable_faq')) {
            $appSetting->enable_faq = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_faq = 0;
            $appSetting->save();
        }
        # Profile edit
        if ($request->has('enable_profile_edit')) {
            $appSetting->enable_profile_edit = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_profile_edit = 0;
            $appSetting->save();
        }
        # Wallet 1
        if ($request->has('enable_wallet_1')) {
            $appSetting->enable_wallet_1 = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_wallet_1 = 0;
            $appSetting->save();
        }
        # Wallet 2
        if ($request->has('enable_wallet_2')) {
            $appSetting->enable_wallet_2 = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_wallet_2 = 0;
            $appSetting->save();
        }
        # Wallet 3
        if ($request->has('enable_wallet_3')) {
            $appSetting->enable_wallet_3 = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_wallet_3 = 0;
            $appSetting->save();
        }
        # Wallet 4
        if ($request->has('enable_wallet_4')) {
            $appSetting->enable_wallet_4 = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_wallet_4 = 0;
            $appSetting->save();
        }
        # Wallet usdt
        if ($request->has('enable_wallet_usdt')) {
            $appSetting->enable_wallet_usdt = 1;
            $appSetting->save();
        } else {
            $appSetting->enable_wallet_usdt = 0;
            $appSetting->save();
        }
        # Welcome
        if ($request->has('welcome')) {
            $appSetting->welcome = $request->welcome;
            $appSetting->save();
        }
        # Royalties
        if ($request->has('enable_royalties')) {
            $appSetting->enable_royalties = 1;
            $appSetting->save();

            if ($request->has('royalties_percent')) {
                if (!is_null($request->royalties_percent) && $request->royalties_percent > 0 && $request->royalties_percent != "") {
                    $appSetting->royalties_percent = $request->royalties_percent;
                    $appSetting->save();
                } else {
                    alert()->error("Bonus activé", "Veuillez spécifier le pourcentage du bonus")->persistent();
                    return redirect()->back();
                }
            } else {
                alert()->error("Bonus activé", "Veuillez spécifier le pourcentage du bonus")->persistent();
                return redirect()->back();
            }

            if ($request->has('royalties_threshold')) {
                if (!is_null($request->royalties_threshold) && $request->royalties_threshold > 0 && $request->royalties_threshold != "") {
                    $appSetting->royalties_threshold = $request->royalties_threshold;
                    $appSetting->save();
                } else {
                    alert()->error("Bonus activé", "Veuillez spécifier le seuil de reclamation des bonus")->persistent();
                    return redirect()->back();
                }
            } else {
                alert()->error("Bonus activé", "Veuillez spécifier le seuil de reclamation des bonus")->persistent();
                return redirect()->back();
            }

        } else {
            $appSetting->enable_royalties = 0;
            $appSetting->save();
        } 
        # Rewards
        if ($request->has('reward_don_delay')) {
            $appSetting->reward_don_delay = $request->reward_don_delay;
            $appSetting->save();
        } 
        if ($request->has('reward_don_factor')) {
            $appSetting->reward_don_factor = $request->reward_don_factor;
            $appSetting->save();
        } 
        # Suspension
        if ($request->has('enable_suspension')) {
            $appSetting->enable_suspension = 1;
            $appSetting->save();

            if ($request->has('suspension_delay')) {
                if (!is_null($request->suspension_delay) && $request->suspension_delay > 0 && $request->suspension_delay != "") {
                    $appSetting->suspension_delay = $request->suspension_delay;
                    $appSetting->save();
                } else {
                    alert()->error("Suspension activée", "Veuillez spécifier le délais")->persistent();
                    return redirect()->back();
                }
            } else {
                alert()->error("Suspension activée", "Veuillez spécifier le délais")->persistent();
                return redirect()->back();
            }

            if ($request->has('suspension_delay')) {
                if (!is_null($request->suspension_message) && $request->suspension_message != "") {
                    $appSetting->suspension_message = $request->suspension_message;
                    $appSetting->save();
                } else {
                    alert()->error("Suspension activée", "Veuillez spécifier le message")->persistent();
                    return redirect()->back();
                }
            } else {
                alert()->error("Suspension activée", "Veuillez spécifier le message.")->persistent();
                return redirect()->back();
            }

        } else {
            $appSetting->enable_suspension = 0;
            $appSetting->save();
        }

        toast("Paramètres modifiés avec succès", "success");
        return redirect()->back();
    }

    /**
     * App privacy update
     *
     * @param Request $request
     * @return void
     */
    public function privacy (Request $request)
    {
        abort_unless(auth()->user()->isTopManager(), 403);  
        if ($request->has('privacy')) {
            if (is_null($request->privacy)) {
                alert()->error("Vide", "Aucune valeur renseignée")->persistent();
                return redirect()->back();
            }
            
            $appSetting = AppSetting::get()->first();
            if (is_null($appSetting)) {
                $appSetting = AppSetting::create([
                    "created_at" => now(),
                    "updated_at" => now(),
                ]);
            }
            
            $appSetting->privacy = $request->privacy;
            $appSetting->save();

            alert()->success("Terminé", "Politique de confidentialité modifié")->persistent();
            return redirect()->back();

        } else {
            alert()->error("Erreur", "Un ou plusieurs champs manquants")->persistent();
            return redirect()->back();
        }
    }

    /**
     * App terms update
     *
     * @param Request $request
     * @return void
     */
    public function terms (Request $request)
    {
        abort_unless(auth()->user()->isTopManager(), 403);  
        if ($request->has('terms')) {
            if (is_null($request->terms)) {
                alert()->error("Vide", "Aucune valeur renseignée")->persistent();
                return redirect()->back();
            }
            
            $appSetting = AppSetting::get()->first();
            if (is_null($appSetting)) {
                $appSetting = AppSetting::create([
                    "created_at" => now(),
                    "updated_at" => now(),
                ]);
            }
            
            $appSetting->terms = $request->terms;
            $appSetting->save();

            alert()->success("Terminé", "Conditions d'utilisation modifiés")->persistent();
            return redirect()->back();
            
        } else {
            alert()->error("Erreur", "Un ou plusieurs champs manquants")->persistent();
            return redirect()->back();
        }
    }

    /**
     * Page support
     *
     * @return void
     */
    public function support ()
    {
        abort_unless(\App\Utils\Utils::appSettings()->enable_support, 404);
        if (is_null(auth()->user()->isBlocked())) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $messages = Message::where("to", null)->get();
        $message = Message::where('from', auth()->user()->id)->first();
        if (is_null($message)) {
            $message = Message::create([
                'reference' => \App\Utils\Utils::generateReference(Message::all(), \App\Utils\Utils::fakeToken(20), 1),
                'from' => auth()->user()->id,
                'to' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        return view('pages.support', compact('message', 'messages'));
    }

    /**
     * Page support details
     *
     * @param [type] $reference
     * @return void
     */
    public function supportDetails ($reference)
    {
        abort_unless(\App\Utils\Utils::appSettings()->enable_support, 404);
        if (is_null(auth()->user()->isBlocked())) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        $message = Message::where("reference", $reference)->first();
        abort_unless(!is_null($message), 404);   
        abort_unless($message->user->id == auth()->user()->id || auth()->user()->isPartOfAdmin(), 403);     
        $messages = Message::where("to", null)->get();
        return view('pages.support', compact('message', 'messages'));
    }

    /**
     * Page settings
     *
     * @return void
     */
    public function settings ()
    {
        if (is_null(auth()->user()->isBlocked())) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }
        if (is_null(auth()->user()->setting)) {
            $setting = auth()->user()->initSetting();
        }
        $countries = \App\Models\Country::all();
        return view('pages.settings', compact('countries'));
    }

    /**
     * Page maintenance
     *
     * @return void
     */
    public function maintenance ()
    {
        return view('pages.maintenance');
    }
}
