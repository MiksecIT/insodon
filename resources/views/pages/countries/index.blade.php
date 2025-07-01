@extends('layouts.master')

@section('title')
    Pays - Liste
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
                                <h4 class="fw-bold py-3">Pays</h4>
                                <p class="text-muted">Liste des pays disponible</p>
                            </div>

                            @if (auth()->user()->isPartOfAdmin())
                            <div class="col-md-4" style="text-align: right !important;">
                                <a href="{{ route('countries.create') }}" type="button" class="btn btn-outline-primary">
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

                        <div class="card">
                            <div class="card-body">
                                @if (count($countries) >0)
                                @include("layouts.components.countriesList-component", ["countries" => $countries])
                                @else
                                <div class="badge bg-label-secondary">Pas disponible</div>
                                @endif
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