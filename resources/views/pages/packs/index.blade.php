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
                                @include("layouts.components.pack-component", ["pack" => $pack])
                            </div>
                            @empty
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="badge bg-label-secondary">Il n'y a pas de pack disponible pour le moment</div>
                                    </div>
                                </div>
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