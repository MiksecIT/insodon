<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/**
 * Login, Register
 */
// Auth::routes(['verify' => true]);

Route::get('/', function(){
    return redirect()->route('home');
});

Route::group(['namespace' => 'App\\Http\\Controllers'], function(){

    Route::get('/google/redirect', [App\Http\Controllers\GoogleLoginController::class, 'redirectToGoogle'])->name('google.redirect');
    Route::get('/google/callback', [App\Http\Controllers\GoogleLoginController::class, 'handleGoogleCallback'])->name('google.callback');

    Route::get('referal/check', [App\Http\Controllers\GoogleLoginController::class, 'checkReferalAfterGoogle'])->name('google.referal.check');
    Route::post('referal/confirm', [App\Http\Controllers\GoogleLoginController::class, 'confirmReferalAfterGoogle'])->name('google.referal.confirm');

    Auth::routes(['verify' => true]);

    Route::get('maintenance', 'App\\Http\\Controllers\\PageController@maintenance')->name('app.maintenance')->middleware('auth');

    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('support', 'PageController@support')->name('app.support')->middleware('auth');
    Route::get('support/{reference}', 'PageController@supportDetails')->name('app.support.details')->middleware('auth');
    
    Route::get('settings', 'PageController@settings')->name('app.settings')->middleware('auth');
    Route::post('settings/terms', 'PageController@terms')->name('app.settings.terms')->middleware('auth');
    Route::post('settings/privacy', 'PageController@privacy')->name('app.settings.privacy')->middleware('auth');
    Route::post('settings/user', 'PageController@settingsUser')->name('app.settings.user')->middleware('auth');
    Route::post('settings/app', 'PageController@settingsApp')->name('app.settings.app')->middleware('auth');

    Route::post('search', 'PageController@search')->name('app.search.init')->middleware('auth');

    Route::resource('chats', 'ChatsController')->middleware('auth');

    Route::resource('countries', 'CountriesController')->middleware('auth');

    Route::resource('notifications', 'NotificationsController')->middleware('auth');
    
    Route::resource('packs', 'PacksController')->middleware('auth');
    Route::resource('gifts', 'DonsController')->middleware('auth');
    Route::group(['prefix' => 'gifts'], function(){
        Route::post('create/reward', 'DonsController@createReward')->name('gifts.reward.create')->middleware('auth');
        Route::get('series/all/list', 'DonsController@seriesList')->name('gifts.series.list')->middleware('auth');
        Route::get('series/{reference}', 'DonsController@seriesDetails')->name('gifts.series.details')->middleware('auth');
    });
    Route::resource('faqs', 'FaqsController')->middleware('auth');
    Route::resource('associations', 'FusionsController')->middleware('auth');
    Route::group(['prefix' => 'associations'], function(){
        Route::post('gifts/create/reward/all', 'FusionsController@createFromDonButRewardFirst')->name('associations.createFromDonButRewardFirst')->middleware('auth');
        Route::get('create/gifts/{reference}', 'FusionsController@createFromDon')->name('associations.createFromDon')->middleware('auth');
        Route::get('create/rewards/{reference}', 'FusionsController@createFromReward')->name('associations.createFromReward')->middleware('auth');
        
        Route::post('store/new', 'FusionsController@storeAssociation')->name('associations.storeNew')->middleware('auth');
        Route::post('transactions/confirm', 'FusionsController@confirm')->name('associations.confirm')->middleware('auth');
    });
    // Route::resource('messages', 'MessagesController')->middleware('auth');
    Route::resource('rewards', 'RewardsController')->middleware('auth');
    Route::resource('bonus', 'RoyaltiesController')->middleware('auth');
    Route::post('bonus/claim', 'RoyaltiesController@claim')->name('bonus.claim')->middleware('auth');
    Route::post('bonus/approuve', 'RoyaltiesController@approuve')->name('bonus.approuve')->middleware('auth');


    Route::get('affiliates', 'AccountController@affiliates')->name('account.affiliates')->middleware('auth');

    Route::get('messages', 'AccountController@messages')->name('account.messages')->middleware('auth');

    Route::resource('users', 'UsersController')->middleware('auth');
    Route::post('users/toggle/block', 'UsersController@toggleBlock')->name('users.block.toggle')->middleware('auth');
    
    Route::resource('roles', 'RolesController')->middleware('auth');

});
