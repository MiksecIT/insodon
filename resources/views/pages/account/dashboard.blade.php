@extends('layouts.master')

@section('title')
    Tableau de bord
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
                            <div class="col-sm-3 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="card-title d-flex align-items-start justify-content-between">
                                            <div class="avatar flex-shrink-0">
                                                <span class="badge badge-center bg-label-primary" style="padding:20px;"><i style="font-size:23px;" class="bx bx-gift"></i></span>
                                            </div>
                                            <div class="dropdown">
                                                <button
                                                    class="btn p-0"
                                                    type="button"
                                                    id="cardOpt3"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i class="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                    <a class="dropdown-item" href="{{ route('gifts.index') }}">Liste</a>
                                                    <a class="dropdown-item" href="{{ route('packs.index') }}">Faire un don</a>
                                                </div>
                                            </div>
                                        </div>
                                        <span class="fw-semibold d-block mb-1">
                                            Dons &bullet; {{ count(auth()->user()->dons) }}
                                        </span>
                                        <h3 class="card-title mt-4">
                                            @convert(auth()->user()->donsUSDAmount()) <span class="text-muted">&dollar;</span>
                                        </h3>
                                        <small class="text-primary fw-semibold">
                                            <i class="bx bx-check"></i> 
                                            @convert(auth()->user()->donsCompletedUSDAmount()) 
                                            <span class="text-muted">&dollar; déjà envoyés &bullet; 
                                                {{ count(auth()->user()->donsCompletedUSD()).'/'.count(auth()->user()->donsUSD()) }}
                                            </span>
                                        </small>
                                        <h3 class="card-title mt-4">
                                            @convert(auth()->user()->donsXOFAmount()) <span class="text-muted">XOF</span>
                                        </h3>
                                        <small class="text-primary fw-semibold">
                                            <i class="bx bx-check"></i> 
                                            @convert(auth()->user()->donsCompletedXOFAmount()) 
                                            <span class="text-muted">XOF déjà envoyés &bullet; 
                                                {{ count(auth()->user()->donsCompletedXOF()).'/'.count(auth()->user()->donsXOF()) }}
                                            </span>
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-3 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="card-title d-flex align-items-start justify-content-between">
                                            <div class="avatar flex-shrink-0">
                                                <span class="badge badge-center bg-label-success" style="padding:20px;"><i style="font-size:23px;" class="bx bx-box"></i></span>
                                            </div>
                                            <div class="dropdown">
                                                <button
                                                    class="btn p-0"
                                                    type="button"
                                                    id="cardOpt3"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i class="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                    <a class="dropdown-item" href="{{ route('rewards.index') }}">Liste</a>

                                                    @if (auth()->user()->isTopManager())
                                                    <a class="dropdown-item" href="{{ route('gifts.index') }}">Créer une récompense</a>
                                                    @endif
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <span class="fw-semibold d-block mb-1">
                                            Récompenses &bullet; {{ count(auth()->user()->rewards) }}
                                        </span>
                                        <h3 class="card-title mt-4">
                                            @convert(auth()->user()->rewardsUSDAmount()) <span class="text-muted">&dollar;</span>
                                        </h3>
                                        <small class="text-success fw-semibold">
                                            <i class="bx bx-check"></i> 
                                            @convert(auth()->user()->rewardsCompletedAmountUSD()) 
                                            <span class="text-muted">&dollar; déjà reçus &bullet; 
                                                {{ count(auth()->user()->rewardsCompletedUSD()).'/'.count(auth()->user()->rewardsUSD()) }}
                                            </span>
                                        </small>
                                        <h3 class="card-title mt-4">
                                            @convert(auth()->user()->rewardsXOFAmount()) <span class="text-muted">XOF</span>
                                        </h3>
                                        <small class="text-success fw-semibold">
                                            <i class="bx bx-check"></i> 
                                            @convert(auth()->user()->rewardsCompletedAmountXOF()) 
                                            <span class="text-muted">XOF déjà reçus &bullet; 
                                                {{ count(auth()->user()->rewardsCompletedXOF()).'/'.count(auth()->user()->rewardsXOF()) }}
                                            </span>
                                        </small>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-sm-3 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="card-title d-flex align-items-start justify-content-between">
                                            <div class="avatar flex-shrink-0">
                                                <span class="badge badge-center bg-label-info" style="padding:20px;"><i style="font-size:23px;" class="bx bx-box"></i></span>
                                            </div>
                                            <div class="dropdown">
                                            <button
                                                class="btn p-0"
                                                type="button"
                                                id="cardOpt1"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="cardOpt1">
                                                <a class="dropdown-item" href="{{ route('bonus.index') }}">Liste</a>
                                            </div>
                                            </div>
                                        </div>
                                        <span class="fw-semibold d-block mb-1">
                                            Bonus &bullet; {{ count(auth()->user()->gainedRoyalties) }}
                                        </span>
                                        <h3 class="card-title mt-4">
                                            @convert(auth()->user()->gainedRoyaltiesUSDAmount()) <span class="text-muted">&dollar;</span>
                                        </h3>
                                        <small class="text-info fw-semibold">
                                            <i class="bx bx-check"></i> 
                                            @convert(auth()->user()->completedRoyaltiesAmountUSD()) 
                                            <span class="text-muted">&dollar; déjà retirés &bullet; 
                                                {{ count(auth()->user()->completedRoyaltiesUSD()).'/'.count(auth()->user()->gainedRoyaltiesUSD()) }}
                                            </span>
                                        </small>
                                        <h3 class="card-title mt-4">
                                            @convert(auth()->user()->gainedRoyaltiesXOFAmount()) <span class="text-muted">XOF</span>
                                        </h3>
                                        <small class="text-info fw-semibold">
                                            <i class="bx bx-check"></i> 
                                            @convert(auth()->user()->completedRoyaltiesAmountXOF()) 
                                            <span class="text-muted">XOF déjà retirés &bullet; 
                                                {{ count(auth()->user()->completedRoyaltiesXOF()).'/'.count(auth()->user()->gainedRoyaltiesXOF()) }}
                                            </span>
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-3 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="card-title d-flex align-items-start justify-content-between">
                                            <div class="avatar flex-shrink-0">
                                                <span class="badge badge-center bg-label-warning" style="padding:20px;"><i style="font-size:23px;" class="bx bx-link"></i></span>
                                            </div>
                                            <div class="dropdown">
                                            <button
                                                class="btn p-0"
                                                type="button"
                                                id="cardOpt4"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                                                <a class="dropdown-item" href="{{ route("associations.index") }}">Liste</a>
                                            </div>
                                            </div>
                                        </div>
                                        <span class="fw-semibold d-block mb-1">
                                            Associations &bullet; {{ count(auth()->user()->relatedFusions()) }}
                                        </span>
                                        <h3 class="card-title mt-4">
                                            @convert(auth()->user()->relatedFusionsAmountUSD()) <span class="text-muted">&dollar;</span>
                                        </h3>
                                        <small class="text-warning fw-semibold">
                                            <i class="bx bx-check"></i> 
                                            @convert(auth()->user()->completedRelatedFusionsAmountUSD()) 
                                            <span class="text-muted">&dollar; déjà terminées &bullet; 
                                                {{ count(auth()->user()->completedRelatedFusionsUSD()).'/'.count(auth()->user()->relatedFusionsUSD()) }}
                                            </span>
                                        </small>
                                        <h3 class="card-title mt-4">
                                            @convert(auth()->user()->relatedFusionsAmountXOF()) <span class="text-muted">XOF</span>
                                        </h3>
                                        <small class="text-warning fw-semibold">
                                            <i class="bx bx-check"></i> 
                                            @convert(auth()->user()->completedRelatedFusionsAmountXOF()) 
                                            <span class="text-muted">XOF déjà terminées &bullet; 
                                                {{ count(auth()->user()->completedRelatedFusionsXOF()).'/'.count(auth()->user()->relatedFusionsXOF()) }}
                                            </span>
                                        </small>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        @if (1 == 2)
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="card h-100">
                                    <div class="card-header d-flex align-items-center justify-content-between pb-0">
                                        <div class="card-title mb-0">
                                            <h5 class="m-0 me-2">Associations</h5>
                                            <small class="text-muted">Les 5 dernières</small>
                                        </div>
                                        <div class="dropdown">
                                            <button class="btn p-0" type="button" id="orederStatistics" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics" style="">
                                                <a class="dropdown-item" href="{{ route('associations.index') }}">Liste</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <br>
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <div class="d-flex flex-column align-items-center gap-1">
                                                <h2 class="mb-2">8,258 <span class="text-muted">FCFA</span></h2>                                                
                                            </div>
                                        </div>
                                        <br>
                                        <ul class="p-0 m-0">
                                            <li class="d-flex mb-4 pb-1">
                                                <div class="avatar flex-shrink-0 me-3">
                                                    <span class="avatar-initial rounded bg-label-primary"><i class="bx bx-mobile-alt"></i></span>
                                                </div>
                                                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                    <div class="me-2">
                                                        <h6 class="mb-0">Electronic</h6>
                                                        <small class="text-muted">Mobile, Earbuds, TV</small>
                                                    </div>
                                                    <div class="user-progress">
                                                        <small class="fw-semibold">82.5k</small>
                                                    </div>
                                                </div>
                                            </li>                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="card h-100">
                                    <div class="card-header d-flex align-items-center justify-content-between pb-0">
                                        <div class="card-title mb-0">
                                            <h5 class="m-0 me-2">Dons</h5>
                                            <small class="text-muted">Les 5 dernières</small>
                                        </div>
                                        <div class="dropdown">
                                            <button class="btn p-0" type="button" id="orederStatistics" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics" style="">
                                                <a class="dropdown-item" href="{{ route('associations.index') }}">Liste</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <br>
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <div class="d-flex flex-column align-items-center gap-1">
                                                <h2 class="mb-2">8,258 <span class="text-muted">FCFA</span></h2>                                                
                                            </div>
                                        </div>
                                        <br>
                                        <ul class="p-0 m-0">
                                            <li class="d-flex mb-4 pb-1">
                                                <div class="avatar flex-shrink-0 me-3">
                                                    <span class="avatar-initial rounded bg-label-primary"><i class="bx bx-mobile-alt"></i></span>
                                                </div>
                                                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                    <div class="me-2">
                                                        <h6 class="mb-0">Electronic</h6>
                                                        <small class="text-muted">Mobile, Earbuds, TV</small>
                                                    </div>
                                                    <div class="user-progress">
                                                        <small class="fw-semibold">82.5k</small>
                                                    </div>
                                                </div>
                                            </li>                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="card h-100">
                                    <div class="card-header d-flex align-items-center justify-content-between pb-0">
                                        <div class="card-title mb-0">
                                            <h5 class="m-0 me-2">Recompenses</h5>
                                            <small class="text-muted">Les 5 dernières</small>
                                        </div>
                                        <div class="dropdown">
                                            <button class="btn p-0" type="button" id="orederStatistics" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics" style="">
                                                <a class="dropdown-item" href="{{ route('associations.index') }}">Liste</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <br>
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <div class="d-flex flex-column align-items-center gap-1">
                                                <h2 class="mb-2">8,258 <span class="text-muted">FCFA</span></h2>                                                
                                            </div>
                                        </div>
                                        <br>
                                        <ul class="p-0 m-0">
                                            <li class="d-flex mb-4 pb-1">
                                                <div class="avatar flex-shrink-0 me-3">
                                                    <span class="avatar-initial rounded bg-label-primary"><i class="bx bx-mobile-alt"></i></span>
                                                </div>
                                                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                    <div class="me-2">
                                                        <h6 class="mb-0">Electronic</h6>
                                                        <small class="text-muted">Mobile, Earbuds, TV</small>
                                                    </div>
                                                    <div class="user-progress">
                                                        <small class="fw-semibold">82.5k</small>
                                                    </div>
                                                </div>
                                            </li>                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endif
                        
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