<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Source</th>
                <th>Montant</th>
                <th>Bénéficiaire</th>
                <th>Restant à recevoir</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @foreach ($rewards as $reward)
            <tr>
                <td>
                    {{ $reward->reference }} <br>

                    @if ($reward->isInitiale())
                    <span class="badge bg-label-warning">Recompense initiale</span> <br>                                       
                    @endif
                    <br>
                    <span class="badge bg-label-{{ $reward->isReady() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-calendar"></span> mature</span>
                     &bullet; 
                    @if (\Carbon\Carbon::parse($reward->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay) > now())
                    Dans
                    @else
                    Il y a
                    @endif
                    {{ \Carbon\Carbon::parse($reward->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay)->diffInDays(now()) + 1 }} jour(s)
                    
                    <div style="font-size:12px; margin-top: 10px;" class="text-muted">
                        <span class="tf-icons bx bx-calendar"></span> {{ $reward->created_at }}
                    </div>
                </td>
                <td>
                    @if ($reward->source == "don")
                        @if (!is_null($reward->don))
                        <span class="badge bg-label-info">#don</span> <br> <br>
                        @if (!is_null($reward->don->pack)){{ $reward->don->pack->label }}@else <span class="text-mued">pack introuvable</span> @endif
                    
                        <span class="badge rounded-pill bg-label-@if($reward->don->position == 'first')danger @elseif($reward->don->position == 'second')warning @elseif($reward->don->position == 'third')success @endif">{{ ucfirst($reward->don->position) }}</span>
                        
                        <br>
                        <span class="tf-icons bx bx-gift"></span> <span class="text-muted">&rarr;</span> <strong>@convert($reward->don->amount)</strong> <span class="text-muted">@if($reward->don->is_usd) &dollar; @else XOF @endif</span> 
                        
                        <br><br>
                        <span class="text-muted" style="font-size: 13px;">
                            @if($reward->don->position == 'first')Premier @elseif($reward->don->position == 'second')Deuxième @elseif($reward->don->position == 'third')Troisième et dernier @endif don de la série @if($reward->don->is_first) <a href="{{ route('gifts.series.details', $reward->don->reference) }}"><strong>{{ "#".$reward->don->reference }}</strong></a> @elseif(!is_null($reward->don->parent)) <a href="{{ route('gifts.series.details', $reward->don->parent->reference) }}"><strong>{{ "#".$reward->don->parent->reference }}</strong></a> @endif
                        </span>
                        <div style="font-size:12px; margin-top: 10px;" class="text-muted">
                            <span class="tf-icons bx bx-calendar"></span> {{ $reward->don->created_at }}
                        </div>
                        @else
                        <span class="badge bg-label-secondary">don introuvable</span>
                        @endif
                    @elseif ($reward->source == "bonus")
                        <span class="badge bg-label-info">#bonus</span> <br> <br>
                    @else
                        <span class="badge bg-label-secondary">source inconnue</span>
                    @endif
                </td>
                <td>
                    <strong>@convert($reward->amount)</strong> 
                    <span class="text-muted">@if($reward->is_usd) &dollar; @else XOF @endif</span></td>
                <td>
                    @if (!is_null($reward->user))
                    <a href="{{ route('users.show', $reward->user->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />
                            {{$reward->user->name}} 
                        </span>
                        @if (!is_null($reward->user->country))
                            @if (!is_null($reward->user->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$reward->user->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    
                    @if($reward->user->id == auth()->user()->id)<br> <br> <span class="badge bg-label-secondary">Vous</span> @endif
                    @else
                    <span class="badge bg-label-secondary">introuvable</span>
                    @endif
                </td>
                
                <td><strong>@convert($reward->remaining_amount)</strong> <span class="text-muted">@if($reward->is_usd) &dollar; @else XOF @endif</span></td>
                <td>
                    
                    <span class="badge bg-label-{{ $reward->isFusioned() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-link"></span> associé</span> <br><br>
                    <span class="badge bg-label-{{ $reward->isCompleted() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-check"></span> reçu {{ count($reward->fusionsCompleted()) }}/{{ count($reward->fusions) }}</span>
                </td>
                <td>
                    @if (is_null($reward->deleted_at))
                    <a href="#!" 
                    type="button" 
                    class="btn rounded-pill btn-icon btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#associate{{$reward->reference}}"
                    >
                        <span class="tf-icons bx bx-link"></span>
                    </a>
                    <div class="modal fade" id="associate{{$reward->reference}}" tabindex="-1" aria-hidden="true">
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
                                                            <strong>Montant: </strong> @convert($don->amount) <span class="text-muted">@if($don->is_usd) &dollar; @else XOF @endif</span><br>
                                                            <strong>Montant restant: </strong> @convert($don->remaining_amount) <span class="text-muted">@if($don->is_usd) &dollar; @else XOF @endif</span><br>
                                                            <strong>Status:</strong> 
                                                            <span class="badge bg-label-{{ $don->isCompleted() ? 'success' : 'secondary'}}">
                                                                @if($don->isCompleted()) terminé @else en cours @endif
                                                            </span>
                                                            &bullet;
                                                            {{ count($don->fusionsCompleted()).'/'.count($don->fusions) }}
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <span class="text-muted">Détails recompense</span><br>
                                                            <strong>Montant: </strong> @convert($reward->amount) <span class="text-muted">@if($reward->is_usd) &dollar; @else XOF @endif</span><br>
                                                            <strong>Montant restant: </strong> @convert($reward->remaining_amount) <span class="text-muted">@if($reward->is_usd) &dollar; @else XOF @endif</span><br>
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
                                            <form id="form-associate{{ $reward->reference }}" action="{{ route('associations.storeNew') }}" method="POST">
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
                                    <a href="#!" onclick="$('#form-associate{{ $reward->reference }}').submit();" type="button" class="btn btn-primary">Associer</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="{{ route('rewards.show', $reward->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-detail"></span>
                    </a>
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>