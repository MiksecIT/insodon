<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Source</th>
                <th>Expéditeur</th>
                <th>Destinataire</th>
                <th>Montant</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @foreach ($fusions as $fusion)
            <tr>
                <td>{{ $fusion->reference }}</td>
                <td>
                    @if (!is_null($fusion->don))
                        <span class="badge bg-label-secondary">Don</span> <a href="{{ auth()->user()->hasDon($fusion->don) || auth()->user()->isPartOfAdmin() ? route('gifts.show', $fusion->don->reference) : '#!' }}"><strong>{{ "#".$fusion->don->reference }}</strong></a> <br><br>
                        <span class="tf-icons bx bx-gift"></span> <span class="text-muted">&rarr;</span> <strong>@convert($fusion->don->amount)</strong> <span class="text-muted">XOF</span> @if (!is_null($fusion->don->amount_usd) && $fusion->don->amount_usd > 0) &bullet; <strong>@convert($fusion->don->amount_usd)</strong> <span class="pb-1 mb-4 text-muted">&dollar;</span> @endif
                        
                        @if (auth()->user()->hasDon($fusion->don) || auth()->user()->isPartOfAdmin())
                            <br>
                            <br>
                            <span class="text-muted" style="font-size: 13px;">
                                @if($fusion->don->position == 'first')Premier @elseif($fusion->don->position == 'second')Deuxième @elseif($fusion->don->position == 'third')Troisième et dernier @endif don de la série @if($fusion->don->is_first) <a href="{{ route('gifts.series.details', $fusion->don->reference) }}"><strong>{{ "#".$fusion->don->reference }}</strong></a> @elseif(!is_null($fusion->don->parent)) <a href="{{ route('gifts.series.details', $fusion->don->parent->reference) }}"><strong>{{ "#".$fusion->don->parent->reference }}</strong></a> @endif
                            </span>
                        @endif
                    @else
                        <span class="badge bg-label-secondary">introuvable</span>
                    @endif

                    @if (!is_null($fusion->reward))
                        <hr>
                        <span class="badge bg-label-secondary">recompense</span> <a href="{{ auth()->user()->hasReward($fusion->reward) || auth()->user()->isPartOfAdmin() ? route('rewards.show', $fusion->reward->reference) : "#!" }}"><strong>{{ "#".$fusion->reward->reference }}</strong></a> <br><br>
                        <span class="tf-icons bx bx-box"></span> <span class="text-muted">&larr;</span> <strong>@convert($fusion->reward->amount)</strong> <span class="text-muted">XOF</span> 
                    
                        @if (auth()->user()->hasReward($fusion->reward) || auth()->user()->isPartOfAdmin())
                            @if (!is_null($fusion->reward->remaining_amount) && $fusion->reward->remaining_amount > 0) &bullet; <strong>@convert($fusion->reward->remaining_amount)</strong> <span class="pb-1 mb-4 text-muted">restant</span> @endif
                        @endif

                    @else
                        <span class="badge bg-label-secondary">introuvable</span>
                    @endif
                
                </td>
                <td>
                    @if (!is_null($fusion->sender()))
                    <a href="{{ route('users.show', $fusion->sender()->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$fusion->sender()->name}}</span>
                        @if (!is_null($fusion->sender()->country))
                            @if (!is_null($fusion->sender()->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$fusion->sender()->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    @endif

                    @if (!is_null($fusion->sent_at))
                    <br><br>
                    <span class="text-muted">Envoi: {{ $fusion->sent_at }}</span>
                    @endif

                </td>
                <td>
                    @if (!is_null($fusion->receiver()))
                    <a href="{{ route('users.show', $fusion->receiver()->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$fusion->receiver()->name}}</span>
                        @if (!is_null($fusion->receiver()->country))
                            @if (!is_null($fusion->receiver()->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$fusion->receiver()->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    @endif

                    @if (!is_null($fusion->received_at))
                    <br><br>
                    <span class="text-muted">Reception: {{ $fusion->received_at }}</span>
                    @endif
                </td>
                <td><strong>@convert($fusion->amount)</strong> <span class="text-muted">FCFA</span></td>
                <td>
                    <span class="badge bg-label-{{ $fusion->isSent() ? 'primary' : 'secondary' }} me-1"><span class="tf-icons bx bx-check"></span> Envoyé</span> <br><br>
                    <span class="badge bg-label-{{ $fusion->isReceived() ? 'primary' : 'secondary' }} me-1"><span class="tf-icons bx bx-check"></span> Reçu</span> <br><br>
                    <span class="badge bg-label-{{ $fusion->isCompleted() ? 'success' : 'secondary'}} me-1"><span class="tf-icons bx bx-check"></span> Terminée</span>
                </td>
                <td>
                    @if ($fusion->isCompleted() == false && !is_null($fusion->sender() && !is_null($fusion->receiver())))
                        @if (auth()->user()->isPartOfAdmin() || auth()->user()->id == $fusion->sender()->id || auth()->user()->id == $fusion->receiver()->id)
                    
                    <button 
                        title="Voir les portefeuilles"
                        type="button" 
                        class="btn rounded-pill btn-icon btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#assocUsersModal{{ $fusion->reference.'_'.$view }}">
                        <span class="tf-icons bx bx-user"></span>
                    </button>
                    
                    <div class="modal fade" id="assocUsersModal{{ $fusion->reference.'_'.$view }}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalCenterTitle">Portefeuilles
                                    @if (auth()->user()->id == $fusion->sender()->id)
                                    du destinataire
                                    @elseif (auth()->user()->id == $fusion->receiver()->id)
                                    de l'expéditeur
                                    @elseif (auth()->user()->isPartOfAdmin())
                                    des deux utilisateurs
                                    @endif
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
                                        @if (auth()->user()->id == $fusion->sender()->id)
                                            @include('layouts.components.wallet-component', ["user" => $fusion->receiver()])
                                        @elseif(auth()->user()->id == $fusion->receiver()->id)
                                            @include('layouts.components.wallet-component', ["user" => $fusion->sender()])
                                        @elseif (auth()->user()->isPartOfAdmin())
                                            <h5>Expéditeur</h5>
                                            @include('layouts.components.wallet-component', ["user" => $fusion->sender()])
                                            <br>
                                            <h5>Destinataire</h5>
                                            @include('layouts.components.wallet-component', ["user" => $fusion->receiver()])
                                        @endif                                        
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                    Fermer
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>

                    <button 
                        title="Confirmation"
                        type="button" 
                        class="btn rounded-pill btn-icon btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmAssocModal{{ $fusion->reference.'_'.$view }}">
                        <span class="tf-icons bx bx-check"></span>
                    </button>
                    <div class="modal fade" id="confirmAssocModal{{ $fusion->reference.'_'.$view }}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalCenterTitle">Confirmation
                                    @if (auth()->user()->id == $fusion->sender()->id)
                                    d'envoi
                                    @elseif (auth()->user()->id == $fusion->receiver()->id)
                                    de reception
                                    @elseif (auth()->user()->isPartOfAdmin())
                                    en attente
                                    @endif
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
                                        @if (auth()->user()->id == $fusion->sender()->id)
                                            @if ($fusion->isSent() && $fusion->isReceived() == false)
                                        En attente de confirmation de reception de la part de {{ $fusion->receiver()->name }}
                                            @else
                                        Vous confirmez avoir envoyé la somme de <strong>@convert($fusion->amount)</strong> <span class="text-muted">FCFA</span> à {{ $fusion->receiver()->name }} ?
                                            @endif
                                        @elseif(auth()->user()->id == $fusion->receiver()->id)
                                            @if ($fusion->isSent() == false && $fusion->isReceived() == false)
                                        En attente de confirmation d'envoi de la part de {{ $fusion->sender()->name }}
                                            @else
                                        Vous confirmez avoir reçu la somme de <strong>@convert($fusion->amount)</strong> <span class="text-muted">FCFA</span> de la part de {{ $fusion->sender()->name }} ?
                                            @endif
                                        @elseif (auth()->user()->isPartOfAdmin())
                                            @if ($fusion->isSent() && $fusion->isReceived() == false)
                                            Cette association est en attente de confirmation de <strong class="text-primary">RECEPTION</strong>
                                            @else
                                            Cette association est en attente de confirmation de <strong class="text-primary">ENVOI et RECEPTION</strong>
                                            @endif
                                        @endif                                        
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                    @if(auth()->user()->id == $fusion->sender()->id)
                                        @if ($fusion->isSent() && $fusion->isReceived() == false)
                                        Fermer
                                        @else
                                        Non, pas encore
                                        @endif
                                    @elseif(auth()->user()->id == $fusion->receiver()->id)
                                        @if ($fusion->isSent() == false && $fusion->isReceived() == false)
                                        Fermer
                                        @else
                                        Non, pas encore
                                        @endif
                                    @else
                                    Fermer
                                    @endif
                                </button>

                                @if (auth()->user()->id == $fusion->sender()->id || auth()->user()->id == $fusion->receiver()->id)
                                    
                                    @if ($fusion->isSent() == false && $fusion->isReceived() == false && auth()->user()->id == $fusion->sender()->id)
                                    <button onclick="$('#form-confirm{{ $fusion->reference }}').submit();" type="button" class="btn btn-primary">Oui, je confirme</button>
                                    <form id="form-confirm{{ $fusion->reference }}" action="{{ route('associations.confirm') }}" method="POST">
                                        @csrf
                                        <input type="text" name="ack" value="{{ $fusion->reference }}" hidden>
                                        <input type="text" name="r" value="{{ auth()->user()->id == $fusion->sender()->id ? 'out' : 'in' }}" hidden>
                                    </form>

                                    @elseif($fusion->isSent() && $fusion->isReceived() == false && auth()->user()->id == $fusion->receiver()->id)
                                    <button onclick="$('#form-confirm{{ $fusion->reference }}').submit();" type="button" class="btn btn-primary">Oui, je confirme</button>
                                    <form id="form-confirm{{ $fusion->reference }}" action="{{ route('associations.confirm') }}" method="POST">
                                        @csrf
                                        <input type="text" name="ack" value="{{ $fusion->reference }}" hidden>
                                        <input type="text" name="r" value="{{ auth()->user()->id == $fusion->sender()->id ? 'out' : 'in' }}" hidden>
                                    </form>
                                    @endif

                                @endif

                            </div>
                        </div>
                        </div>
                    </div>

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