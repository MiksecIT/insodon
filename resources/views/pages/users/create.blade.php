@extends('layouts.master')

@section('title')
    Utilisateurs - Création
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
                                <h4 class="fw-bold py-3">Nouvel utilisateur</h4>
                                <p class="text-muted">
                                    @if (auth()->user()->isPartOfAdmin())
                                    <a href="{{ route('users.index') }}"><span class="tf-icons bx bx-group"></span> Liste des utilisateurs</a>
                                    @endif
                                    &bullet; Ajouter un utilisateur
                                </p>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <div class="row row-cols-1 row-cols-md-3 g-4 mb-3">
                                    <div class="col-md-12">
                                        <p>Détails</p>                                 
                                        <div>
                                            <form id="formAccountSettings" method="POST" action="{{ route('users.store') }}">
                                                @csrf
                                                <div class="row">
                                                    <div class="mb-3 col-md-4">
                                                        <label for="lastname" class="form-label">Nom</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="lastname"
                                                            name="lastname"
                                                            placeholder="Nom"
                                                            autofocus
                                                            required
                                                            value="{{ old('lastname') }}"
                                                        />
                                                    </div> 
                                                    <div class="mb-3 col-md-8">
                                                        <label for="firstname" class="form-label">Prénom(s)</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="firstname"
                                                            name="firstname"
                                                            placeholder="Nom"
                                                            autofocus
                                                            required
                                                            value="{{ old('firstname') }}"
                                                        />
                                                    </div>                                           
                                                    <div class="mb-3 col-md-12">
                                                        <label class="form-label" for="email">Adresse mail</label>
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                class="form-control"
                                                                placeholder="Adresse mail"
                                                                required
                                                                value="{{ old('email') }}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="country" class="form-label">Pays</label>
                                                        <select required name="country" class="form-select" id="country" aria-label="Country">
                                                            <option selected="">--Vide</option>
                                                            @forelse ($countries as $country)
                                                            <option value="{{ $country->id }}">{{ $country->label }}</option>
                                                            @empty
                                                            @endforelse
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="role" class="form-label">Role</label>
                                                        <select required name="role" class="form-select" id="role" aria-label="Role">
                                                            <option selected="">--Vide</option>
                                                            @forelse ($roles as $role)

                                                                @php
                                                                    $show = false;
                                                                @endphp

                                                                @if ($role->reference == "root")
                                                                    @if (auth()->user()->isRoot())
                                                                        @php
                                                                            $show = true;
                                                                        @endphp
                                                                    @else
                                                                        @php
                                                                            $show = false;
                                                                        @endphp
                                                                    @endif
                                                                @else
                                                                    @php
                                                                        $show = true;
                                                                    @endphp
                                                                @endif

                                                                @if ($show)
                                                            <option value="{{ $role->id }}">{{ $role->label }}</option>
                                                                @endif
                                                            @empty
                                                            @endforelse
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <a href="{{ route('users.index') }}" class="btn btn-outline-secondary">Annuler</a>
                                                        <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
                                                        
                                                    </div>
                                                </div>                                                                
                                            </form>
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