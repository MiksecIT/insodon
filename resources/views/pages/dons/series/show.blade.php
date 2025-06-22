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
                        </div>
                        
                        <div class="row">
                            <div class="col-sm-12">
                                @include('layouts.partials.session')
                            </div>
                        </div>

                        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
                            
                            <div class="col col-sm-6">
                                <div class="card h-100">
                                    <img class="card-img-top" src="{{Vite::asset('resources/assets/img/elements/3.jpg')}}" alt="Card image cap" />
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            {{ $don->pack->label }}
                                            <span class="badge bg-label-@if($don->position == 'first')danger @elseif($don->position == 'second')warning @elseif($don->position == 'third')success @endif">
                                                @if ($don->position == "first")
                                                Premier
                                                @elseif ($don->position == "second")
                                                Deuxième
                                                @elseif ($don->position == "third")
                                                Troisième
                                                @endif
                                            </span>                                            
                                        </h6>
                                        <h4 class="card-title">@convert($don->pack->amount) <span class="text-muted">XOF</span> 
                                            @if (!is_null($don->pack->amount_usd))
                                            &bullet; @convert($don->pack->amount_usd) <span class="pb-1 mb-4 text-muted">&dollar;</span>
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
                                    <img class="card-img-top" src="{{Vite::asset('resources/assets/img/elements/3.jpg')}}" alt="Card image cap" />
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            {{ $don->pack->label }}
                                            <span class="badge bg-label-warning">
                                                Deuxième
                                            </span>                                            
                                        </h6>
                                        <h4 class="card-title">@convert($don->pack->amount) <span class="text-muted">XOF</span> 
                                            @if (!is_null($don->pack->amount_usd))
                                            &bullet; @convert($don->pack->amount_usd) <span class="pb-1 mb-4 text-muted">&dollar;</span>
                                            @endif
                                        </h4>
                                        <p class="text-muted">
                                            @if($don->isCompleted())
                                                @if (!is_null($don->secondDon()))
                                                    <span class="badge bg-label-{{ $don->secondDon()->isCompleted() ? 'success' : 'secondary' }}">{{ $don->secondDon()->isCompleted() ? 'envoyé' : 'en cours' }}</span> &bullet; 
                                                    {{ count($don->secondDon()->fusionsCompleted()) }}/{{ count($don->secondDon()->fusions) }} association(s) terminée(s)
                                                @else
                                                <span class="badge bg-label-secondary">en attente de don</span>
                                                @endif
                                            @else
                                            <span class="badge bg-label-secondary">En attente de la clôture du premier don</span>
                                            @endif
                                        </p>
                                        <hr>
                                        @if (!is_null($don->secondDon()))
                                        <a href="{{ route('gifts.show', $don->secondDon()->reference) }}" style="display: block; width:100%;" type="button" class="btn btn-outline-primary mb-3">
                                            <span class="tf-icons bx bx-details"></span>&nbsp; Détails
                                        </a>
                                        @else
                                        <button type="button" @if($don->isCompleted()) class="btn btn-primary" onclick="if(confirm('Voulez-vous vraiment faire ce deuxième don ?')) {$('#form-suit{{ $don->reference }}').submit();}" style="display: block; width:100%;" @else class="btn btn-secondary"  style="display: block; width:100%; cursor:not-allowed;" @endif><span class="tf-icons bx bx-rocket"></span> Faire un don</button>
                                        <form id="form-suit{{ $don->reference }}" action="{{ route('gifts.suits.donate.second', $don->reference) }}" method="POST">
                                            @csrf
                                            <input type="text" name="u__d" value="{{ $don->reference }}" hidden>
                                        </form>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <div class="col col-sm-6">
                                <div class="card h-100">
                                    <img class="card-img-top" src="{{Vite::asset('resources/assets/img/elements/3.jpg')}}" alt="Card image cap" />
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            {{ $don->pack->label }}
                                            <span class="badge bg-label-success">
                                                Troisième
                                            </span>                                            
                                        </h6>
                                        <h4 class="card-title">@convert($don->pack->amount) <span class="text-muted">XOF</span> 
                                            @if (!is_null($don->pack->amount_usd))
                                            &bullet; @convert($don->pack->amount_usd) <span class="pb-1 mb-4 text-muted">&dollar;</span>
                                            @endif
                                        </h4>
                                        <p class="text-muted">
                                            @if($don->isCompleted())
                                                @if (!is_null($don->secondDon()))
                                                    @if ($don->secondDon()->isCompleted())
                                                    <span class="badge bg-label-{{ $don->thirdDon()->isCompleted() ? 'success' : 'secondary' }}">{{ $don->thirdDon()->isCompleted() ? 'envoyé' : 'en cours' }}</span> &bullet; 
                                                    {{ count($don->thirdDon()->fusionsCompleted()) }}/{{ count($don->thirdDon()->fusions) }} association(s) terminée(s)
                                                    @else
                                                    <span class="badge bg-label-secondary">En attente de la clôture du deuxième don</span>
                                                    @endif
                                                @else
                                                <span class="badge bg-label-secondary">en attente du deuxième don</span>
                                                @endif
                                            @else
                                            <span class="badge bg-label-secondary">En attente de la clôture du premier don</span>
                                            @endif
                                        </p>
                                        <hr>
                                        @if (!is_null($don->thirdDon()))
                                        <a href="{{ route('gifts.show', $don->thirdDon()->reference) }}" style="display: block; width:100%;" type="button" class="btn btn-outline-primary mb-3">
                                            <span class="tf-icons bx bx-details"></span>&nbsp; Détails
                                        </a>
                                        @else
                                            @if (!is_null($don->secondDon()))
                                                <button type="button" @if($don->isCompleted() && $don->secondDon()->isCompleted()) class="btn btn-primary" onclick="if(confirm('Voulez-vous vraiment faire ce troisième don ?')) {$('#form-suit{{ $don->reference }}').submit();}" style="display: block; width:100%;" @else class="btn btn-secondary"  style="display: block; width:100%; cursor:not-allowed;" @endif>
                                                    <span class="tf-icons bx bx-rocket"></span> Faire un don
                                                </button>
                                                <form id="form-suit{{ $don->reference }}" action="{{ route('gifts.suits.donate.third', $don->reference) }}" method="POST">
                                                    @csrf
                                                    <input type="text" name="u__d" value="{{ $don->reference }}" hidden>
                                                </form>
                                            @else
                                                <button type="button"class="btn btn-secondary"  style="display: block; width:100%; cursor:not-allowed;">
                                                    <span class="tf-icons bx bx-rocket"></span> Faire un don
                                                </button>
                                            @endif
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