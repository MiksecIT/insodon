@extends('layouts.master')

@section('title')
    Retour sur investissement - Détails
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
                                <h4 class="fw-bold py-3">
                                    Détails du la recompense
                                    <span class="badge bg-label-{{ $reward->isReady() ? 'success' : 'danger'}}">@if($reward->isReady()) mature @else pas encore mature @endif</span>
                                </h4>
                                <p class="text-muted">
                                    <span class="text-muted" style="font-size: 13px;">
                                        @if (!is_null($reward->don))
                                        Recompense du @if($reward->don->position == 'first')premier @elseif($reward->don->position == 'second')deuxième @elseif($reward->don->position == 'third')troisième et dernier @endif don de la série @if($reward->don->is_first) <a href="{{ route('gifts.series.details', $reward->don->reference) }}"><strong>{{ "#".$reward->don->reference }}</strong></a> @elseif(!is_null($reward->don->parent)) <a href="{{ route('gifts.series.details', $reward->don->parent->reference) }}"><strong>{{ "#".$reward->don->parent->reference }}</strong></a> @endif
                                        @endif
                                    </span>
                                </p>
                            </div>
                            <div class="col-md-4" style="text-align: right !important;">
                                <a href="{{ route('packs.index') }}" type="button" class="btn btn-outline-primary">
                                    <span class="tf-icons bx bx-gift"></span>&nbsp; Faire un don
                                </a>
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
                                            data-bs-target="#navs-pills-justified-detail"
                                            aria-controls="navs-pills-justified-detail"
                                            aria-selected="true"
                                            >
                                                <i class="tf-icons bx bx-gift"></i> Details &bullet; {{ count($reward->fusionsCompleted()).'/'.count($reward->fusions) }}
                                            </button>
                                        </li>

                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-all"
                                            aria-controls="navs-pills-justified-all"
                                            aria-selected="false"
                                            >
                                                <i class="tf-icons bx bx-link"></i> Les associations  &bullet; {{ count($reward->fusions) }}
                                            </button>
                                        </li>
                                        
                                        
                                    </ul>
                                    <div class="tab-content">
                                        
                                        <div class="tab-pane fade show active" id="navs-pills-justified-detail" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Détails de la recompense
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div class="row mb-4">
                                                <div class="col-sm-4">
                                                    <div class="card">
                                                        <div class="card-header"><span class="tf-icons bx bx-box"></span> Recompense 
                                                            @if ($reward->isInitiale())
                                                            <span class="badge bg-label-warning">Recompense initiale</span>                                         
                                                            @endif
                                                        </div>
                                                        <div class="card-body">
                                                            @if(!is_null($reward))
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <strong>Reference:</strong> 
                                                                    #{{ $reward->reference }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Montant:</strong> 
                                                                    @convert($reward->amount) <span class="text-muted">FCFA</span>
                                                                </div>
                                                                <div class="col-12  mb-3">
                                                                    <strong>Montant restant:</strong> 
                                                                    @if (!is_null($reward->remaining_amount) && $reward->remaining_amount > 0)
                                                                    @convert($reward->remaining_amount) <span class="text-muted">FCFA</span>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">rien</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Création:</strong> 
                                                                    {{ $reward->created_at }}
                                                                </div>
                                                                <div class="col-12  mb-3">
                                                                    <strong>Clôture:</strong> 
                                                                    @if (!is_null($reward->last_received_at))
                                                                    {{ $reward->last_received_at }}
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas encore</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Maturité:</strong> 
                                                                    {{ \Carbon\Carbon::parse($reward->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay) }} &bullet; 
                                                                    @if (\Carbon\Carbon::parse($reward->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay) > now())
                                                                    Dans
                                                                    @else
                                                                    Il y a
                                                                    @endif
                                                                    {{ \Carbon\Carbon::parse($reward->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay)->diffInDays(now()) + 1 }} jour(s)
                                                                </div>
                                                                @if ($reward->isReady())
                                                                <div class="col-12 mb-3">
                                                                    <strong>Status:</strong> 
                                                                    <span class="badge bg-label-{{ $reward->isCompleted() ? 'success' : 'secondary'}}">@if($reward->isCompleted()) terminé @else en cours @endif</span>                                                
                                                                </div>
                                                                @endif
                                                                <hr>
                                                                <div class="col-12 mb-3">
                                                                    @if (!is_null($reward->user))
                                                                        <a href="{{ route('users.show', $reward->user->reference) }}" style="display: block; width:100%; margin-top:20px;" type="button" class="btn btn-outline-primary">
                                                                            <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/5.png')}}" alt="Avatar" class="rounded-circle" />{{$reward->user->name}} </span>
                                                                            @if (!is_null($reward->user->country))
                                                                                @if (!is_null($reward->user->country->shortern))
                                                                            <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$reward->user->country->shortern.'_flag.png') }}">
                                                                                @endif
                                                                            @endif
                                                                            @if($reward->user->id == auth()->user()->id)<span class="badge bg-label-secondary">Vous</span> @endif
                                                                        </a>

                                                                        @if ($reward->isFusioned() == false && $reward->isReady())
                                                                            <a href="{{ route('associations.createFromReward', $reward->reference) }}" style="display: block; width:100%; margin-top:20px;" type="button" class="btn btn-primary">
                                                                                <span class="tf-icons bx bx-link"></span> Associer @convert($reward->remaining_amount) <span class="text-muted">FCFA</span>
                                                                            </a>
                                                                        @endif

                                                                    @else
                                                                    <span class="badge bg-label-secondary">introuvable</span>
                                                                    @endif                                                
                                                                </div>
                                                            </div>
                                                            @else
                                                            <span class="badge bg-label-secondary">pas encore disponible</span>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div class="col-sm-4">
                                                    <div class="card mb-4">
                                                        <div class="card-header"><span class="tf-icons bx bx-gift"></span> Don</div>
                                                        <div class="card-body">
                                                            @if(!is_null($reward->don))
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <strong>Reference:</strong> 
                                                                    #{{ $reward->don->reference }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Pack:</strong> 
                                                                    @if (!is_null($reward->don->pack))
                                                                    <a href="{{ auth()->user()->isPartOfAdmin() ? route('packs.show', $reward->don->pack->reference) : '#!' }}">
                                                                        {{ $reward->don->pack->label }} <span class="text-muted">(@convert($reward->don->pack->amount) FCFA)</span>
                                                                    </a>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">introuvable</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12  mb-3">
                                                                    <strong>Montant restant:</strong> 
                                                                    @if (!is_null($reward->don->remaining_amount) && $reward->don->remaining_amount > 0)
                                                                    @convert($reward->don->remaining_amount) <span class="text-muted">FCFA</span>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">rien</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Création:</strong> 
                                                                    {{ $reward->don->created_at }}
                                                                </div>
                                                                <div class="col-12  mb-3">
                                                                    <strong>Clôture:</strong> 
                                                                    @if (!is_null($reward->don->last_sent_at))
                                                                    {{ $reward->don->last_sent_at }}
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas encore</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Status:</strong> 
                                                                    <span class="badge bg-label-{{ $reward->don->isCompleted() ? 'success' : 'secondary'}}">@if($reward->don->isCompleted()) terminé @else en cours @endif</span>
                                                                    
                                                                </div>
                                                                <hr>
                                                                <div class="col-12 mb-3">
                                                                    @if (!is_null($reward->don->user))
                                                                        
                                                                        <a href="{{ route('users.show', $reward->don->user->reference) }}" style="display: block; width:100%; margin-top:15px;" type="button" class="btn btn-outline-primary">
                                                                            <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/5.png')}}" alt="Avatar" class="rounded-circle" />{{$reward->don->user->name}} </span>
                                                                            @if (!is_null($reward->don->user->country))
                                                                                @if (!is_null($reward->don->user->country->shortern))
                                                                            <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$reward->don->user->country->shortern.'_flag.png') }}">
                                                                                @endif
                                                                            @endif
                                                                            @if($reward->don->user->id == auth()->user()->id)<span class="badge bg-label-secondary">Vous</span> @endif
                                                                        </a>
                                                                        <a href="{{ route('gifts.show', $reward->don->reference) }}" style="display: block; width:100%; margin-top:5px;" type="button" class="btn btn-outline-primary">
                                                                            Détails du don &rarr;
                                                                        </a>
                                                                        @if ($reward->don->isFusioned() == false && auth()->user()->isPartOfAdmin())
                                                                            <a href="{{ route('associations.createFromDon', $reward->don->reference) }}" style="display: block; width:100%; margin-top:20px;" type="button" class="btn btn-primary">
                                                                                <span class="tf-icons bx bx-link"></span> Associer @convert($reward->don->remaining_amount) <span class="text-muted">FCFA</span>
                                                                            </a>
                                                                        @endif
                                                                    @else
                                                                    <span class="badge bg-label-secondary">introuvable</span>
                                                                    @endif                                                
                                                                </div>
                                                            </div>
                                                            @else
                                                            <span class="badge bg-label-secondary">pas disponible</span>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>                                                  
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-all" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Toutes les associations
                                                        {{ count($reward->fusions) }} au total <br>
                                                        {{ count($reward->fusionsCompleted())."/".count($reward->fusions) }} <span class="text-muted">terminée(s)</span> &bullet;
                                                        {{ count($reward->fusionsReceived())."/".count($reward->fusions) }} <span class="text-muted">reçu(s)</span> &bullet;
                                                        {{ count($reward->fusionsSent())."/".count($reward->fusions) }} <span class="text-muted">envoyée(s)</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($reward->fusions) >0)
                                                    @include("layouts.components.fusionsList-component", ["fusions" => $reward->fusions, "view" => "all"])
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