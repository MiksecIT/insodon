@extends('layouts.master')

@section('title')
    Utilisateurs - Liste
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
                                <h4 class="fw-bold py-3">Utilisateurs</h4>
                                <p class="text-muted">Liste des utilisateurs</p>
                            </div>
                            @if (auth()->user()->isTopManager())
                            <div class="col-md-4" style="text-align: right !important;">
                                <a href="{{ route('users.create') }}" type="button" class="btn btn-outline-primary">
                                    <span class="tf-icons bx bx-user-plus"></span>&nbsp; Ajouter
                                </a>
                            </div>
                            @endif
                        </div>

                        <div class="card">
                            @if (count($users) > 0)
                            @include('layouts.components.usersList-component', ["users" => $users])
                            @else
                            <div class="badge bg-label-secondary" style="margin: 15px;">
                                Pas encore disponible
                            </div>
                            @endif
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