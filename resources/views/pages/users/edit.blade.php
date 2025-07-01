@extends('layouts.master')

@section('title')
    Utilisateurs - Modification
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
                                <h4 class="fw-bold py-3">Modification &rarr; <a href="{{ route('users.show', $user->reference) }}"><strong>{{ $user->name }}</strong></a></h4>
                                <p class="text-muted">
                                    @if (auth()->user()->isPartOfAdmin())
                                    <a href="{{ route('users.index') }}"><span class="tf-icons bx bx-group"></span> Liste des utilisateurs</a>
                                    @endif
                                    &bullet; Modifier un utilisateur
                                </p>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <form id="formAccountSettings" method="POST" action="{{ route('users.update', $user->id) }}">
                                    <div class="row row-cols-1 row-cols-md-3 g-4 mb-3">
                                        <div class="col-md-8">
                                            <p>Détails</p>                                 
                                            <div>
                                                
                                                @csrf
                                                <input type="text" name="_method" value="PUT" hidden>
                                                <div class="row">
                                                    <div class="mb-3 col-md-4">
                                                        <label for="lastname" class="form-label">Nom</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="lastname"
                                                            name="lastname"
                                                            placeholder="Nom"
                                                            autofocus
                                                            
                                                            value="{{ $user->lastname }}"
                                                        />
                                                    </div> 
                                                    <div class="mb-3 col-md-8">
                                                        <label for="firstname" class="form-label">Prénom(s)</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="firstname"
                                                            name="firstname"
                                                            placeholder="Nom"
                                                            autofocus
                                                            
                                                            value="{{ $user->firstname }}"
                                                        />
                                                    </div>  

                                                    <div class="mb-3 col-md-12">
                                                        <label class="form-label" for="email">Adresse mail</label>
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                class="form-control"
                                                                placeholder="Adresse mail"
                                                                required
                                                                disabled
                                                                value="{{ $user->email }}"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="mb-3 col-md-{{ auth()->user()->isTopManager() ? '4' : '6' }}">
                                                        <label class="form-label" for="phoneNumber">Numéro de téléphone</label>
                                                        <div class="input-group input-group-merge">
                                                            <input {{ can_edit($user->phone_number) ? '' : 'disabled' }}
                                                                type="text"
                                                                id="phoneNumber"
                                                                name="phoneNumber"
                                                                class="form-control"
                                                                placeholder="202 555 0111"
                                                                value="{{ $user->phone_number }}"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="mb-3 col-md-{{ auth()->user()->isTopManager() ? '4' : '6' }}">
                                                        <label class="form-label" for="country">Pays 
                                                            @if (!is_null($user->country))                                
                                                            &bullet; <img src="{{ Vite::asset('resources/assets/img/countries/'.$user->country->shortern.'_flag.png') }}" style="height: 15px; width:15px; vertical-align:middle; margin-right:3px;" alt="{{ $user->country->shortern }}_flag">{{ $user->country->label }}
                                                            @endif    
                                                        </label>
                                                        <select {{ can_edit($user->country_id) ? '' : 'disabled' }} name="country" id="country" class="select2 form-select">
                                                            <option value="">--Vide</option>
                                                            @forelse ($countries as $country)
                                                            <option 
                                                                @if (!is_null($user->country))
                                                                    @if($country->id == $user->country->id) 
                                                                        selected="" 
                                                                    @endif 
                                                                @endif
                                                                value="{{$country->id}}">{{ $country->label }}
                                                            </option>
                                                            @empty
                                                            @endforelse
                                                        </select>
                                                    </div>

                                                    @if (auth()->user()->isTopManager())
                                                    <div class="mb-3 col-md-4">
                                                        <label for="role" class="form-label">Rôle @if(!is_null($user->role)) &bullet; {{ $user->role->label }} @endif</label>
                                                        <select required name="role" class="form-select" id="role" aria-label="Role">
                                                            <option selected="">--Vide</option>
                                                            @forelse ($roles as $role)

                                                                @php
                                                                    $show = false;
                                                                @endphp

                                                                @if ($role->reference == "root")
                                                                    @if (auth()->user()->isRoot())
                                                                        @php
                                                                            $show = true;
                                                                        @endphp
                                                                    @else
                                                                        @php
                                                                            $show = false;
                                                                        @endphp
                                                                    @endif
                                                                @else
                                                                    @php
                                                                        $show = true;
                                                                    @endphp
                                                                @endif

                                                                @if ($show)
                                                            <option @if ($user->role_id == $role->id) selected="" @endif value="{{ $role->id }}">{{ $role->label }}</option>
                                                                @endif
                                                            @empty
                                                            @endforelse
                                                        </select>
                                                    </div>
                                                    @endif

                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <a href="{{ route('users.show', $user->reference) }}" class="btn btn-outline-secondary">Annuler</a>
                                                        <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
                                                        
                                                    </div>
                                                </div>                                                                
                                                
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div>
                                                <h6>Portefeuilles</h6>
                                                <p>
                                                    Renseigner les portefeuilles à utiliser dans l'application.
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
                                                                {{ can_edit(auth()->user()->setting->wallet_1) ? '' : 'disabled' }}
                                                                type="text" value="{{ auth()->user()->setting->wallet_1 }}" name="wallet_1" placeholder="Entrer l'adresse du portefeuille">
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
                                                                {{ can_edit(auth()->user()->setting->wallet_2) ? '' : 'disabled' }}
                                                                type="text" value="{{ auth()->user()->setting->wallet_2 }}" name="wallet_2" placeholder="Entrer l'adresse du portefeuille">
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
                                                                {{ can_edit(auth()->user()->setting->wallet_3) ? '' : 'disabled' }}
                                                                type="text" value="{{ auth()->user()->setting->wallet_3 }}" name="wallet_3" placeholder="Entrer l'adresse du portefeuille">
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
                                                                {{ can_edit(auth()->user()->setting->wallet_4) ? '' : 'disabled' }}
                                                                type="text" value="{{ auth()->user()->setting->wallet_4 }}" name="wallet_4" placeholder="Entrer l'adresse du portefeuille">
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
                                                                {{ can_edit(auth()->user()->setting->wallet_usdt) ? '' : 'disabled' }}
                                                                type="text" value="{{ auth()->user()->setting->wallet_usdt }}" name="wallet_usdt" placeholder="Entrer l'adresse du portefeuille">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    @endif

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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