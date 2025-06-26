<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Plan;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;

use RealRashid\SweetAlert\Facades\Alert;

class GoogleLoginController extends Controller
{
    public function redirectToGoogle()
    {
        abort_unless(\App\Utils\Utils::appSettings()->enable_google_auth, 404);
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        abort_unless(\App\Utils\Utils::appSettings()->enable_google_auth, 404);

        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = User::where('email', $googleUser->email)->first();
        if(!$user)
        {
            $role = \App\Models\Role::where('reference', 'user')->first();

            $user = User::create(
                [
                    'reference' => \App\Utils\Utils::generateReference(User::all(), \App\Utils\Utils::fakeToken(20), 1),
                    'name' => $googleUser->name, 
                    'email' => $googleUser->email,
                    'role_id' => !is_null($role) ? $role->id : null,
                    'email_verified_at' => now(), 
                    'password' => \Hash::make(rand(100000,999999))
                ]
            );
        }

        # Init setting
        $user->InitSetting();

        Auth::login($user);

        return !is_null(auth()->user()->user_id) ? redirect(RouteServiceProvider::HOME) : redirect()->route('google.referal.check');
    }

    /**
     * Show the form to enter referal reference
     *
     * @return void
     */
    public function checkReferalAfterGoogle ()
    {
        if (is_null(auth()->user()->user_id)) {
            return view('auth.referal');
        }
        return redirect(RouteServiceProvider::HOME);
    }

    /**
     * Save user referal
     *
     * @param Request $request
     * @return void
     */
    public function confirmReferalAfterGoogle (Request $request)
    {
        if (is_null(auth()->user()->user_id)) {
            if ($request->has('r')) {
                $user = User::where('reference', $request->r)->first();
                if (is_null($user)) {
                    alert()->error("Introuvable", "Le code référent renseigné est introuvable.")->persistent();
                    return redirect()->back();    
                }

                auth()->user()->user_id = $user->id;
                auth()->user()->save();

            } else {
                alert()->error("Oups", "Impossible de traiter votre requête pour le moment.\n Veuillez recommencer plus tard")->persistent();
                return redirect()->back();
            }
        }
        return redirect(RouteServiceProvider::HOME);
    }
}
