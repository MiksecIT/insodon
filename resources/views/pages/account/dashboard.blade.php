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
                                        <span class="fw-semibold d-block mb-1">Dons &bullet; {{ auth()->user()->dons->count() }}</span>
                                        <h3 class="card-title mb-2">12,628 <span class="text-muted"> FCFA</span></h3>
                                        <small class="text-muted fw-semibold"><strong style="font-size:15px;" class="text-primary">12</strong>/20 effectués</small>
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

                                                    @if (auth()->user()->isManager() || auth()->user()->isRoot())
                                                    <a class="dropdown-item" href="{{ route('gifts.index') }}">Créer une récompense</a>
                                                    @endif
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <span class="fw-semibold d-block mb-1">Récompenses &bullet; {{ auth()->user()->dons->count() }}</span>
                                        <h3 class="card-title mb-2">12,628 <span class="text-muted"> FCFA</span></h3>
                                        <small class="text-muted fw-semibold"><strong style="font-size:15px;" class="text-success">12</strong>/20 effectués</small>
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
                                            id="cardOpt1"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i class="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="cardOpt1">
                                            <a class="dropdown-item" href="{{ route('bonus.index') }}">Liste</a>
                                            <a class="dropdown-item" href="{{ route('bonus.claim') }}">Reclamer</a>
                                        </div>
                                        </div>
                                    </div>
                                    <span class="fw-semibold d-block mb-1">Bonus &bullet; {{ count(auth()->user()->gainedRoyalties) }}</span>
                                    <h3 class="card-title mb-2">@convert(auth()->user()->royaltiesAmount()) <span class="text-muted">FCFA</span></h3>
                                    <small class="text-success fw-semibold"><i class="bx bx-check"></i> @convert(auth()->user()->completedRoyaltiesAmount()) <span class="text-muted">FCFA déjà retirés &bullet; {{ count(auth()->user()->completedRoyalties()).'/'.count(auth()->user()->gainedRoyalties) }}</span></small>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-3 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                    <div class="card-title d-flex align-items-start justify-content-between">
                                        <div class="avatar flex-shrink-0">
                                            <span class="badge badge-center bg-label-success" style="padding:20px;"><i style="font-size:23px;" class="bx bx-link"></i></span>
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
                                    <span class="fw-semibold d-block mb-1">Associations &bullet; {{ count(auth()->user()->relatedFusions()) }}</span>
                                    <h3 class="card-title text-nowrap mb-2">@convert(100000) <span class="text-muted">FCFA</span></h3>
                                    <small class="fw-semibold"><i class="bx bx-timer"></i> <strong class="text-danger">@convert(105000)</strong> <span class="text-muted">FCFA</span> en attente</small>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
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