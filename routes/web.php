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

Route::group(['namespace' => 'App\\Http\\Controllers'], function(){

    Auth::routes();

    Route::get('maintenance', 'App\\Http\\Controllers\\PageController@maintenance')->name('app.maintenance');

    Route::get('/', 'HomeController@index')->name('intro');

    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('support', 'PageController@support')->name('app.support')->middleware('auth');
    Route::get('support/{reference}', 'PageController@supportDetails')->name('app.support.details')->middleware('auth');
    
    Route::get('settings', 'PageController@settings')->name('app.settings')->middleware('auth');
    Route::post('settings/terms', 'PageController@terms')->name('app.settings.terms')->middleware('auth');
    Route::post('settings/privacy', 'PageController@privacy')->name('app.settings.privacy')->middleware('auth');
    Route::post('settings/user', 'PageController@settingsUser')->name('app.settings.user')->middleware('auth');
    Route::post('settings/app', 'PageController@settingsApp')->name('app.settings.app')->middleware('auth');

    Route::resource('chats', 'ChatsController')->middleware('auth');

    Route::resource('notifications', 'NotificationsController')->middleware('auth');
    Route::resource('packs', 'PacksController')->middleware('auth');
    Route::resource('gifts', 'DonsController')->middleware('auth');
    Route::group(['prefix' => 'gifts'], function(){
        Route::post('create/reward', 'DonsController@createReward')->name('gifts.reward.create')->middleware('auth');
        Route::get('series/{reference}', 'DonsController@suitsDetails')->name('gifts.series.details')->middleware('auth');
        Route::get('series/{reference}/donate/second', 'DonsController@suitsDonateSecond')->name('gifts.suits.donate.second')->middleware('auth');
        Route::get('series/{reference}/donate/third', 'DonsController@suitsDonateThird')->name('gifts.suits.donate.third')->middleware('auth');
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
    Route::get('bonus/claim', 'RoyaltiesController@claim')->name('bonus.claim')->middleware('auth');


    Route::get('affiliates', 'AccountController@affiliates')->name('account.affiliates')->middleware('auth');

    Route::get('messages', 'AccountController@messages')->name('account.messages')->middleware('auth');

    Route::resource('users', 'UsersController')->middleware('auth');
    Route::resource('roles', 'RolesController')->middleware('auth');

});
