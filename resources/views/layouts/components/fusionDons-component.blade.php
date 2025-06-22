<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Pack</th>
                <th>Donateur</th>
                <th>Restant à envoyer</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @foreach ($dons as $don)
            <tr>
                <td>
                    {{ $don->reference }} <br>
                </td>
                <td>
                    @if (!is_null($don->pack)){{ $don->pack->label }}@else <span class="text-mued">Oups, pack introuvable</span> @endif
                    
                    <span class="badge rounded-pill bg-label-@if($don->position == 'first')danger @elseif($don->position == 'second')warning @elseif($don->position == 'third')success @endif">{{ ucfirst($don->position) }}</span>
                    
                    <br>
                    <span class="tf-icons bx bx-gift"></span> <span class="text-muted">&rarr;</span> <strong>@convert($don->amount)</strong> <span class="text-muted">XOF</span> 
                    @if (!is_null($don->amount_usd))
                    &bullet; <strong>@convert($don->amount_usd)</strong> <span class="pb-1 mb-4 text-muted">&dollar;</span>
                    @endif
                    <br><br>
                    <span class="text-muted" style="font-size: 13px;">
                        @if($don->position == 'first')Premier @elseif($don->position == 'second')Deuxième @elseif($don->position == 'third')Troisième et dernier @endif don de la série @if($don->is_first) <a href="{{ route('gifts.series.details', $don->reference) }}"><strong>{{ "#".$don->reference }}</strong></a> @elseif(!is_null($don->parent)) <a href="{{ route('gifts.series.details', $don->parent->reference) }}"><strong>{{ "#".$don->parent->reference }}</strong></a> @endif
                    </span>
                </td>
                <td>
                    @if (!is_null($don->user))
                    <a href="{{ route('users.show', $don->user->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$reward->user->name}} </span>
                        @if (!is_null($don->user->country))
                            @if (!is_null($don->user->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$reward->user->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    
                    @if($don->user->id == auth()->user()->id)<br> <br> <span class="badge bg-label-secondary">Vous</span> @endif
                    @else
                    <span class="badge bg-label-secondary">introuvable</span>
                    @endif
                </td>
                
                <td><strong>@convert($don->remaining_amount)</strong> <span class="text-muted">FCFA</span></td>
                <td>
                    
                    <span class="badge bg-label-{{ $don->isFusioned() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-link"></span> associé</span> <br><br>
                    <span class="badge bg-label-{{ $don->isCompleted() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-check"></span> envoyé {{ count($don->fusionsCompleted()) }}/{{ count($don->fusions) }}</span>
                </td>
                <td>
                    
                    <a href="#!" 
                    type="button" 
                    class="btn rounded-pill btn-icon btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#associate{{$don->reference}}"
                    >
                        <span class="tf-icons bx bx-link"></span>
                    </a>
                    <div class="modal fade" id="associate{{$don->reference}}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalCenterTitle">Association</h5>
                                    <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col">                                                                
                                            Vous allez créer une association entre les utilisateurs suivant: <br> <br>
                                            Donateur :
                                            @if(!is_null($don->user)) 
                                            <a href="{{ route('users.show', $don->user->reference) }}">
                                                <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$don->user->name}} </span>
                                                @if (!is_null($don->user->country))
                                                    @if (!is_null($don->user->country->shortern))
                                                <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="{{ $don->user->country->shortern }}" src="{{ Vite::asset('resources/assets/img/countries/'.$don->user->country->shortern.'_flag.png') }}">
                                                    @endif
                                                @endif
                                            </a> 
                                            @endif 
                                            <br>
                                            Bénéficiaire :
                                            @if(!is_null($reward->user)) 
                                            <a href="{{ route('users.show', $reward->user->reference) }}">
                                                <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$reward->user->name}} </span>
                                                @if (!is_null($reward->user->country))
                                                    @if (!is_null($reward->user->country->shortern))
                                                <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="{{ $reward->user->country->shortern }}" src="{{ Vite::asset('resources/assets/img/countries/'.$reward->user->country->shortern.'_flag.png') }}">
                                                    @endif
                                                @endif
                                            </a> 
                                            @endif
                                            <br>
                                            <br>
                                            <div class="card bg-label alert alert-dark"  role="alert">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <span class="text-muted">Détails don</span><br>
                                                            <strong>Montant: </strong> @convert($don->amount) <span class="text-muted">FCFA</span><br>
                                                            <strong>Montant restant: </strong> @convert($don->remaining_amount) <span class="text-muted">FCFA</span><br>
                                                            <strong>Status:</strong> 
                                                            <span class="badge bg-label-{{ $don->isCompleted() ? 'success' : 'secondary'}}">
                                                                @if($don->isCompleted()) terminé @else en cours @endif
                                                            </span>
                                                            &bullet;
                                                            {{ count($don->fusionsCompleted()).'/'.count($don->fusions) }}
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <span class="text-muted">Détails recompense</span><br>
                                                            <strong>Montant: </strong> @convert($reward->amount) <span class="text-muted">FCFA</span><br>
                                                            <strong>Montant restant: </strong> @convert($reward->remaining_amount) <span class="text-muted">FCFA</span><br>
                                                            <strong>Status:</strong> 
                                                            <span class="badge bg-label-{{ $reward->isCompleted() ? 'success' : 'secondary'}}">
                                                                @if($reward->isCompleted()) terminé @else en cours @endif
                                                            </span>
                                                            &bullet;
                                                            {{ count($reward->fusionsCompleted()).'/'.count($reward->fusions) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <form id="form-associate{{ $don->reference }}" action="{{ route('associations.storeNew') }}" method="POST">
                                                @csrf
                                                <input type="text" name="d" value="{{ $don->reference }}" hidden>
                                                <input type="text" name="r" value="{{ $reward->reference }}" hidden>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                        Fermer
                                    </button>
                                    <a href="#!" onclick="$('#form-associate{{ $don->reference }}').submit();" type="button" class="btn btn-primary">Associer</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="{{ route('gifts.show', $don->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-detail"></span>
                    </a>

                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>