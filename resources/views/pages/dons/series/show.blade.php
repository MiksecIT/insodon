@extends('layouts.master')

@section('title')
    Série de dons #{{ $don->reference }} - Détails
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
                                    Série de dons <strong><a href="#!">#{{ $don->reference }}</a></strong>
                                </h4>
                                <p class="text-muted">
                                    <span class="text-muted" style="font-size: 13px;">
                                        Débutée le: {{ $don->created_at }}
                                    </span>
                                </p>
                            </div>
                            <div class="col-md-4" style="text-align: right !important;">
                                <a href="{{ route('gifts.series.list') }}" type="button" class="btn btn-outline-primary">
                                    <span class="tf-icons bx bx-gift"></span>&nbsp; Voir la liste
                                </a>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-sm-12">
                                @include('layouts.partials.session')
                            </div>
                        </div>

                        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
                            
                            <div class="col col-sm-6">
                                <div class="card h-100">
                                    <img class="card-img-top" src="{{ !is_null($don->pack) ? load_asset_url($don->pack->image_url) : load_asset_url(null) }}" alt="Card image cap" />
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            @if (!is_null($don->pack))
                                            {{ $don->pack->label }}
                                            <span class="badge bg-label-danger">
                                                premier
                                            </span>   
                                            @else
                                            <span class="badge bg-label-secondary">pack introuvable</span>
                                            @endif
                                        </h6>
                                        <h4 class="card-title">
                                            @if (!is_null($don->pack))
                                            <span class="{{ $don->is_usd == 1 ? '' : 'text-primary' }}">@convert($don->pack->amount)</span> <span class="text-muted">XOF</span> 
                                            @if (!is_null($don->pack->amount_usd))
                                            &bullet; <span class="{{ $don->is_usd == 1 ? 'text-primary' : '' }}">@convert($don->pack->amount_usd)</span> <span class="text-muted">&dollar;</span>
                                            @endif
                                            @else
                                            @convert($don->amount) @if ($don->is_usd) <span class="text-muted">XOF</span> @else <span class="text-muted">&dollar;</span> @endif
                                            @endif
                                        </h4>
                                        <p class="text-muted">
                                            <span class="badge bg-label-{{ $don->isCompleted() ? 'success' : 'secondary' }}">{{ $don->isCompleted() ? 'terminé' : 'en cours' }}</span> &bullet; 
                                            {{ count($don->fusionsCompleted()) }}/{{ count($don->fusions) }} association(s) terminée(s)
                                        </p>
                                        <hr>
                                        <a href="{{ route('gifts.show', $don->reference) }}" style="display: block; width:100%;" type="button" class="btn btn-outline-primary mb-3">
                                            <span class="tf-icons bx bx-details"></span>&nbsp; Détails
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="col col-sm-6">
                                <div class="card h-100">
                                    <img class="card-img-top" src="{{ !is_null($don->pack) ? load_asset_url($don->pack->image_url) : load_asset_url(null) }}" alt="Card image cap" />
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            @if (!is_null($don->pack))
                                            {{ $don->pack->label }}
                                            <span class="badge bg-label-warning">
                                                deuxième
                                            </span>   
                                            @else
                                            <span class="badge bg-label-secondary">pack introuvable</span>
                                            @endif                                            
                                        </h6>
                                        <h4 class="card-title">
                                            @if (!is_null($don->pack))
                                            <span class="@if(!is_null($don->secondDon())){{ $don->secondDon()->is_usd == 1 ? '' : 'text-primary' }}@endif">@convert($don->pack->amount)</span> <span class="text-muted">XOF</span> 
                                            @if (!is_null($don->pack->amount_usd))
                                            &bullet; <span class="@if(!is_null($don->secondDon())) {{ $don->secondDon()->is_usd == 1 ? 'text-primary' : '' }} @endif">@convert($don->pack->amount_usd)</span> <span class="text-muted">&dollar;</span>
                                            @endif
                                            @else
                                                @if (!is_null($don->secondDon()))
                                                @convert($don->secondDon()->amount) 
                                                <span class="text-muted"> 
                                                    @if ($don->secondDon()->is_usd) &dollar; @else XOF @endif
                                                </span>
                                                @else
                                                <span class="badge bg-label-secondary">introuvable</span>
                                                @endif
                                            @endif
                                        </h4>
                                        <p class="text-muted">
                                            @if (!is_null($don->secondDon()))
                                                <span class="badge bg-label-{{ $don->secondDon()->isCompleted() ? 'success' : 'secondary' }}">{{ $don->secondDon()->isCompleted() ? 'envoyé' : 'en cours' }}</span> &bullet; 
                                                {{ count($don->secondDon()->fusionsCompleted()) }}/{{ count($don->secondDon()->fusions) }} association(s) terminée(s)
                                            @else
                                            <span class="badge bg-label-secondary">en attente de don</span>
                                            @endif
                                        </p>
                                        <hr>
                                        @if (!is_null($don->secondDon()))
                                        <a href="{{ route('gifts.show', $don->secondDon()->reference) }}" style="display: block; width:100%;" type="button" class="btn btn-outline-primary mb-3">
                                            <span class="tf-icons bx bx-details"></span>&nbsp; Détails
                                        </a>
                                        @else
                                        <button type="button" 
                                            data-bs-toggle="modal"
                                            data-bs-target="#secondGiftModal" 
                                            class="btn btn-primary" 
                                            style="display: block; width:100%;" 
                                            >
                                                <span class="tf-icons bx bx-rocket"></span> Faire un don
                                            </button>
                                            <div class="modal fade" id="secondGiftModal" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="modalCenterTitle">Devise du don</h5>
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
                                                                    Veuillez choisir la dévise dans laquelle vous voulez faire le don. <br>
                                                                    
                                                                    <form id="form-secondGift" action="{{ route('gifts.store') }}" class="mt-3" method="POST">
                                                                        @csrf
                                                                        <input type="text" name="u__d" value="{{ !is_null($don->pack) ? $don->pack->reference : null }}" hidden>
                                                                        <div class="col-md">
                                                                            <small class="text-light fw-semibold">Dévises disponibles</small>
                                                                            <div class="form-check mt-1">
                                                                                <input name="c" class="form-check-input" type="radio" value="usd" id="currency1">
                                                                                <label class="form-check-label" for="currency1"> USD &dash; Dollar américain </label>
                                                                            </div>
                                                                            <div class="form-check">
                                                                                <input name="c" class="form-check-input" type="radio" value="xof" id="currency2" checked="">
                                                                                <label class="form-check-label" for="currency2"> Continuer en XOF (FCFA) </label>
                                                                            </div>
                                                                        </div>
                                                                    </form>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                                Non
                                                            </button>
                                                            <a href="#!" onclick="$('#form-secondGift').submit();" type="button" class="btn btn-primary">Oui, je confirme</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <div class="col col-sm-6">
                                <div class="card h-100">
                                    <img class="card-img-top" src="{{ !is_null($don->pack) ? load_asset_url($don->pack->image_url) : load_asset_url(null) }}" alt="Card image cap" />
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            @if (!is_null($don->pack))
                                            {{ $don->pack->label }}
                                            <span class="badge bg-label-success">
                                                troisième
                                            </span>   
                                            @else
                                            <span class="badge bg-label-secondary">pack introuvable</span>
                                            @endif                                            
                                        </h6>
                                        <h4 class="card-title">
                                            @if (!is_null($don->pack))
                                            <span class="@if(!is_null($don->thirdDon())){{ $don->secondDon()->is_usd == 1 ? '' : 'text-primary' }}@endif">@convert($don->pack->amount)</span> <span class="text-muted">XOF</span> 
                                            @if (!is_null($don->pack->amount_usd))
                                            &bullet; <span class="@if(!is_null($don->thirdDon())) {{ $don->thirdDon()->is_usd == 1 ? 'text-primary' : '' }} @endif">@convert($don->pack->amount_usd)</span> <span class="text-muted">&dollar;</span>
                                            @endif
                                            @else
                                                @if (!is_null($don->thirdDon()))
                                                @convert($don->thirdDon()->amount) 
                                                <span class="text-muted"> 
                                                    @if ($don->thirdDon()->is_usd) &dollar; @else XOF @endif
                                                </span>
                                                @else
                                                <span class="badge bg-label-secondary">introuvable</span>
                                                @endif
                                            @endif
                                        </h4>
                                        <p class="text-muted">
                                            @if (!is_null($don->thirdDon()))
                                            <span class="badge bg-label-{{ $don->thirdDon()->isCompleted() ? 'success' : 'secondary' }}">{{ $don->thirdDon()->isCompleted() ? 'envoyé' : 'en cours' }}</span> &bullet; 
                                            {{ count($don->thirdDon()->fusionsCompleted()) }}/{{ count($don->thirdDon()->fusions) }} association(s) terminée(s)
                                            @else
                                            <span class="badge bg-label-secondary">En attente de don</span>
                                            @endif 
                                        </p>
                                        <hr>
                                        @if (!is_null($don->thirdDon()))
                                        <a href="{{ route('gifts.show', $don->thirdDon()->reference) }}" style="display: block; width:100%;" type="button" class="btn btn-outline-primary mb-3">
                                            <span class="tf-icons bx bx-details"></span>&nbsp; Détails
                                        </a>
                                        @else
                                            <button type="button" 
                                            data-bs-toggle="modal"
                                            data-bs-target="#thirdGiftModal" 
                                            class="btn btn-primary" 
                                            style="display: block; width:100%;" 
                                            >
                                                <span class="tf-icons bx bx-rocket"></span> Faire un don
                                            </button>
                                            <div class="modal fade" id="thirdGiftModal" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="modalCenterTitle">Devise du don</h5>
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
                                                                    Veuillez choisir la dévise dans laquelle vous voulez faire le don. <br>
                                                                    
                                                                    <form id="form-thirdGift" action="{{ route('gifts.store') }}" class="mt-3" method="POST">
                                                                        @csrf
                                                                        <input type="text" name="u__d" value="{{ !is_null($don->pack) ? $don->pack->reference : null }}" hidden>
                                                                        <div class="col-md">
                                                                            <small class="text-light fw-semibold">Dévises disponibles</small>
                                                                            <div class="form-check mt-1">
                                                                                <input name="c" class="form-check-input" type="radio" value="usd" id="currency1">
                                                                                <label class="form-check-label" for="currency1"> USD &dash; Dollar américain </label>
                                                                            </div>
                                                                            <div class="form-check">
                                                                                <input name="c" class="form-check-input" type="radio" value="xof" id="currency2" checked="">
                                                                                <label class="form-check-label" for="currency2"> Continuer en XOF (FCFA) </label>
                                                                            </div>
                                                                        </div>
                                                                    </form>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                                Non
                                                            </button>
                                                            <a href="#!" onclick="$('#form-thirdGift').submit();" type="button" class="btn btn-primary">Oui, je confirme</a>
                                                        </div>
                                                    </div>
                                                </div>
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