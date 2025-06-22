@extends('layouts.master')

@section('title')
    Créer à partir d'une récompense - Associations
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
                                <h4 class="fw-bold py-3">Nouvelle association de la recompense <a href="{{ route('rewards.show', $reward->reference ) }}"><strong>#{{ $reward->reference }}</strong></a></h4>
                                <p class="text-muted">
                                    <span class="text-muted" style="font-size: 13px;">
                                        @if (!is_null($reward->don))
                                        Recompense du @if($reward->don->position == 'first')premier @elseif($reward->don->position == 'second')deuxième @elseif($reward->don->position == 'third')troisième et dernier @endif don de la série @if($reward->don->is_first) <a href="{{ route('gifts.series.details', $reward->don->reference) }}"><strong>{{ "#".$reward->don->reference }}</strong></a> @elseif(!is_null($reward->don->parent)) <a href="{{ route('gifts.series.details', $reward->don->parent->reference) }}"><strong>{{ "#".$reward->don->parent->reference }}</strong></a> @endif
                                        @endif
                                    </span>
                                </p>
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
                                                <i class="tf-icons bx bx-detail"></i> Détails
                                            </button>
                                        </li>

                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-suggested"
                                            aria-controls="navs-pills-justified-suggested"
                                            aria-selected="false"
                                            >
                                                <i class="tf-icons bx bx-bulb"></i> Suggestion &bullet; {{ count($suggested) }}
                                            </button>
                                        </li>

                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-country"
                                            aria-controls="navs-pills-justified-country"
                                            aria-selected="false"
                                            >
                                                <i class="tf-icons bx bx-flag"></i> Même pays  &bullet; {{ count($country) }}
                                            </button>
                                        </li>
                                        
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-others"
                                            aria-controls="navs-pills-justified-others"
                                            aria-selected="false"
                                            >
                                            <i class="tf-icons bx bx-globe"></i> Autres pays &bullet; {{ count($countries) }}
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
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <div class="card mb-4">
                                                        <div class="card-header"><span class="tf-icons bx bx-gift"></span> Recompense</div>
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <strong>Reference:</strong> 
                                                                    #{{ $reward->reference }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Montant:</strong> 
                                                                    @convert($reward->amount) <span class="text-muted">FCFA</span>
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Restant:</strong> 
                                                                    @if (!is_null($reward->remaining_amount))
                                                                        @convert($reward->remaining_amount) FCFA
                                                                    @else
                                                                        <span class="badge bg-label-secondary">rien</span>
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Création:</strong> 
                                                                    {{ $reward->created_at }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Status:</strong> 
                                                                    <span class="badge bg-label-{{ $reward->isCompleted() ? 'success' : 'secondary'}}">
                                                                        @if($reward->isCompleted()) terminé @else en cours @endif
                                                                    </span>
                                                                    &bullet;
                                                                    {{ count($reward->fusionsCompleted()).'/'.count($reward->fusions) }} association(s) terminée(s)
                                                                </div>
                                                                <hr>
                                                                <div class="col-12 mb-3"> 
                                                                    @if (!is_null($reward->user))
                                                                        
                                                                        <a href="{{ route('users.show', $reward->user->reference) }}" style="display: block; width:100%; margin-top:20px;" type="button" class="btn btn-outline-primary">
                                                                            <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/5.png')}}" alt="Avatar" class="rounded-circle" />
                                                                                {{$reward->user->name}} 
                                                                            </span>
                                                                            @if (!is_null($reward->user->country))
                                                                                @if (!is_null($reward->user->country->shortern))
                                                                            <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$reward->user->country->shortern.'_flag.png') }}">
                                                                                @endif
                                                                            @endif
                                                                            <span class="text-muted">(benificiaire) @if($reward->user->id == auth()->user()->id) <span class="badge bg-label-secondary">Vous</span> @endif</span>
                                                                        </a>
                                                                    @else
                                                                    <span class="badge bg-label-secondary">introuvable</span>
                                                                    @endif                                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-suggested" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Les suggestions de recompense disponible.
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($suggested) >0)
                                                    @include("layouts.components.fusionDons-component", ["dons" => $suggested])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-country" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Toutes les recompenses disponible pour le même pays.
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($country) >0)
                                                    @include("layouts.components.fusionDons-component", ["dons" => $country])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-others" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Les recompenses disponible dans les autres pays.
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($countries) >0)
                                                    @include("layouts.components.fusionDons-component", ["dons" => $countries])
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