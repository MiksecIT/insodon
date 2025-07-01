@extends('layouts.master')

@section('title')
    Réinitialisation du mot de passe &bullet; Compte
@endsection

@section('content')

    <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                <div class="card">
                    <div class="card-body">

                        <div class="app-brand justify-content-center">
                            <a href="{{ url('/') }}" class="app-brand-link gap-2">
                                <span class="app-brand-logo">
                                    <img style="height: 50px; width:50px; object-fit:contain;" src="{{ Vite::asset('resources/assets/img/favicon/logo.jpg') }}" alt="">
                                </span>
                                <span class="app-brand-text demo text-body fw-semibolder">{{config('app.name')}}</span>
                            </a>
                        </div>
                        
                        <h4 class="mb-2">Réinitialisation du mot de passe</h4>
                        <p class="mb-4">Veuillez fournir les informations ci-dessous</p>

                        <form id="formAuthentication" class="mb-3" action="{{ route('password.update') }}" method="POST">
                            @csrf
                            
                            <input type="hidden" name="token" value="{{ $token }}">

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Votre addresse mail"
                                    autofocus
                                    value="{{ $email ?? old('email') }}"
                                />
                                @error('email')
                                    <div class="alert alert-danger alert-dismissible" role="alert">
                                        {{ $message }}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                @enderror
                            </div>
                            <div class="mb-3 form-password-toggle">
                                <div class="d-flex justify-content-between">
                                    <label class="form-label" for="password">Mot de passe</label>
                                </div>
                                <div class="input-group input-group-merge">
                                    <input
                                    type="password"
                                    id="password"
                                    class="form-control"
                                    name="password"
                                    aria-describedby="password"
                                    required autocomplete="current-password"
                                    />
                                    @error('password')
                                        <div class="alert alert-danger alert-dismissible" role="alert">
                                            {{ $message }}
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    @enderror
                                </div>
                            </div>
                            <div class="mb-3 form-password-toggle">
                                <label class="form-label" for="password">Confirmer Mot de passe</label>
                                <div class="input-group input-group-merge">
                                    <input
                                    type="password"
                                    id="password"
                                    class="form-control"
                                    name="password_confirmation"
                                    aria-describedby="password_confirmation"
                                    name="password_confirmation" required autocomplete="new-password"
                                    />
                                </div>
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-primary d-grid w-100" type="submit">Réinitialiser le mot de passe</button>
                            </div>
                        </form>

                    </div>
                    <div class="text-center text-muted" style="font-size:13px; padding: 10px;">
                        <a href="javascript:void(0);" style="color:inherit;" data-bs-toggle="modal" data-bs-target="#termsModal">Conditions d'utilisation</a> 
                        &bullet;
                        <a href="javascript:void(0);" style="color:inherit;" data-bs-toggle="modal" data-bs-target="#privacyModal">Politique de confidentialité</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @if (!is_null(\App\Utils\Utils::appSettings()->terms))
    <div class="modal fade" id="termsModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalFullTitle">Condition d'utilisation</h5>
                <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <div>
                    {!! \App\Utils\Utils::appSettings()->terms !!}
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Fermer
                </button>
            </div>
            </div>
        </div>
    </div>
    @endif

    @if(!is_null(\App\Utils\Utils::appSettings()->privacy))
    <div class="modal fade" id="privacyModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalFullTitle">Politique de confidentialité</h5>
                <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <div> 
                    {!! \App\Utils\Utils::appSettings()->privacy !!}
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Fermer
                </button>
            </div>
            </div>
        </div>
    </div>
    @endif

@endsection
