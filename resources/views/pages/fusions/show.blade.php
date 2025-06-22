@extends('layouts.master')

@section('title')
    Associations - Détails
@endsection

@section('content')
    <div class="layout-wrapper layout-content-navbar">
        
        <div class="layout-container">

            @include('layouts.partials.sidebar')
            
            <div class="layout-page">

                @include('layouts.partials.navbar')
        
                <div class="content-wrapper">
                    
                    
                    
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