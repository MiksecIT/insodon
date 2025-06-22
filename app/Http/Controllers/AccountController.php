<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;

class AccountController extends Controller
{
    public function dashboard () 
    {
        return view('pages.account.dashboard');
    }
}
