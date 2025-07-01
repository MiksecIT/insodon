@extends('layouts.master')

@section('title')
    Pays - Modification
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
                                <p class="text-muted">Modification du pays</p>
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
                                    <div class="col-md-8">
                                        <p>Détails du pays</p>                                 
                                        <div>
                                            <form id="formAccountSettings" method="POST" action="{{ route('countries.update', $country->id) }}">
                                                @csrf
                                                <input type="text" name="_method" value="PUT" hidden>
                                                <div class="row">                                            
                                                    <div class="mb-3 col-md-6">
                                                        <label class="amount" for="label">Nom</label>
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type="text"
                                                                id="label"
                                                                name="label"
                                                                class="form-control"
                                                                placeholder="Nom du pays"
                                                                required
                                                                value="{{ $country->label }}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label class="shortern" for="shortern">Shortern</label>
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type="text"
                                                                id="shortern"
                                                                name="shortern"
                                                                class="form-control"
                                                                placeholder="Ex: ci"
                                                                value="{{ $country->shortern }}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-12">
                                                        <label class="form-label" for="description">Description</label>
                                                        <div class="input-group input-group-merge">
                                                            <textarea class="form-control" name="description" id="editorPacks" placeholder="Description du pays...">{!! $country->description !!}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-12">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" name="publish" id="publish" {{ $country->is_available ? 'checked' : '' }}/>
                                                            <label class="form-check-label" for="publish"> Enregistrer et publier </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
                                                        <a href="{{ route('countries.index') }}" class="btn btn-outline-secondary">Annuler</a>
                                                    </div>
                                                </div>                                                               
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="text-muted">*Visualsation de l'image</p>                                 
                                        <div class="image-preview">
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/bf_flag.png') }}" alt="bf">
                                                    BF &rarr; Burkina Faso 
                                                    @if (!is_null(\App\Models\Country::where("shortern", "bf")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/bn_flag.png') }}" alt="bn">
                                                    BN &rarr; Bénin 
                                                    @if (!is_null(\App\Models\Country::where("shortern", "bn")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/cd_flag.png') }}" alt="cd">
                                                    CD &rarr; Congo RDC
                                                    @if (!is_null(\App\Models\Country::where("shortern", "cd")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/cg_flag.png') }}" alt="cg">
                                                    CG &rarr; Congo Brazzaville 
                                                    @if (!is_null(\App\Models\Country::where("shortern", "cg")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/ci_flag.png') }}" alt="ci">
                                                    CI &rarr; Côte d'Ivoire 
                                                    @if (!is_null(\App\Models\Country::where("shortern", "ci")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/cm_flag.png') }}" alt="cm">
                                                    CM &rarr; Cameroun
                                                    @if (!is_null(\App\Models\Country::where("shortern", "cm")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/et_flag.png') }}" alt="et">
                                                    ET &rarr; Ethiopie
                                                    @if (!is_null(\App\Models\Country::where("shortern", "et")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/gh_flag.png') }}" alt="gh">
                                                    GH &rarr; Ghana
                                                    @if (!is_null(\App\Models\Country::where("shortern", "gh")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/gn_flag.png') }}" alt="gn">
                                                    GN &rarr; Guinée Conakry
                                                    @if (!is_null(\App\Models\Country::where("shortern", "gn")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/ma_flag.png') }}" alt="ma">
                                                    MA &rarr; Maroc
                                                    @if (!is_null(\App\Models\Country::where("shortern", "ma")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/mg_flag.png') }}" alt="mg">
                                                    MG &rarr; Madagascar
                                                    @if (!is_null(\App\Models\Country::where("shortern", "mg")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/ml_flag.png') }}" alt="ml">
                                                    ML &rarr; Mali
                                                    @if (!is_null(\App\Models\Country::where("shortern", "ml")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/ne_flag.png') }}" alt="ne">
                                                    NE &rarr; Niger
                                                    @if (!is_null(\App\Models\Country::where("shortern", "ne")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/ng_flag.png') }}" alt="ng">
                                                    NG &rarr; Nigéria
                                                    @if (!is_null(\App\Models\Country::where("shortern", "ng")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/sn_flag.png') }}" alt="sn">
                                                    SN &rarr; Sénégal
                                                    @if (!is_null(\App\Models\Country::where("shortern", "sn")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/td_flag.png') }}" alt="td">
                                                    TD &rarr; Tchad
                                                    @if (!is_null(\App\Models\Country::where("shortern", "td")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                                <li class="list-group-item d-flex align-items-center">
                                                    <img style="height: 20px; width: 20px; margin-right:5px;" src="{{ Vite::asset('resources/assets/img/countries/tg_flag.png') }}" alt="tg">
                                                    TG &rarr; Togo
                                                    @if (!is_null(\App\Models\Country::where("shortern", "tg")->first())) <span class="badge bg-label-danger">déjà attribué</span> @else <span class="badge bg-label-success">disponible</span> @endif
                                                </li>
                                            </ul>
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