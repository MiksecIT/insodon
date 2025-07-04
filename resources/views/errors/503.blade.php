@extends('layouts.master')

@section('title')
    Nous sommes en maintenance
@endsection

@section('content')
    <div class="container-xxl container-p-y">
      <div class="misc-wrapper">
        <h2 class="mb-2 mx-2">En Maintenance</h2>
        <p class="mb-4 mx-2">
            Nous nous excusons pour le désagréemen occasioné, mais l'application est sous maintenance actuellement pour vous fournir une meilleur expérience utilisateur.
        </p>
        
        <div class="mt-4">
          <img
            src="{{Vite::asset('resources/assets/img/illustrations/girl-doing-yoga-light.png')}}"
            alt="girl-doing-yoga-light"
            width="500"
            class="img-fluid"
            data-app-dark-img="illustrations/girl-doing-yoga-dark.png"
            data-app-light-img="illustrations/girl-doing-yoga-light.png"
          />
        </div>
      </div>
    </div>
@endsection

@section('js')
    
@endsection