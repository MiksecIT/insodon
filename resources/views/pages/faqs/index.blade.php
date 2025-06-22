@extends('layouts.master')

@section('title')
    Foire Aux Questions - Liste
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
                                <h4 class="fw-bold py-3">FAQ</h4>
                                <p class="text-muted">Foire Aux Questions</p>
                            </div>
                            <div class="col-md-4" style="text-align: right !important;">
                                @if (auth()->user()->isPartOfAdmin())
                                <a href="{{ route('faqs.create') }}" type="button" class="btn btn-outline-primary">
                                    <span class="tf-icons bx bx-plus"></span>&nbsp; Ajouter
                                </a>
                                @endif
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                @include('layouts.partials.session')
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md mb-12 mb-md-0">
                                @if (count($faqs) > 0)
                                <div class="accordion mt-3" id="accordionFAQs">
                                    @foreach ($faqs as $faq)
                                    <div class="card accordion-item {{ $loop->first ? 'active' : ''}}">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button
                                            type="button"
                                            class="accordion-button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#{{ $faq->reference }}"
                                            aria-expanded="{{ $loop->first ? 'true' : ''}}"
                                            aria-controls="{{ $faq->reference }}"
                                            >
                                                @if (auth()->user()->isPartOfAdmin())
                                                @if(auth()->user()->isRoot() && !is_null($faq->deleted_at))
                                                <span style="margin-right: 10px;" class="badge bg-label-secondary text-danger"><span class="tf-icons bx bx-trash"></span>Supprimé</span>
                                                @endif
                                                
                                                <span style="margin-right: 10px;" class="badge bg-label-{{ $faq->is_available ? 'success' : 'danger'}}">{{ $faq->is_available ? 'Publié' : 'Non publié'}}</span>
                                                @endif
                                                {{ $faq->title }} 
                                                
                                            </button>
                                        </h2>

                                        <div
                                            id="{{ $faq->reference }}"
                                            class="accordion-collapse collapse {{ $loop->first ? 'show' : ''}}"
                                            data-bs-parent="#accordionFAQs"
                                        >
                                            <div class="accordion-body">
                                                {!! $faq->content !!}

                                                @if (auth()->user()->isPartOfAdmin())
                                                <hr>
                                                @if(is_null($faq->deleted_at))
                                                <a href="{{ route('faqs.edit', $faq->reference) }}" type="button" class="btn btn-outline-primary">
                                                    <span class="tf-icons bx bx-edit"></span>&nbsp; Modifier
                                                </a>
                                                <a href="#!" type="button" class="btn btn-outline-danger" onclick="event.preventDefault();if(confirm('Vous allez supprimer ce FAQ, continuer ?')) {$('#form-delete{{ $faq->reference }}').submit();}">
                                                    <span class="tf-icons bx bx-trash"></span>&nbsp; Supprimer
                                                    <form id="form-delete{{ $faq->reference }}" action="{{ route('faqs.destroy', $faq->id) }}" method="POST">
                                                        @csrf
                                                        <input type="text" name="_method" value="DELETE" hidden>
                                                    </form>
                                                </a>
                                                @else
                                                    @if(auth()->user()->isRoot())
                                                    <a href="#!" type="button" class="btn btn-outline-danger" onclick="event.preventDefault();if(confirm('Vous allez supprimer définitivement ce FAQ, continuer ?')) {$('#form-delete{{ $faq->reference }}').submit();}">
                                                        <span class="tf-icons bx bx-trash"></span>&nbsp; Supprimer définitivemet
                                                        <form id="form-delete{{ $faq->reference }}" action="{{ route('faqs.destroy', $faq->id) }}" method="POST">
                                                            @csrf
                                                            <input type="text" name="_method" value="DELETE" hidden>
                                                        </form>
                                                    </a>
                                                    @endif
                                                @endif
                                                
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    @endforeach
                                </div>
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