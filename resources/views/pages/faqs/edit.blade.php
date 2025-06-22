@extends('layouts.master')

@section('title')
    Foire Aux Questions - Modification
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
                                <h4 class="fw-bold py-3">Foire Aux Questions</h4>
                                <p class="text-muted">Ajouter un FAQ</p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                @include('layouts.partials.session')
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <div class="row row-cols-1 row-cols-md-3 g-4 mb-3">
                                    <div class="col-md-12">
                                        <p>Détails du FAQ</p>                                 
                                        <div>
                                            <form id="formAccountSettings" method="POST" action="{{ route('faqs.update', $faq->id) }}">
                                                @csrf
                                                <input type="text" name="_method" value="PUT" hidden>
                                                <div class="row mb-4">
                                                    <div class="mb-3 col-md-12">
                                                        <label for="title" class="form-label">Titre</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            autofocus
                                                            placeholder="Titre du FAQ"
                                                            value="{{ $faq->title }}"
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-12">
                                                        <label class="form-label" for="phoneNumber">Contenu</label>
                                                        <div class="input-group input-group-merge">
                                                            <textarea class="form-control" name="content" id="" cols="30" rows="10" placeholder="Contenu du FAQ...">{{ $faq->content }}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-12">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" name="publish" id="publish" {{ $faq->is_available == 1 ? 'checked' : '' }}/>
                                                            <label class="form-check-label" for="publish"> Enregistrer et publier </label>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div class="row">
                                                    <div class="col">
                                                        <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
                                                        <button type="reset" class="btn btn-outline-secondary">Annuler</button>
                                                    </div>
                                                </div>                                                               
                                            </form>
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