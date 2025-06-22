<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Source</th>
                <th>Montant</th>
                <th>Bénéficiaire</th>
                <th>Contributeur(s)</th>
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
                </td>
                <td>
                    @if ($reward->source == "don")
                        @if (!is_null($reward->don))
                        <span class="badge bg-label-info">#don</span> <br> <br>
                        @if (!is_null($reward->don->pack)){{ $reward->don->pack->label }}@else <span class="text-mued">pack introuvable</span> @endif
                    
                        <span class="badge rounded-pill bg-label-@if($reward->don->position == 'first')danger @elseif($reward->don->position == 'second')warning @elseif($reward->don->position == 'third')success @endif">{{ ucfirst($reward->don->position) }}</span>
                        
                        <br>
                        <span class="tf-icons bx bx-gift"></span> <span class="text-muted">&rarr;</span> <strong>@convert($reward->don->amount)</strong> <span class="text-muted">FCFA</span> 
                        @if (!is_null($reward->don->amount_usd))
                        &bullet; <strong>@convert($reward->don->amount_usd)</strong> <span class="pb-1 mb-4 text-muted">&dollar;</span>
                        @endif
                        <br><br>
                        <span class="text-muted" style="font-size: 13px;">
                            @if($reward->don->position == 'first')Premier @elseif($reward->don->position == 'second')Deuxième @elseif($reward->don->position == 'third')Troisième et dernier @endif don de la série @if($reward->don->is_first) <a href="{{ route('gifts.series.details', $reward->don->reference) }}"><strong>{{ "#".$reward->don->reference }}</strong></a> @elseif(!is_null($reward->don->parent)) <a href="{{ route('gifts.series.details', $reward->don->parent->reference) }}"><strong>{{ "#".$reward->don->parent->reference }}</strong></a> @endif
                        </span>
                        @else
                        <span class="badge bg-label-secondary">don introuvable</span>
                        @endif
                    @elseif ($reward->source == "bonus")
                        <span class="badge bg-label-info">#bonus</span> <br> <br>
                    @else
                        <span class="badge bg-label-secondary">source inconnue</span>
                    @endif
                </td>
                <td><strong>@convert($reward->amount)</strong> <span class="text-muted">FCFA</span></td>
                <td>
                    @if (!is_null($reward->user))
                    <a href="{{ route('users.show', $reward->user->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$reward->user->name}} </span>
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
                <td>
                    
                    @if (count($reward->senders()) > 0)
                    {{ count($reward->senders()) }} au total <br>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        @foreach ($reward->senders() as $u)
                        
                        <li
                        data-bs-toggle="tooltip"
                        data-popup="tooltip-custom"
                        data-bs-placement="top"
                        class="avatar avatar-xs pull-up"
                        title="{{ $u->name }}{{ $u->id == auth()->user()->id ? " (Vous)" : "" }}"
                        >
                            <a href="{{ route('users.show', $u->reference) }}">
                                <img src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />
                            </a>
                        </li>

                        @endforeach
                    </ul>
                    @else
                    <span class="badge bg-label-secondary">pas encore</span>
                    @endif
                </td>
                <td><strong>@convert($reward->remaining_amount)</strong> <span class="text-muted">FCFA</span></td>
                <td>
                    
                    <span class="badge bg-label-{{ $reward->isFusioned() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-link"></span> associé</span> <br><br>
                    <span class="badge bg-label-{{ $reward->isCompleted() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-check"></span> reçu {{ count($reward->fusionsCompleted()) }}/{{ count($reward->fusions) }}</span>
                </td>
                <td>
                    <a href="{{ route('rewards.show', $reward->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-detail"></span>
                    </a>

                    @if (auth()->user()->isTopManager())
                        @if ($reward->isReady() && $reward->isFusioned() == false)                            
                    <a title="Créer une association" href="{{ route('associations.createFromReward', $reward->reference) }}" type="button" class="btn rounded-pill btn-icon btn-primary">
                        <span class="tf-icons bx bx-link"></span>
                    </a>                       
                        @endif
                    @endif
                    
                    @if (!is_null($reward->don))
                    <a href="{{ route('gifts.show', $reward->don->reference) }}" title="Voir le don" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-gift"></span>
                    </a>
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>