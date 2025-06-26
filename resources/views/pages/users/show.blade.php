@extends('layouts.master')

@section('title')
    Utilisateurs - Détails
@endsection

@section('content')
    <div class="layout-wrapper layout-content-navbar">
        
        <div class="layout-container">

            @include('layouts.partials.sidebar')
            
            <div class="layout-page">

                @include('layouts.partials.navbar')
        
                <div class="content-wrapper">
                    
                    <div class="container-xxl flex-grow-1 container-p-y">
                        
                        <div class="row mb-3">
                            <div class="col-md-8">
                                <h4 class="fw-bold py-3">
                                    Détails utilisateur &rarr; <a href="#!"><strong>{{ $user->name }}</strong></a> 
                                    @if (auth()->user()->id == $user->id)
                                    <span class="badge bg-label-secondary">Vous</span> 
                                    @endif                               
                                </h4>
                                <p class="text-muted">
                                    <span class="text-muted" style="font-size: 13px;">
                                        
                                        @if (auth()->user()->isPartOfAdmin())
                                        <a href="{{ route('users.index') }}"><span class="tf-icons bx bx-group"></span> Liste des utilisateurs</a>
                                        @endif

                                        @if (!is_null($user->message))
                                            @if (auth()->user()->id == $user->id || auth()->user()->isPartOfAdmin())
                                        &bullet;
                                        <a href="{{ route('app.support.details', $user->message->reference) }}"> <span class="tf-icons bx bx-support"></span> Voir le recours au support</a>
                                            @endif
                                        @endif

                                    </span>
                                </p>
                            </div>
                            
                            <div class="col-md-4">
                                @if (auth()->user()->isPartOfAdmin())
                                <a href="{{ route('users.edit', $user->reference) }}" type="button" class="btn btn-outline-secondary">
                                    <span class="tf-icons bx bx-edit"></span>&nbsp; Modifier
                                </a>
                                @endif
                                @if (auth()->user()->isTopManager())
                                <a href="#!" type="button" class="btn btn-outline-{{ $user->isBlocked() ? 'primary' : 'danger' }}"
                                    title="Suspendre {{ $user->name }}"
                                    type="button" 
                                    class="btn rounded-pill btn-icon btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#suspensionModal"
                                    >
                                    <span class="tf-icons bx bx-{{ $user->isBlocked() ? 'check' : 'block' }}"></span>&nbsp; {{ $user->isBlocked() ? 'Admettre' : 'Suspendre' }}
                                </a>
                                <div class="modal fade" id="suspensionModal" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="modalCenterTitle">{{ $user->isBlocked() ? 'Admission' : 'Suspension' }}</h5>
                                                <button
                                                    type="button"
                                                    class="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row">
                                                    <div class="col">
                                                        @if ($user->isBlocked() == false)
                                                        Voulez-vous vraiment suspendre {{ $user->name }} ? <br> <br>
                                                        Durée de la suspension: 
                                                        @if(!is_null(\App\Utils\Utils::appSettings()->suspension_delay) && \App\Utils\Utils::appSettings()->suspension_delay > 0) 
                                                        {{ \App\Utils\Utils::appSettings()->suspension_delay }} jour(s).
                                                        @else 
                                                        <span class="badge bg-label-secondary">pas renseigné</span> 
                                                        @endif
                                                        <br>
                                                        Estimation du retour: 
                                                        @if(!is_null(\App\Utils\Utils::appSettings()->suspension_delay) && \App\Utils\Utils::appSettings()->suspension_delay > 0)
                                                        {{ \Carbon\Carbon::parse(now())->addDays(\App\Utils\Utils::appSettings()->suspension_delay) }}
                                                        @else 
                                                        <span class="badge bg-label-secondary">Estimation impossible</span> 
                                                        @endif
                                                        @else
                                                        Voulez-vous vraiment admettre {{ $user->name }} ? <br> <br>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                    Non
                                                </button>
                                                <button onclick="$('#form-suspend{{ $user->reference }}').submit();" type="button" class="btn btn-primary">Oui, je confirme</button>
                                                <form id="form-suspend{{ $user->reference }}" action="{{ route('users.block.toggle') }}" method="POST">
                                                    @csrf
                                                    <input type="text" name="ack" value="{{ $user->reference }}" hidden>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="{{ route('users.create') }}" type="button" class="btn btn-outline-primary">
                                    <span class="tf-icons bx bx-user-plus"></span>&nbsp; Ajouter
                                </a>
                                @endif
                            </div>
                            
                        </div>  

                        <div class="row">
                            <div class="col">
                                <div class="nav-align-top mb-4">
                                    <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link active"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-info"
                                            aria-controls="navs-pills-justified-info"
                                            aria-selected="true"
                                            >
                                                <i class="tf-icons bx bx-user"></i> Info
                                            </button>
                                        </li>

                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-gifts"
                                            aria-controls="navs-pills-justified-gifts"
                                            aria-selected="false"
                                            >
                                                <i class="tf-icons bx bx-gift"></i> Dons &bullet; {{ count($user->dons) }}
                                            </button>
                                        </li>

                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-assoc"
                                            aria-controls="navs-pills-justified-assoc"
                                            aria-selected="false"
                                            >
                                                <i class="tf-icons bx bx-link"></i> Associations  &bullet; {{ count($user->relatedFusions()) }}
                                            </button>
                                        </li>
                                        
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-rewards"
                                            aria-controls="navs-pills-justified-rewards"
                                            aria-selected="false"
                                            >
                                            <i class="tf-icons bx bx-box"></i> Recompenses &bullet; {{ count($user->rewards) }}
                                            </button>
                                        </li>                                         
                                        
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-people"
                                            aria-controls="navs-pills-justified-people"
                                            aria-selected="false"
                                            >
                                            <i class="tf-icons bx bx-group"></i> Communauté &bullet; {{ count($user->affiliates) }}
                                            </button>
                                        </li>
                                        
                                    </ul>
                                    <div class="tab-content">
                                        
                                        <div class="tab-pane fade show active" id="navs-pills-justified-info" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Informations utilisateur
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <div class="card mb-4">
                                                        <div class="card-header"><span class="tf-icons bx bx-user"></span> Utilisateur
                                                            @if (!is_null($user->country))
                                                                &bullet;
                                                                @if (!is_null($user->country->shortern))
                                                            <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$user->country->shortern.'_flag.png') }}">
                                                                @endif
                                                                {{ $user->country->label }}
                                                            @endif
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <strong>Reference:</strong> 
                                                                    #{{ $user->reference }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Prénom(s):</strong> 
                                                                    @if (!is_null($user->firstname))
                                                                    {{ $user->firstname }}
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas renseigné</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Nom:</strong> 
                                                                    @if (!is_null($user->lastname))
                                                                    {{ $user->lastname }}
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas renseigné</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Nom complet:</strong> 
                                                                    @if (!is_null($user->name))
                                                                    {{ $user->name }}
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas renseigné</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Adresse mail:</strong> 
                                                                    @if (!is_null($user->email))
                                                                    {{ $user->email }} <span class="badge bg-label-{{ !is_null($user->email_verified_at) ? 'success' : 'secondary' }}"><span class="tf-icons bx bx-check"></span> vérifié</span>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas renseigné</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Création:</strong> 
                                                                    {{ $user->created_at }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card mb-4">
                                                        <div class="card-header">
                                                            <span class="tf-icons bx bx-group"></span> Communauté
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <strong>Code référent:</strong> 
                                                                    <strong class="text-primary">
                                                                        {{ $user->reference }}
                                                                    </strong>
                                                                </div>
                                                                <div class="col-12 mb-3"> 
                                                                    <strong>Parrain:</strong> 
                                                                    @if (!is_null($user->parent))                                                    
                                                                        <a href="{{ route('users.show', $user->parent->reference) }}" style="display: block; width:100%; margin-top:20px;" type="button" class="btn btn-outline-primary">
                                                                            <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/5.png')}}" alt="Avatar" class="rounded-circle" />
                                                                                {{$user->parent->name}} 
                                                                            </span>
                                                                            @if (!is_null($user->parent->country))
                                                                                @if (!is_null($user->parent->country->shortern))
                                                                            <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$user->parent->country->shortern.'_flag.png') }}">
                                                                                @endif
                                                                            @endif
                                                                            <span class="text-muted">@if($user->parent->id == auth()->user()->id) <span class="badge bg-label-secondary">Vous</span> @endif</span>
                                                                        </a>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">introuvable</span>
                                                                    @endif                                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="card">
                                                        <div class="card-header">
                                                            <i class="tf-icons bx bx-wallet"></i> Portefeuiles
                                                        </div>
                                                        <div class="card-body">
                                                            <p class="text-muted" style="font-size:12px;">NB:</strong> Ces informations ne sont modifiables qu'une seule fois.</p>                                                    
                                                            @include('layouts.components.wallet-component', ["user" => $user])
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-gifts" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Tous les dons
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($user->dons) >0)
                                                    @include("layouts.components.donsList-component", ["dons" => $user->dons])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-assoc" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Toutes les associations
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($user->relatedFusions()) >0)
                                                    @include("layouts.components.fusionsList-component", ["fusions" => $user->relatedFusions(), "view" => "all"])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-rewards" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Toutes les recompenses.
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($user->rewards) >0)
                                                    @include("layouts.components.rewardsList-component", ["rewards" => $user->rewards])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-people" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        La communauté.
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($user->affiliates) >0)
                                                    @include("layouts.components.usersList-component", ["users" => $user->affiliates])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                    
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