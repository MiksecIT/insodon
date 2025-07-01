@extends('layouts.master')

@section('title')
    R$oles - Détails
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
                                    Détails du role &rarr; <strong class="text-primary">{{ $role->label }}</strong>
                                </h4>
                                <p class="text-muted">
                                    @if (auth()->user()->isPartOfAdmin())
                                    <a href="{{ route('roles.index') }}"><span class="tf-icons bx bx-badge"></span> Liste des roles</a>
                                    @endif
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
                                                <i class="tf-icons bx bx-globe"></i> Details 
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
                                                <i class="tf-icons bx bx-group"></i> Les utilisateurs  &bullet; {{ count($role->users) }}
                                            </button>
                                        </li>
                                        
                                        
                                    </ul>
                                    <div class="tab-content">
                                        
                                        <div class="tab-pane fade show active" id="navs-pills-justified-detail" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Détails du rôle
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div class="row mb-4">
                                                <div class="col-sm-4">
                                                    <div class="card mb-4">
                                                        <div class="card-header"><span class="tf-icons bx bx-badge"></span> Rôle</div>
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-12 mb-3">
                                                                    <strong>Reference:</strong> 
                                                                    #{{ $role->reference }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Nom:</strong> 
                                                                    {{ $role->label }}
                                                                    @if (!is_null($role->shortern))
                                                                    <img style="height: 20px; width:20px;" src="{{ Vite::asset('resources/assets/img/countries/'.$role->shortern.'_flag.png') }}" alt="{{ $role->shortern }}">
                                                                    @endif
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Création:</strong> 
                                                                    {{ $role->created_at }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Modification:</strong> 
                                                                    {{ $role->updated_at }}
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Status:</strong> 
                                                                    <span class="badge bg-label-{{ $role->is_available == 1 ? 'success' : 'secondary'}}">@if($role->is_available == 1) publié @else non publié @endif</span>                                                                    
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <strong>Publié le:</strong> 
                                                                    @if(!is_null($role->available_at))
                                                                    {{ $role->available_at }}
                                                                    @else
                                                                    <span class="badge bg-label-secondary">pas encore</span>
                                                                    @endif
                                                                </div>
                                                                <hr>
                                                                <div class="col-12 mb-3"> 
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                      
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-all" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Tous les utilisateurs
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($role->users) >0)
                                                    @include("layouts.components.usersList-component", ["users" => $role->users])
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