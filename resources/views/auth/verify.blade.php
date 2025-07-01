@extends('layouts.master')

@section('title')
    Vérification de l'adresse mail &bullet; Compte
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
                        
                        <h4 class="mb-2">Vérification du compte.</h4>
                        <p class="mb-4">Avant de continuer, veuillez vérifier votre boîte mail car un lien vous a été envoyé.</p>

                        @if (session('resent'))
                            <div class="alert alert-success alert-dismissible" role="alert">
                                Un nouveau lien de vérification vous a été envoyé.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        @endif

                        <form id="formAuthentication" class="mb-3" action="{{ route('verification.resend') }}" method="POST">
                            @csrf
                            <div class="mb-3">
                                <button class="btn btn-primary d-grid w-100" type="submit">Demander un nouveau lien</button>
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
