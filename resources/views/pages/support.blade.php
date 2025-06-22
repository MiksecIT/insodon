@extends('layouts.master')

@section('title')
    Comment pouvons-nous vous aidez {{ auth()->user()->name }}
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
                                <h4 class="fw-bold py-3">Support</h4>
                                <p class="text-muted">Nous vous écoutons</p>
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
                                            data-bs-target="#navs-pills-justified-details"
                                            aria-controls="navs-pills-justified-details"
                                            aria-selected="true"
                                            >
                                                <i class="tf-icons bx bx-support"></i> Détails
                                            </button>
                                        </li>

                                        @if (auth()->user()->isPartOfAdmin())
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
                                                <i class="tf-icons bx bx-chat"></i> Liste &bullet; {{ count($messages) }}
                                            </button>
                                        </li>
                                        @endif
                                    </ul>
                                    <div class="tab-content">
                                        
                                        <div class="tab-pane fade show active" id="navs-pills-justified-details" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Détails support
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="support-container" style="height: 300px !important; overflow: auto; padding: 0 15px;">
                                                                @forelse ($message->chats as $chat)
                                                                <div style="text-align: @if($chat->user_id == auth()->user()->id) right @else left @endif;">
                                                                    <img src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt class="w-px-40 h-auto rounded-circle" />
                                                                    <span style="display:inline-block;" class="alert alert-{{ $chat->user_id == auth()->user()->id ? 'primary' : 'dark'}}" role="alert">
                                                                        {{ $chat->content }}
                                                                    </span>
                                                                    <p style="font-size:12px;" class="text-muted">
                                                                        {{ $chat->created_at }} 
                                                                        @if (!is_null($chat->user))
                                                                        &bullet; 
                                                                        <a href="{{ auth()->user()->isPartOfAdmin() ? route('users.show', $chat->user->reference) : '#!' }}">
                                                                            <strong>
                                                                                @if ($chat->user_id == auth()->user()->id)
                                                                                    {{ $chat->user->name }}
                                                                                @else
                                                                                    {{ auth()->user()->isPartOfAdmin() ? $chat->user->name : 'Support' }}
                                                                                @endif
                                                                            </strong>
                                                                        </a>
                                                                        @endif
                                                                    </p>
                                                                </div>
                                                                @empty
                                                                    <span style="display:block;" class="alert alert-secondary text-center" role="alert">Aucun message envoyé pour le moment — N'hésitez pas !</span>
                                                                @endforelse
                                                            </div>
                                                            <form action="{{ route('chats.store') }}" method="POST">
                                                                @csrf
                                                                <input type="text" name="message" id="message" value="{{ $message->reference }}" hidden>
                                                                <div class="row">
                                                                    <div class="mb-3 col-md-12">
                                                                        <label for="chat" class="form-label">Message</label>
                                                                        <textarea
                                                                            class="form-control"
                                                                            id="content"
                                                                            name="content"
                                                                            placeholder="Ecrivez votre message ici..."
                                                                            autofocus
                                                                            required
                                                                            rows="1" cols="1"
                                                                        > </textarea>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col">
                                                                        <button type="submit" class="btn btn-primary me-2"><i class="tf-icons bx bx-send"></i> Envoyer</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        @if (auth()->user()->isPartOfAdmin())
                                        <div class="tab-pane fade" id="navs-pills-justified-all" role="tabpanel">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <p>
                                                        Tous les recours reçus
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    @if (count($messages) > 0)
                                                    @include('layouts.components.messagesList-component', ["messages" => $messages])
                                                    @else
                                                    <div class="badge bg-label-secondary">pas encore disponible</div>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                        @endif
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