@extends('layouts.master')

@section('title')
    Rôles - Liste
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
                                <h4 class="fw-bold py-3">Dons</h4>
                                <p class="text-muted">Liste des roles utilisateurs</p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                @include('layouts.partials.session')
                            </div>
                        </div>
                        
                        <div class="card">
                            @include('layouts.components.rolesList-component', ["roles" => $roles])
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