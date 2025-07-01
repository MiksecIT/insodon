@extends('layouts.master')

@section('title')
    L'union fait la force 🚀 &bullet; Inscription
@endsection

@section('content')

    <div class="container-xxl">
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">
          <!-- Register Card -->
          <div class="card">
            <div class="card-body">
              <!-- Logo -->
              <div class="app-brand justify-content-center">
                <a href="{{ url('/') }}" class="app-brand-link gap-2">
                    <span class="app-brand-logo">
                        <img style="height: 50px; width:50px; object-fit:contain;" src="{{ Vite::asset('resources/assets/img/favicon/logo.jpg') }}" alt="">
                    </span>
                    <span class="app-brand-text demo text-body fw-semibolder">{{config('app.name')}}</span>
                </a>
              </div>
              <!-- /Logo -->
              <h4 class="mb-2">Inscription</h4>
              <p class="mb-4">Veuillez renseigner vos différentes détails svp.</p>

              <form id="formAuthentication" class="mb-3" action="{{ route('register') }}" method="POST">
                @csrf
                <div class="mb-3">
                    <label for="name" class="form-label">Nom</label>
                    <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        placeholder="Entrer votre"
                        autofocus
                        value="{{ old('name') }}" required autocomplete="name"
                    />
                    @error('name')
                        <div class="alert alert-danger alert-dismissible" role="alert">
                            {{ $message }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @enderror
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Adresse mail</label>
                  <input type="text" class="form-control" id="email" name="email" placeholder="Enter your email" value="{{ old('email') }}" required autocomplete="email"/>
                    @error('email')
                        <div class="alert alert-danger alert-dismissible" role="alert">
                            {{ $message }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @enderror
                </div>
                <div class="mb-3 form-password-toggle">
                    <label class="form-label" for="password">Mot de passe</label>
                    <div class="input-group input-group-merge">
                        <input
                        type="password"
                        id="password"
                        class="form-control"
                        name="password"
                        aria-describedby="password"
                        />
                    </div>
                    @error('password')
                        <div class="alert alert-danger alert-dismissible" role="alert">
                            {{ $message }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @enderror
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

                {{-- <hr> --}}

                <div class="mb-3">
                    <label for="name" class="form-label">Code référent</label>
                    <input
                        type="text"
                        class="form-control"
                        id="parent"
                        name="referal"
                        placeholder="Entrer Code référent"
                        autofocus
                        value="{{ old('referal') }}" required autocomplete="parent"
                    />
                    @error('referal')
                        <div class="alert alert-danger alert-dismissible" role="alert">
                            {{ $message }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @enderror
                </div>

                <hr>

                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" required id="terms-conditions" name="privacy_terms" {{ old('privacy_terms') ? 'checked' : '' }}/>
                        <label class="form-check-label" for="terms-conditions">
                        Je confirme avoir bien lu 
                        <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#privacyModal">la politique de confidentialité</a> et <a href="javascript:void(0);"  data-bs-toggle="modal" data-bs-target="#termsModal">les conditions d'utilisation</a> de la plateforme
                        </label>

                    </div>
                </div>
                <button class="btn btn-primary d-grid w-100">S'inscrire</button>
                
                @if (\App\Utils\Utils::appSettings()->enable_google_auth)
                <div class="mb-3 mt-3">
                    <a href="{{ route('google.redirect') }}" class="btn btn-outline-primary d-grid w-100" type="submit">
                        <i class="tf-icons bx bx-google"></i> Continuer avec Google
                    </a>
                </div>
                @endif

              </form>

              <p class="text-center">
                <span>Déjà un membre ?</span>
                <a href="{{ route('login') }}">
                  <span>Se connecter</span>
                </a>
              </p>
            </div>
          </div>
          <!-- Register Card -->
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
