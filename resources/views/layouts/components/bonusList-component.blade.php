<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Source</th>
                <th>émetteur</th>
                <th>recepteur</th>
                <th>Montant</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @foreach ($bonus as $bon)
            <tr>
                <td>{{ $bon->reference }}</td>
                <td>
                    @if (!is_null($bon->don))
                        
                        <span class="badge bg-label-info">#don</span>
                        
                        <span class="badge rounded-pill bg-label-@if($bon->don->position == 'first')danger @elseif($bon->don->position == 'second')warning @elseif($bon->don->position == 'third')success @endif">{{ ucfirst($bon->don->position) }}</span>
                        <br><br>
                        <span class="badge bg-label-secondary">Don</span> <a href="{{ auth()->user()->hasDon($bon->don) || auth()->user()->isPartOfAdmin() ? route('gifts.show', $bon->don->reference) : "#!" }}"><strong>{{ "#".$bon->don->reference }}</strong></a> <br><br>
                        <span class="tf-icons bx bx-gift"></span> <span class="text-muted">&rarr;</span> <strong>@convert($bon->don->amount)</strong> <span class="text-muted">@if($bon->don->is_usd) &dollar; @else XOF @endif</span> 
                    
                        @if (auth()->user()->hasDon($bon->don) || auth()->user()->isPartOfAdmin())
                            @if (!is_null($bon->don->remaining_amount) && $bon->don->remaining_amount > 0) &bullet; <strong>@convert($bon->don->remaining_amount)</strong> <span class="pb-1 mb-4 text-muted">restant</span> @endif
                        @endif

                        <br><br>
                        <span class="text-muted" style="font-size: 13px;">
                            @if($bon->don->position == 'first')Premier @elseif($bon->don->position == 'second')Deuxième @elseif($bon->don->position == 'third')Troisième et dernier @endif don de la série @if($bon->don->is_first) <a href="{{ route('gifts.series.details', $bon->don->reference) }}"><strong>{{ "#".$bon->don->reference }}</strong></a> @elseif(!is_null($bon->don->parent)) <a href="{{ route('gifts.series.details', $bon->don->parent->reference) }}"><strong>{{ "#".$bon->don->parent->reference }}</strong></a> @endif
                        </span>

                    @else
                        <span class="badge bg-label-secondary">introuvable</span>
                    @endif

                    @if (!is_null($bon->withdrawReward))
                    <hr>
                        @if ($bon->withdrawReward->source == "bonus")
                            <span class="badge bg-label-info">#bonus</span> <br> <br>
                        @else
                            <span class="badge bg-label-secondary">source inconnue</span> <br><br>
                        @endif
                        <span class="badge bg-label-secondary">recompense</span> <a href="{{ auth()->user()->hasReward($bon->withdrawReward) || auth()->user()->isPartOfAdmin() ? route('rewards.show', $bon->withdrawReward->reference) : "#!" }}"><strong>{{ "#".$bon->withdrawReward->reference }}</strong></a> <br><br>
                        <span class="tf-icons bx bx-box"></span> <span class="text-muted">&larr;</span> <strong>@convert($bon->withdrawReward->amount)</strong> <span class="text-muted">@if($bon->withdrawReward->is_usd) &dollar; @else XOF @endif</span> 
                    
                        @if (auth()->user()->hasReward($bon->withdrawReward) || auth()->user()->isPartOfAdmin())
                            @if (!is_null($bon->withdrawReward->remaining_amount) && $bon->withdrawReward->remaining_amount > 0) &bullet; <strong>@convert($bon->withdrawReward->remaining_amount)</strong> <span class="pb-1 mb-4 text-muted">restant</span> @endif
                        @endif
                    @endif
                
                </td>
                <td>
                    @if (!is_null($bon->user))
                    <a href="{{ route('users.show', $bon->user->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$bon->user->name}}</span>
                        @if (!is_null($bon->user->country))
                            @if (!is_null($bon->user->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$bon->user->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    @endif

                    @if (!is_null($bon->created_at))
                    <br><br>
                    <span class="text-muted">                        
                        <span class="tf-icons bx bx-calendar"></span> {{ $bon->created_at }}
                    </span>
                    @endif

                </td>
                <td>
                    @if (!is_null($bon->targeted))
                    <a href="{{ route('users.show', $bon->targeted->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;">
                            <img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />
                            {{$bon->targeted->name}}
                        </span>
                        @if (!is_null($bon->targeted->country))
                            @if (!is_null($bon->targeted->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$bon->targeted->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    @endif

                    @if (!is_null($bon->claimed_at))
                    <br><br>
                    <span class="text-muted">Reclamé le: {{ $bon->claimed_at }}</span>
                    @endif
                    @if (!is_null($bon->received_at))
                    <br>
                    <span class="text-muted">Reçu: {{ $bon->received_at }}</span>
                    @endif
                </td>
                <td><strong>@convert($bon->value)</strong> <span class="text-muted">@if($bon->is_usd) &dollar; @else XOF @endif</span></td>
                <td>
                    <span class="badge bg-label-{{ $bon->isClaimed() ? 'primary' : 'secondary' }} me-1"><span class="tf-icons bx bx-rocket"></span> Reclamé</span> <br><br>
                    <span class="badge bg-label-{{ $bon->isApprouved() ? 'primary' : 'secondary' }} me-1"><span class="tf-icons bx bx-link"></span> Approuvé</span> <br><br>
                    <span class="badge bg-label-{{ $bon->isCompleted() ? 'success' : 'secondary'}} me-1"><span class="tf-icons bx bx-check"></span> Recupéré</span>
                </td>
                <td>
                    @if ($bon->isCompleted() == false)
                        @if (auth()->user()->hasGainedRoyalty($bon) || auth()->user()->isTopManager())
                            @if ($bon->isClaimed())
                                @if ($bon->isApprouved() == false && auth()->user()->isTopManager())
                                    <button 
                                        title="Confirmation"
                                        type="button" 
                                        class="btn rounded-pill btn-icon btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirmAssocModal{{ $bon->reference.'_'.$view }}">
                                        <span class="tf-icons bx bx-check"></span>
                                    </button>
                                    <div class="modal fade" id="confirmAssocModal{{ $bon->reference.'_'.$view }}" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="modalCenterTitle">
                                                    Approbation
                                                </h5>
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
                                                        Voulez-vous vraiment approuver cette demande de reclamation de bonus ? 
                                                        <br><br>
                                                        NB: Cette action est irréversible.                               
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                    Fermer
                                                </button>

                                                <button onclick="$('#form-confirm{{ $bon->reference }}').submit();" type="button" class="btn btn-primary">Oui, je confirme</button>
                                                <form id="form-confirm{{ $bon->reference }}" action="{{ route('bonus.approuve') }}" method="POST">
                                                    @csrf
                                                    <input type="text" name="ack" value="{{ $bon->withdrawReward->reference }}" hidden>
                                                </form>

                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                @else
                                <span class="badge bg-label-secondary me-1">aucune</span>
                                @endif
                            @else
                                @if (auth()->user()->hasGainedRoyalty($bon))
                                    <button 
                                        title="Reclamer"
                                        type="button" 
                                        class="btn rounded-pill btn-icon btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#claimModal{{ $bon->reference.'_'.$view }}">
                                        <span class="tf-icons bx bx-rocket"></span>
                                    </button>
                                    <div class="modal fade" id="claimModal{{ $bon->reference.'_'.$view }}" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="modalCenterTitle">Reclamation de bonus</h5>
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
                                                            Voulez-vous vraiment reclamer vos bonus élligibles ?
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                        Non
                                                    </button>
                                                    <button onclick="$('#form-claim').submit();" type="button" class="btn btn-primary">Oui, je confirme</button>
                                                    <form id="form-claim" action="{{ route('bonus.claim') }}" method="POST">
                                                        @csrf
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                @else
                                <span class="badge bg-label-secondary me-1">aucune</span>
                                @endif
                            @endif
                        @else
                        <span class="badge bg-label-secondary me-1">aucune</span>
                        @endif
                    @else
                    <span class="badge bg-label-secondary me-1">aucune</span>
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>