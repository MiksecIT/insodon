@extends('layouts.master')

@section('title')
    Associations - Liste
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
                                <h4 class="fw-bold py-3">Associations</h4>
                                <p class="text-muted">Liste de toutes associations</p>
                            </div>
                        </div>

                        <div class="row">

                            @if (auth()->user()->isPartOfAdmin())
                                @php
                                    $all = auth()->user()->isRoot() ? \App\Models\Fusion::withTrashed()->get() : \App\Models\Fusion::all();
                                    $pending = [];
                                    foreach ($all as $p) {
                                        if ($p->isCompleted() == false) {
                                            array_push($pending, $p);
                                        }
                                    }
                                @endphp
                            @endif

                            <div class="col">
                                <div class="nav-align-top mb-4">
                                    <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
                                        @if (auth()->user()->isPartOfAdmin())
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link active"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-pending"
                                            aria-controls="navs-pills-justified-pending"
                                            aria-selected="true"
                                            >
                                                <i class="tf-icons bx bx-timer"></i> En attente &bullet; {{ count($pending).'/'.count($all) }}
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
                                                <i class="tf-icons bx bx-globe"></i> Toutes  &bullet; {{ count($all) }}
                                            </button>
                                        </li>
                                        @endif
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link {{ auth()->user()->isPartOfAdmin() == false ? 'active' : ''  }}"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-user"
                                            aria-controls="navs-pills-justified-user"
                                            aria-selected="{{ auth()->user()->isPartOfAdmin() == false ? 'true' : 'false'}}"
                                            >
                                            <i class="tf-icons bx bx-user"></i> Moi &bullet; {{ count(auth()->user()->relatedFusions()) }}
                                            </button>
                                        </li>  
                                        
                                    </ul>
                                    <div class="tab-content">
                                        @if (auth()->user()->isPartOfAdmin())
                                        <div class="tab-pane fade show active" id="navs-pills-justified-pending" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Toutes les associations en attente 
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($pending) >0)
                                                    @include("layouts.components.fusionsList-component", ["fusions" => $pending, "view" => "pending"])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-all" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Toutes les associations
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($all) >0)
                                                    @include("layouts.components.fusionsList-component", ["fusions" => $all, "view" => "all"])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                        @endif

                                        <div class="tab-pane fade {{ auth()->user()->isPartOfAdmin() == false ? 'show active' : '' }}" id="navs-pills-justified-user" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Toutes mes associations.
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count(auth()->user()->relatedFusions()) >0)
                                                    @include("layouts.components.fusionsList-component", ["fusions" => auth()->user()->relatedFusions(), "view" => "user"])
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