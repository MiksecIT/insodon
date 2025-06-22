@extends('layouts.master')

@section('title')
    Paramètres
@endsection

@section('content')
    <div class="layout-wrapper layout-content-navbar">
        
        <div class="layout-container">

            @include('layouts.partials.sidebar')
            
            <div class="layout-page">

                @include('layouts.partials.navbar')
        
                <div class="content-wrapper">
                    
                    <div class="container-xxl flex-grow-1 container-p-y">
                        
                        <div class="row">
                            <div class="col-md-8">
                                <h4 class="fw-bold py-3">Paramètres</h4>
                                <p class="text-muted">Liste des paramètres</p>
                            </div>
                        </div>

                        @if (auth()->user()->isTopManager())
                        <div class="row">
                            <div class="col">
                                <div class="accordion mt-3" id="accordionTerm">
                            
                                    <div class="card accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button
                                            type="button"
                                            class="accordion-button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#terms"
                                            aria-expanded="false"
                                            aria-controls="#terms"
                                            >
                                                <i class="tf-icons bx bx-detail"></i> Conditions d'utilisation 
                                                
                                            </button>
                                        </h2>

                                        <div
                                            id="terms"
                                            class="accordion-collapse collapse"
                                            data-bs-parent="#accordionTerm"
                                        >
                                            <div class="accordion-body">
                                                <form action="{{ route('app.settings.terms') }}" method="POST">
                                                    @csrf
                                                    <div class="mb-3 col-md-12">
                                                        <label class="form-label" for="terms">Contenu</label>
                                                        <div class="input-group input-group-merge">
                                                            <textarea class="form-control" name="terms" id="" cols="30" rows="20" placeholder="Contenu des conditions d'utilisations...">{!! \App\Utils\Utils::appSettings()->terms !!}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <button type="submit" class="btn btn-outline-primary me-2">Enregistrer</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button
                                            type="button"
                                            class="accordion-button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#privacy"
                                            aria-expanded="false"
                                            aria-controls="#privacy"
                                            >
                                                <i class="tf-icons bx bx-lock"></i> Politique de confidentialité
                                                
                                            </button>
                                        </h2>

                                        <div
                                            id="privacy"
                                            class="accordion-collapse collapse"
                                            data-bs-parent="#accordionTerm"
                                        >
                                            <div class="accordion-body">
                                                <form action="{{ route('app.settings.privacy') }}" method="POST">
                                                    @csrf
                                                    <div class="mb-3 col-md-12">
                                                        <label class="form-label" for="terms">Contenu</label>
                                                        <div class="input-group input-group-merge">
                                                            <textarea class="form-control" name="privacy" id="" cols="30" rows="20" placeholder="Contenu de la politique de confidentialité...">{!! \App\Utils\Utils::appSettings()->privacy !!}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <button type="submit" class="btn btn-outline-primary me-2">Enregistrer</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <br>
                        @endif
                        

                        <div class="row">
                            <div class="col">
                                <div class="nav-align-top mb-4">
                                    <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link {{ auth()->user()->isTopManager() ? '' : 'active'}}"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-home"
                                            aria-controls="navs-pills-justified-home"
                                            aria-selected="true"
                                            >
                                                <i class="tf-icons bx bx-user"></i> Utilisateur
                                            </button>
                                        </li>
                                        @if (auth()->user()->isTopManager())
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link {{ auth()->user()->isTopManager() ? 'active' : '' }}"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-profile"
                                            aria-controls="navs-pills-justified-profile"
                                            aria-selected="{{ auth()->user()->isTopManager() ? 'true' : 'false'}}"
                                            >
                                            <i class="tf-icons bx bx-cog"></i> Application
                                            </button>
                                        </li>                                       
                                        @endif
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane fade {{ auth()->user()->isTopManager() ? '' : 'show active'}}" id="navs-pills-justified-home" role="tabpanel">
                                            <form action="{{ route("app.settings.user") }}" method="POST">
                                                @csrf
                                                <div class="row"> 
                                                    <div class="col-md-8">
                                                        <div>
                                                            <h6>Profile</h6>
                                                            <p>Gérer les informations personnelles &bullet; Elles ne sont modifiables qu'une seule fois.</p> 
                                                            <div class="row">
                                                                <div class="mb-3 col-md-6">
                                                                    <label for="firstname" class="form-label">Prénom(s)</label>
                                                                    <input {{ can_edit(auth()->user()->firstname) ? '' : 'disabled' }}
                                                                        class="form-control"
                                                                        type="text"
                                                                        id="firstname"
                                                                        name="firstname"
                                                                        autofocus
                                                                        value="{{ auth()->user()->firstname }}"
                                                                    />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <label for="lastname" class="form-label">Nom</label>
                                                                    <input class="form-control" value="{{ auth()->user()->lastname }}" {{ can_edit(auth()->user()->lastname) ? '' : 'disabled' }} type="text" name="lastname" id="lastname" />
                                                                </div>
                                                                <div class="mb-3 col-md-12">
                                                                    <label for="email" class="form-label">E-mail</label>
                                                                    <input disabled
                                                                        class="form-control"
                                                                        type="text"
                                                                        id="email"
                                                                        name="email"
                                                                        value="{{ auth()->user()->email }}"
                                                                        placeholder="Adress mail"
                                                                    />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <label class="form-label" for="phoneNumber">Numéro de téléphone</label>
                                                                    <div class="input-group input-group-merge">
                                                                        <input {{ can_edit(auth()->user()->phone_number) ? '' : 'disabled' }}
                                                                            type="text"
                                                                            id="phoneNumber"
                                                                            name="phoneNumber"
                                                                            class="form-control"
                                                                            placeholder="202 555 0111"
                                                                            value="{{ auth()->user()->phone_number }}"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <label class="form-label" for="country">Pays 
                                                                        @if (!is_null(auth()->user()->country))                                
                                                                        &bullet; <img src="{{ Vite::asset('resources/assets/img/countries/'.auth()->user()->country->shortern.'_flag.png') }}" style="height: 15px; width:15px; vertical-align:middle; margin-right:3px;" alt="{{ auth()->user()->country->shortern }}_flag">{{ auth()->user()->country->label }}
                                                                        @endif    
                                                                    </label>
                                                                    <select {{ can_edit(auth()->user()->country_id) ? '' : 'disabled' }} name="country" id="country" class="select2 form-select">
                                                                        <option value="">--Vide</option>
                                                                        @forelse ($countries as $country)
                                                                        <option 
                                                                            @if (!is_null(auth()->user()->country))
                                                                                @if($country->id == auth()->user()->country->id) 
                                                                                    selected="" 
                                                                                @endif value="{{$country->id}}">{{ $country->label }}
                                                                            @endif
                                                                        </option>
                                                                        @empty
                                                                        @endforelse
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                               
                                                    <div class="col-md-4">
                                                        <div>
                                                            <h6>Portefeuilles</h6>
                                                            <p>
                                                                Renseigner les portefeuilles à utiliser dans l'application.
                                                                <br><strong>NB:</strong> Ces informations ne sont modifiables qu'une seule fois.
                                                            </p>                                                    
                                                            <div class="alert alert-primary">
                                                                
                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_1)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet_1" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Portefeuile 1</h6>
                                                                            <input class="form-control"
                                                                            {{ can_edit(auth()->user()->wallet_1) ? '' : 'disabled' }}
                                                                            type="text" value="{{ auth()->user()->wallet_1 }}" name="wallet_1" placeholder="Entrer l'adresse du portefeuille">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_2)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet_2" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Portefeuile 2</h6>
                                                                            <input class="form-control"
                                                                            {{ can_edit(auth()->user()->wallet_2) ? '' : 'disabled' }}
                                                                            type="text" value="{{ auth()->user()->wallet_2 }}" name="wallet_2" placeholder="Entrer l'adresse du portefeuille">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_3)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet_3" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Portefeuile 3</h6>
                                                                            <input class="form-control"
                                                                            {{ can_edit(auth()->user()->wallet_3) ? '' : 'disabled' }}
                                                                            type="text" value="{{ auth()->user()->wallet_3 }}" name="wallet_3" placeholder="Entrer l'adresse du portefeuille">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_4)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet_4" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Portefeuile 4</h6>
                                                                            <input class="form-control"
                                                                            {{ can_edit(auth()->user()->wallet_4) ? '' : 'disabled' }}
                                                                            type="text" value="{{ auth()->user()->wallet_4 }}" name="wallet_4" placeholder="Entrer l'adresse du portefeuille">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_usdt)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/wallets/usdt.png') }}" alt="usdt" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Usdt</h6>
                                                                            <input class="form-control" 
                                                                            {{ can_edit(auth()->user()->wallet_usdt) ? '' : 'disabled' }}
                                                                            type="text" value="{{ auth()->user()->wallet_usdt }}" name="wallet_usdt" placeholder="Entrer l'adresse du portefeuille">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div class="row">
                                                    <div class="col">
                                                        <button type="submit" class="btn btn-outline-primary me-2">Enregistrer</button>
                                                        <a href="{{ route('home') }}" type="button" class="btn btn-outline-secondary">Annuler</a>
                                                    </div>
                                                </div>
                                            </form>                                           
                                        </div>

                                        @if (auth()->user()->isTopManager())
                                        <div class="tab-pane fade show active" id="navs-pills-justified-profile" role="tabpanel">
                                            <form action="{{ route('app.settings.app') }}" method="POST">
                                                @csrf
                                                <div class="row mb-4">
                                                    <div class="col-md-3">
                                                        <div class="mb-4">
                                                            <h6><i class="tf-icons bx bx-detail"></i> Généralités</h6>
                                                            <p>Paramètres généraux</p>                                                    
                                                            <div class="alert alert-primary">
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0"><i class="tf-icons bx bx-bell"></i> Notifications</h6>
                                                                            <small class="text-muted">Autoriser cette fonctionalité</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input class="form-check-input float-end" name="enable_notifications" @if (\App\Utils\Utils::appSettings()->enable_notifications) checked="" @endif type="checkbox" role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0"><i class="tf-icons bx bx-support"></i> Support</h6>
                                                                            <small class="text-muted">Autoriser cette fonctionalité</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input class="form-check-input float-end" name="enable_support" @if (\App\Utils\Utils::appSettings()->enable_support) checked="" @endif type="checkbox" role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0"><i class="tf-icons bx bx-detail"></i> Foire aux questions</h6>
                                                                            <small class="text-muted">Autoriser cette fonctionalité</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input class="form-check-input float-end" name="enable_faq" @if (\App\Utils\Utils::appSettings()->enable_faq) checked="" @endif type="checkbox" role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0"><i class="tf-icons bx bx-user"></i> Modification du profile</h6>
                                                                            <small class="text-muted">Autoriser cette fonctionalité</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input class="form-check-input float-end" name="enable_profile_edit" type="checkbox" @if (\App\Utils\Utils::appSettings()->enable_profile_edit) checked="" @endif role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="mb-4">
                                                            <h6><i class="tf-icons bx bx-detail"></i> Valeurs</h6>
                                                            <p>Les valeurs par défaut de l'application</p>                                                    
                                                            <div class="alert alert-primary">
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Message de bienvenue</h6>
                                                                            <small class="text-muted">Message de bienvenue à afficher dans la barre du haut</small>
                                                                            <textarea class="form-control" placeholder="Ecrivez le message ici..." name="welcome" cols="30" rows="4">{{ \App\Utils\Utils::appSettings()->welcome }}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div>
                                                            <h6><i class="tf-icons bx bx-wallet"></i> Portefeuilles</h6>
                                                            <p>Autoriser les portefeuilles à utiliser dans l'application</p>                                                    
                                                            <div class="alert alert-primary">
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0"> Portefeuille 1</h6>
                                                                            <small class="text-muted">Cliquer pour autoriser</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input name="enable_wallet_1" @if (\App\Utils\Utils::appSettings()->enable_wallet_1) checked="" @endif class="form-check-input float-end" type="checkbox" role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Portefeuille 2</h6>
                                                                            <small class="text-muted">Cliquer pour autoriser</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input name="enable_wallet_2" @if (\App\Utils\Utils::appSettings()->enable_wallet_2) checked="" @endif class="form-check-input float-end" type="checkbox" role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Portefeuille 3</h6>
                                                                            <small class="text-muted">Cliquer pour autoriser</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input name="enable_wallet_3" @if (\App\Utils\Utils::appSettings()->enable_wallet_3) checked="" @endif class="form-check-input float-end" type="checkbox" role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Portefeuille 4</h6>
                                                                            <small class="text-muted">Cliquer pour autoriser</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input name="enable_wallet_4" @if (\App\Utils\Utils::appSettings()->enable_wallet_4) checked="" @endif class="form-check-input float-end" type="checkbox" role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/wallets/usdt.png') }}" alt="usdt" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Usdt</h6>
                                                                            <small class="text-muted">Cliquer pour autoriser usdt</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input name="enable_wallet_usdt" class="form-check-input float-end" @if (\App\Utils\Utils::appSettings()->enable_wallet_usdt) checked="" @endif  type="checkbox" role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">                                                    
                                                        <div class="mb-4">
                                                            <h6><i class="tf-icons bx bx-block"></i> Suspension</h6>
                                                            <p>Gérer la suspension des utilisateurs</p>                                                    
                                                            <div class="alert alert-primary">
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Activer</h6>
                                                                            <small class="text-muted">Autoriser cette fonctionalité</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input class="form-check-input float-end" name="enable_suspension" type="checkbox" role="switch" @if (\App\Utils\Utils::appSettings()->enable_suspension) checked="" @endif />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Délai</h6>
                                                                            <small class="text-muted">Nombre de jour de suspension</small>
                                                                            <input class="form-control" type="number" value="{{ \App\Utils\Utils::appSettings()->suspension_delay }}" name="suspension_delay" placeholder="Nombre de jour de suspension">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Message</h6>
                                                                            <small class="text-muted">Message de suspension</small>
                                                                            <textarea class="form-control" placeholder="Ecrivez le message ici..." name="suspension_message" cols="30" rows="4">{{ \App\Utils\Utils::appSettings()->suspension_message }}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                                                   
                                                    </div>
                                                    <div class="col-md-3">                                                    
                                                        <div class="mb-4">
                                                            <h6><i class="tf-icons bx bx-box"></i> Recompense</h6>
                                                            <p>Gérer les recompense</p>                                                    
                                                            <div class="alert alert-primary">
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Délai de maturité</h6>
                                                                            <small class="text-muted">Nombre de jours avant association</small>
                                                                            <input class="form-control" type="number" value="{{ \App\Utils\Utils::appSettings()->reward_don_delay }}" name="reward_don_delay" placeholder="Pourcentage">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Facteur</h6>
                                                                            <small class="text-muted">Facteur de multiplication</small>
                                                                            <input class="form-control" type="number" value="{{ \App\Utils\Utils::appSettings()->reward_don_factor }}" name="reward_don_factor" placeholder="Pourcentage">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mb-4">
                                                            <h6><i class="tf-icons bx bx-rocket"></i> Bonus</h6>
                                                            <p>Gérer les bonus directs</p>                                                    
                                                            <div class="alert alert-primary">
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-9 mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Activer</h6>
                                                                            <small class="text-muted">Autoriser cette fonctionalité</small>
                                                                        </div>
                                                                        <div class="col-3 text-end">
                                                                            <div class="form-check form-switch">
                                                                                <input class="form-check-input float-end" name="enable_royalties" type="checkbox" @if (\App\Utils\Utils::appSettings()->enable_royalties) checked="" @endif role="switch" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Pourcentage</h6>
                                                                            <small class="text-muted">Pourcentage à préveler chez le filleul</small>
                                                                            <input class="form-control" type="text" value="{{ \App\Utils\Utils::appSettings()->royalties_percent }}" name="royalties_percent" placeholder="Pourcentage">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col mb-sm-0 mb-2">
                                                                            <h6 class="mb-0">Seuil</h6>
                                                                            <small class="text-muted">Seuil à atteindre avant de reclamer</small>
                                                                            <input class="form-control" type="text" value="{{ \App\Utils\Utils::appSettings()->royalties_threshold }}" name="royalties_threshold" placeholder="Seuil">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <button type="submit" class="btn btn-outline-primary me-2">Enregistrer</button>
                                                        <a href="{{ route('home') }}" type="button" class="btn btn-outline-secondary">Annuler</a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    @include('layouts.partials.footer')

                    <div class="content-backdrop fade"></div>
                </div>            
            </div>            
        </div>

        <div class="layout-overlay layout-menu-toggle"></div>

    </div>
@endsection

@section('js')
    
@endsection