@extends('layouts.master')

@section('title')
    Packs - Création
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
                                <p class="text-muted">Ajouter un pack</p>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <div class="row row-cols-1 row-cols-md-3 g-4 mb-3">
                                    <div class="col-md-8">
                                        <p>Détails du pack</p>                                 
                                        <div>
                                            <form id="formAccountSettings" method="POST" action="{{ route('packs.store') }}" enctype="multipart/form-data">
                                                @csrf
                                                <div class="row">
                                                    <div class="mb-3 col-md-12">
                                                        <label for="label" class="form-label">Nom</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="label"
                                                            name="label"
                                                            placeholder="Nom du pack"
                                                            autofocus
                                                            required
                                                            value="{{ old('label') }}"
                                                        />
                                                    </div>                                            
                                                    <div class="mb-3 col-md-6">
                                                        <label class="amount" for="phoneNumber">Prix en FCFA</label>
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type="text"
                                                                id="amount"
                                                                name="amount"
                                                                class="form-control"
                                                                placeholder="Ex: 50000"
                                                                required
                                                                value="{{ old('amount') }}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label class="amount_usd" for="phoneNumber">Prix en USD (&dollar;)</label>
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type="text"
                                                                id="amount_usd"
                                                                name="amount_usd"
                                                                class="form-control"
                                                                placeholder="Ex: 50000"
                                                                value="{{ old('amount_usd') }}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-12">
                                                        <label class="form-label" for="description">Description</label>
                                                        <div class="input-group input-group-merge">
                                                            <textarea class="form-control" name="description" id="editorPacks" placeholder="Description du pack...">{!! old('description') !!}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-12">
                                                        <label for="image" class="form-label">Choisir une image <span class="text-muted">(500x500 de préférence)</span></label>
                                                        <input class="form-control select-image" type="file" name="image" id="image" accept="image/png, image/jpg, image/jpeg">
                                                    </div>
                                                    <div class="mb-3 col-12">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" name="publish" id="publish" {{ old('publish') ? 'checked' : '' }}/>
                                                            <label class="form-check-label" for="publish"> Enregistrer et publier </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
                                                        <a href="{{ route('packs.index') }}" class="btn btn-outline-secondary">Annuler</a>
                                                    </div>
                                                </div>                                                                
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="text-muted">*Visualsation de l'image</p>                                 
                                        <div class="image-preview">
                                            <img src="{{ load_asset_url(null) }}" id="image-preview" alt="">
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
<script>
    ClassicEditor.create( document.querySelector( '#editorPacks' ), 
        {
            toolbar: {
                items: [
                    'heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'link', 'blockQuote', '|', 'undo', 'redo',
                ]
            }
        } 
    ).catch( error => {
            alert('Text editor is not available right now.\nPlease, try again later!');
        } 
    );

</script>
@endsection