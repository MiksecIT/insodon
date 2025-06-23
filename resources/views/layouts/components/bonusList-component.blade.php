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
            @foreach ($bonus as $bonus)
            <tr>
                <td>{{ $bonus->reference }}</td>
                <td>
                    @if (!is_null($bonus->reward))
                        <hr>
                        <span class="badge bg-label-secondary">recompense</span> <a href="{{ auth()->user()->hasReward($bonus->reward) || auth()->user()->isPartOfAdmin() ? route('rewards.show', $bonus->reward->reference) : "#!" }}"><strong>{{ "#".$bonus->reward->reference }}</strong></a> <br><br>
                        <span class="tf-icons bx bx-box"></span> <span class="text-muted">&larr;</span> <strong>@convert($bonus->reward->amount)</strong> <span class="text-muted">XOF</span> 
                    
                        @if (auth()->user()->hasReward($bonus->reward) || auth()->user()->isPartOfAdmin())
                            @if (!is_null($bonus->reward->remaining_amount) && $bonus->reward->remaining_amount > 0) &bullet; <strong>@convert($bonus->reward->remaining_amount)</strong> <span class="pb-1 mb-4 text-muted">restant</span> @endif
                        @endif

                    @else
                        <span class="badge bg-label-secondary">introuvable</span>
                    @endif
                
                </td>
                <td>
                    @if (!is_null($bonus->user))
                    <a href="{{ route('users.show', $bonus->user->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$bonus->user->name}}</span>
                        @if (!is_null($bonus->user->country))
                            @if (!is_null($bonus->user->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$bonus->user->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    @endif

                    @if (!is_null($bonus->created_at))
                    <br><br>
                    <span class="text-muted">Emis le: {{ $bonus->created_at }}</span>
                    @endif

                </td>
                <td>
                    @if (!is_null($bonus->target))
                    <a href="{{ route('users.show', $bonus->target->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$bonus->target->name}}</span>
                        @if (!is_null($bonus->target->country))
                            @if (!is_null($bonus->target->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$bonus->target->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    @endif

                    @if (!is_null($bonus->claimed_at))
                    <br><br>
                    <span class="text-muted">Reclamé le: {{ $bonus->claimed_at }}</span>
                    @endif
                    @if (!is_null($bonus->received_at))
                    <br><br>
                    <span class="text-muted">Reçu: {{ $bonus->received_at }}</span>
                    @endif
                </td>
                <td><strong>@convert($bonus->value)</strong> <span class="text-muted">FCFA</span></td>
                <td>
                    <span class="badge bg-label-{{ $bonus->isClaimed() ? 'primary' : 'secondary' }} me-1"><span class="tf-icons bx bx-rocket"></span> Envoyé</span> <br><br>
                    <span class="badge bg-label-{{ $bonus->isApprouved() ? 'primary' : 'secondary' }} me-1"><span class="tf-icons bx bx-link"></span> Approuvé</span> <br><br>
                    <span class="badge bg-label-{{ $bonus->isCompleted() ? 'success' : 'secondary'}} me-1"><span class="tf-icons bx bx-check"></span> Recupéré</span>
                </td>
                <td>
                    @if ($bonus->isCompleted() == false)
                        @if (auth()->user()->hasGainedRoyalty($bonus) || auth()->user()->isTopManager())
                            @if ($bonus->isClaimed())
                                @if ($bonus->isApprouved() == false && auth()->user()->isTopManager())
                                    <button 
                                        title="Confirmation"
                                        type="button" 
                                        class="btn rounded-pill btn-icon btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirmAssocModal{{ $bonus->reference.'_'.$view }}">
                                        <span class="tf-icons bx bx-check"></span>
                                    </button>
                                    <div class="modal fade" id="confirmAssocModal{{ $bonus->reference.'_'.$view }}" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="modalCenterTitle">
                                                    Approbation de retrait
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
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                    Fermer
                                                </button>

                                                <button onclick="$('#form-confirm{{ $bonus->reference }}').submit();" type="button" class="btn btn-primary">Oui, je confirme</button>
                                                <form id="form-confirm{{ $bonus->reference }}" action="{{ route('bonus.approuve') }}" method="POST">
                                                    @csrf
                                                    <input type="text" name="ack" value="{{ $bonus->withdrawReward->reference }}" hidden>
                                                </form>

                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                @else
                                <span class="badge bg-label-secondary me-1">aucune</span>
                                @endif
                            @else
                                @if (auth()->user()->hasGainedRoyalty($bonus))
                                    <button 
                                        title="Reclamer"
                                        type="button" 
                                        class="btn rounded-pill btn-icon btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#claimModal{{ $bonus->reference.'_'.$view }}">
                                        <span class="tf-icons bx bx-rocket"></span>
                                    </button>
                                    <div class="modal fade" id="claimModal{{ $bonus->reference.'_'.$view }}" tabindex="-1" aria-hidden="true">
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