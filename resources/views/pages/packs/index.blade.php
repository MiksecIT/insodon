@extends('layouts.master')

@section('title')
    Packs - Liste
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
                                <h4 class="fw-bold py-3">Packs</h4>
                                <p class="text-muted">Liste des packs disponible</p>
                            </div>

                            @if (auth()->user()->isTopManager())
                            <div class="col-md-4" style="text-align: right !important;">
                                <a href="{{ route('packs.create') }}" type="button" class="btn btn-outline-primary">
                                    <span class="tf-icons bx bx-plus"></span>&nbsp; Ajouter
                                </a>
                            </div>
                            @endif
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                @include('layouts.partials.session')
                            </div>
                        </div>

                        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
                            @forelse ($packs as $pack)
                            <div class="col col-sm-6">
                                <div class="card h-100">
                                    <img class="card-img-top" src="{{Vite::asset('resources/assets/img/elements/3.jpg')}}" alt="Card image cap" />
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            @if (auth()->user()->isTopManager())
                                                @if(auth()->user()->isRoot() && !is_null($pack->deleted_at))
                                                <span style="margin-right: 10px;" class="badge bg-label-secondary text-danger"><span class="tf-icons bx bx-trash"></span>Supprimé</span>
                                                @endif                                                
                                                <span style="margin-right: 10px;" class="badge bg-label-{{ $pack->is_available ? 'success' : 'danger'}}">{{ $pack->is_available ? 'Publié' : 'Non publié'}}</span>
                                            @endif
                                            {{ $pack->label }}
                                        </h6>
                                        <h4 class="card-title">@convert($pack->amount) <span class="text-muted">XOF</span> 
                                            @if (!is_null($pack->amount_usd))
                                            &bullet; @convert($pack->amount_usd) <span class="pb-1 mb-4 text-muted">&dollar;</span>
                                            @endif
                                        </h4>
                                        <p class="text-muted">{{ count($pack->donsCompleted()) }}/{{ count($pack->dons) }} don(s) déjà effectué(s)</p>
                                        <hr>
                                        <p class="card-text">
                                            {{ $pack->description }}                                           
                                        </p>
                                        <a href="#!" style="display: block; width:100%;" type="button" class="btn btn-primary mb-3" onclick="event.preventDefault();if(confirm('Voulez-vous vraiment faire ce don ?')) {$('#form-donate{{ $pack->reference }}').submit();}">
                                            <span class="tf-icons bx bx-rocket"></span>&nbsp; Faire un don
                                        </a>
                                        <form id="form-donate{{ $pack->reference }}" action="{{ route('gifts.store') }}" method="POST">
                                            @csrf
                                            <input type="text" name="u__d" value="{{ $pack->reference }}" hidden>
                                        </form>
                                        @if (auth()->user()->isTopManager())
                                            <a href="#!" style="display: block; width:100%;" 
                                            type="button" 
                                            class="btn btn-outline-primary mb-3" 
                                            data-bs-toggle="modal"
                                            data-bs-target="#newRewardModal{{$pack->reference}}"
                                            >
                                                <span class="tf-icons bx bx-box"></span>&nbsp; Créer une recompense
                                            </a>
                                            <div class="modal fade" id="newRewardModal{{$pack->reference}}" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="modalCenterTitle">Recompense initiale</h5>
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
                                                                    Voulez-vous créer une récompense initiale pour ce pack ? <br>
                                                                    Si oui, veuillez entrer la référence du bénéficiaire
                                                                    <form id="form-newReward{{ $pack->reference }}" action="{{ route('gifts.reward.create') }}" method="POST">
                                                                        @csrf
                                                                        <input type="text" name="ack" value="{{ $pack->reference }}" hidden>
                                                                        <div class="mt-4">
                                                                            <input type="text" required name="rec" class="form-control" placeholder="Entrer la reference du bénéficiaire">
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                                Non
                                                            </button>
                                                            <a href="#!" onclick="$('#form-newReward{{ $pack->reference }}').submit();" type="button" class="btn btn-primary">Oui, je confirme</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <a href="{{ route('packs.edit', $pack->reference) }}" style="display: block; width:100%;" type="button" class="btn btn-outline-primary mb-3">
                                                <span class="tf-icons bx bx-edit"></span>&nbsp; Modifier
                                            </a>
                                            <a href="#!" style="display: block; width:100%;" type="button" class="btn btn-outline-danger mb-3" onclick="event.preventDefault();if(confirm('Vous allez supprimer ce pack, continuer ?')) {$('#form-delete{{ $pack->reference }}').submit();}">
                                                <span class="tf-icons bx bx-trash"></span>&nbsp; Supprimer
                                            </a>
                                            <form id="form-delete{{ $pack->reference }}" action="{{ route('packs.destroy', $pack->id) }}" method="POST">
                                                @csrf
                                                <input type="text" name="_method" value="DELETE" hidden>
                                            </form>

                                            @if (auth()->user()->isRoot() && !is_null($pack->deleted_at))
                                                <a href="#!" style="display: block; width:100%;" type="button" class="btn btn-danger mb-3" onclick="event.preventDefault();if(confirm('Vous allez supprimer définitivement ce pack, continuer ?')) {$('#form-delete{{ $pack->reference }}').submit();}">
                                                    <span class="tf-icons bx bx-trash"></span>&nbsp; Supprimer définitivement
                                                </a>
                                                <form id="form-delete{{ $pack->reference }}" action="{{ route('packs.destroy', $pack->id) }}" method="POST">
                                                    @csrf
                                                    <input type="text" name="_method" value="DELETE" hidden>
                                                </form>
                                            @endif

                                        @endif

                                    </div>
                                </div>
                            </div>
                            @empty
                            <div class="col">
                                <div class="badge bg-label-secondary">Il n'y a pas de pack disponible pour le moment</div>
                            </div>
                            @endforelse
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