@extends('layouts.master')

@section('title')
    Bonus - Liste
@endsection

@section('content')
    <div class="layout-wrapper layout-content-navbar">
        
        <div class="layout-container">

            @include('layouts.partials.sidebar')
            
            <div class="layout-page">

                @include('layouts.partials.navbar')
        
                <div class="content-wrapper">
                    
                    <div class="container-xxl flex-grow-1 container-p-y">
                        
                        <div class="row mb-3">
                            <div class="col-md-8">
                                <h4 class="fw-bold py-3">Bonus</h4>
                                <p class="text-muted">
                                    <span class="text-muted" style="font-size: 13px;">
                                        Liste des bonus générés
                                    </span>
                                </p>
                            </div>
                            
                            <div class="col-md-4">                                
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
                                            data-bs-target="#navs-pills-justified-pending"
                                            aria-controls="navs-pills-justified-pending"
                                            aria-selected="true"
                                            >
                                                <i class="tf-icons bx bx-timer"></i> Elligibles &bullet; {{ count($pending) }}
                                            </button>
                                        </li>

                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-claimed"
                                            aria-controls="navs-pills-justified-claimed"
                                            aria-selected="false"
                                            >
                                                <i class="tf-icons bx bx-rocket"></i> Reclamés &bullet; {{ count($claimed) }}
                                            </button>
                                        </li>

                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-approuved"
                                            aria-controls="navs-pills-justified-approuved"
                                            aria-selected="false"
                                            >
                                                <i class="tf-icons bx bx-link"></i> Approuvés  &bullet; {{ count($approuved) }}
                                            </button>
                                        </li>
                                        
                                        <li class="nav-item">
                                            <button
                                            type="button"
                                            class="nav-link"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-pills-justified-completed"
                                            aria-controls="navs-pills-justified-completed"
                                            aria-selected="false"
                                            >
                                            <i class="tf-icons bx bx-check"></i> Recupérés &bullet; {{ count($completed) }}
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
                                            <i class="tf-icons bx bx-detail"></i> Liste &bullet; {{ count($all) }}
                                            </button>
                                        </li>
                                        
                                    </ul>
                                    <div class="tab-content">
                                        
                                        <div class="tab-pane fade show active" id="navs-pills-justified-pending" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Tous les bonus elligibles actuellement
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($pending) >0)
                                                    @include("layouts.components.bonusList-component", ["bonus" => $all, "view" => "pending"])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-claimed" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Tous les bonus reclamés et en attente de paiement actuellement
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($claimed) >0)
                                                    @include("layouts.components.bonusList-component", ["bonus" => $all, "view" => "claimed"])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-approuved" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Tous les bonus approuvés actuellement
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($approuved) >0)
                                                    @include("layouts.components.bonusList-component", ["bonus" => $all, "view" => "approuved"])
                                                    @else
                                                    <div class="badge bg-label-secondary">Pas disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="navs-pills-justified-completed" role="tabpanel">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Tous les bonus déjà payés
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($completed) >0)
                                                    @include("layouts.components.bonusList-component", ["bonus" => $all, "view" => "completed"])
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
                                                        Tous les bonus
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($all) >0)
                                                    @include("layouts.components.bonusList-component", ["bonus" => $all, "view" => "all"])
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