@extends('layouts.master')

@section('title')
    Dons - Détails
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
                                    Détails du don
                                    <span class="badge rounded-pill bg-label-@if($don->position == 'first')danger @elseif($don->position == 'second')warning @elseif($don->position == 'third')success @endif">{{ ucfirst($don->position) }}</span>
                                </h4>
                                <p class="text-muted">
                                    <span class="text-muted" style="font-size: 13px;">
                                        @if($don->position == 'first')Premier @elseif($don->position == 'second')Deuxième @elseif($don->position == 'third')Troisième et dernier @endif don de la série @if($don->is_first) <a href="{{ route('gifts.series.details', $don->reference) }}"><strong>{{ "#".$don->reference }}</strong></a> @elseif(!is_null($don->parent)) <a href="{{ route('gifts.series.details', $don->parent->reference) }}"><strong>{{ "#".$don->parent->reference }}</strong></a> @endif
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
                                                <i class="tf-icons bx bx-gift"></i> Details &bullet; {{ count($don->fusionsCompleted()).'/'.count($don->fusions) }}
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
                                                <i class="tf-icons bx bx-link"></i> Les associations  &bullet; {{ count($don->fusions) }}
                                            </button>
                                        </li>
                                        
                                        
                                    </ul>
                                    <div class="tab-content">
                                        
                                        <div class="tab-pane fade show active" id="navs-pills-justified-detail" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Détails du don
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div class="row mb-4">
                                                <div class="col-sm-4">
                                                    <div class="card mb-4">
                                                        <div class="card-header"><span class="tf-icons bx bx-gift"></span> Don</div>
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <strong>Reference:</strong> 
                                                                    #{{ $don->reference }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Pack:</strong> 
                                                                    @if (!is_null($don->pack))
                                                                    <a href="{{ auth()->user()->isPartOfAdmin() ? route('packs.show', $don->pack->reference) : '#!' }}">
                                                                        {{ $don->pack->label }} <span class="text-muted">(@convert($don->pack->amount) FCFA)</span>
                                                                    </a>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">introuvable</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12  mb-3">
                                                                    <strong>Montant restant:</strong> 
                                                                    @if (!is_null($don->remaining_amount) && $don->remaining_amount > 0)
                                                                    @convert($don->remaining_amount) <span class="text-muted">FCFA</span>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">rien</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Création:</strong> 
                                                                    {{ $don->created_at }}
                                                                </div>
                                                                <div class="col-12  mb-3">
                                                                    <strong>Clôture:</strong> 
                                                                    @if (!is_null($don->last_sent_at))
                                                                    {{ $don->last_sent_at }}
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas encore</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Status:</strong> 
                                                                    <span class="badge bg-label-{{ $don->isCompleted() ? 'success' : 'secondary'}}">@if($don->isCompleted()) terminé @else en cours @endif</span>
                                                                    
                                                                </div>
                                                                <hr>
                                                                <div class="col-12 mb-3"> 
                                                                    @if (!is_null($don->user))
                                                                        <a href="{{ route('users.show', $don->user->reference) }}" style="display: block; width:100%; margin-top:20px;" type="button" class="btn btn-outline-primary">
                                                                            <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/5.png')}}" alt="Avatar" class="rounded-circle" />{{$don->user->name}} </span>
                                                                            @if (!is_null($don->user->country))
                                                                                @if (!is_null($don->user->country->shortern))
                                                                            <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$don->user->country->shortern.'_flag.png') }}">
                                                                                @endif
                                                                            @endif
                                                                            @if($don->user->id == auth()->user()->id)<span class="badge bg-label-secondary">Vous</span> @endif
                                                                        </a>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">donateur introuvable</span>
                                                                    @endif  
                                                                    
                                                                    @if ($don->isFusioned() == false && auth()->user()->isPartOfAdmin())
                                                                        <a href="{{ route('associations.createFromDon', $don->reference) }}" style="display: block; width:100%; margin-top:20px;" type="button" class="btn btn-primary">
                                                                            <span class="tf-icons bx bx-link"></span> 
                                                                            Associer 
                                                                            @if (!is_null($don->remaining_amount) && $don->remaining_amount > 0)
                                                                            &bullet;
                                                                            @convert($don->remaining_amount) 
                                                                            <span class="text-muted">FCFA</span>
                                                                            @endif
                                                                        </a>
                                                                    @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="card">
                                                        <div class="card-header"><span class="tf-icons bx bx-box"></span> Recompense @if(!is_null($don->reward))<span class="badge bg-label-{{ $don->reward->isReady() ? 'success' : 'danger'}}">@if($don->reward->isReady()) mature @else pas encore mature @endif</span> @endif</div>
                                                        <div class="card-body">
                                                            @if(!is_null($don->reward))
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <strong>Reference:</strong> 
                                                                    #{{ $don->reward->reference }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Montant:</strong> 
                                                                    @convert($don->reward->amount) <span class="text-muted">FCFA</span>
                                                                </div>
                                                                <div class="col-12  mb-3">
                                                                    <strong>Montant restant:</strong> 
                                                                    @if (!is_null($don->reward->remaining_amount) && $don->reward->remaining_amount > 0)
                                                                    @convert($don->reward->remaining_amount) <span class="text-muted">FCFA</span>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">rien</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Création:</strong> 
                                                                    {{ $don->reward->created_at }}
                                                                </div>
                                                                <div class="col-12  mb-3">
                                                                    <strong>Clôture:</strong> 
                                                                    @if (!is_null($don->reward->last_received_at))
                                                                    {{ $don->reward->last_received_at }}
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas encore</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Maturité:</strong> 
                                                                    {{ \Carbon\Carbon::parse($don->reward->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay) }} &bullet; 
                                                                    @if (\Carbon\Carbon::parse($don->reward->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay) > now())
                                                                    Dans
                                                                    @else
                                                                    Il y a
                                                                    @endif
                                                                    {{ \Carbon\Carbon::parse($don->reward->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay)->diffInDays(now()) + 1 }} jour(s)                                                                                                
                                                                </div>
                                                                @if ($don->reward->isReady())
                                                                <div class="col-12 mb-3">
                                                                    <strong>Status:</strong> 
                                                                    <span class="badge bg-label-{{ $don->reward->isCompleted() ? 'success' : 'secondary'}}">@if($don->reward->isCompleted()) terminé @else en cours @endif</span>                                                
                                                                </div>
                                                                @endif
                                                                <hr>
                                                                <div class="col-12 mb-3">
                                                                    @if (!is_null($don->reward->user)) 
                                                                        <a href="{{ route('users.show', $don->reward->user->reference) }}" style="display: block; width:100%; margin-top:15px;" type="button" class="btn btn-outline-primary">
                                                                            <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/5.png')}}" alt="Avatar" class="rounded-circle" />{{$don->reward->user->name}} </span>
                                                                            @if (!is_null($don->reward->user->country))
                                                                                @if (!is_null($don->reward->user->country->shortern))
                                                                            <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$don->reward->user->country->shortern.'_flag.png') }}">
                                                                                @endif
                                                                            @endif
                                                                            @if($don->reward->user->id == auth()->user()->id)<span class="badge bg-label-secondary">Vous</span> @endif
                                                                        </a>
                                                                        <a href="{{ route('rewards.show', $don->reward->reference) }}" style="display: block; width:100%; margin-top:5px;" type="button" class="btn btn-outline-primary">
                                                                            Détails de la recompense &rarr;
                                                                        </a>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">benificiaire introuvable</span>
                                                                    @endif 

                                                                    @if ($don->reward->isFusioned() == false && $don->reward->isReady())
                                                                        <a href="{{ route('associations.createFromReward', $don->reward->reference) }}" style="display: block; width:100%; margin-top:20px;" type="button" class="btn btn-primary">
                                                                            <span class="tf-icons bx bx-link"></span> Associer @convert($don->reward->remaining_amount) <span class="text-muted">FCFA</span>
                                                                        </a>
                                                                    @endif                                               
                                                                </div>
                                                            </div>
                                                            @else
                                                            <span class="badge bg-label-secondary">pas encore disponible</span>
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
                                                        {{ count($don->fusions) }} au total &bullet; 
                                                        {{ count($don->fusionsCompleted())."/".count($don->fusions) }} <span class="text-muted">terminée(s)</span> &bullet;
                                                        {{ count($don->fusionsReceived())."/".count($don->fusions) }} <span class="text-muted">reçu(s)</span> &bullet;
                                                        {{ count($don->fusionsSent())."/".count($don->fusions) }} <span class="text-muted">envoyée(s)</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($don->fusions) >0)
                                                    @include("layouts.components.fusionsList-component", ["fusions" => $don->fusions, "view" => "all"])
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