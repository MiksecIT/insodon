<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Pack</th>
                <th>Donateur</th>
                <th>Bénéficaire(s)</th>
                <th>Restant à donner</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @foreach ($dons as $don)
            <tr>
                <td>{{ $don->reference }}</td>
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
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$don->user->name}} </span>
                        @if (!is_null($don->user->country))
                            @if (!is_null($don->user->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$don->user->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    
                    @if($don->user->id == auth()->user()->id)<br> <br> <span class="badge bg-label-secondary">Vous</span> @endif
                    @else
                    <span class="badge bg-label-secondary">introuvable</span>
                    @endif
                </td>
                <td>
                    
                    @if (count($don->receivers()) > 0)
                    {{ count($don->receivers()) }} au total <br>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        @foreach ($don->receivers() as $u)
                        
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
                <td>
                    <strong>@if($don->isCompleted())@convert(0) @else @convert($don->remaining_amount)@endif</strong> <span class="text-muted">FCFA</span></td>
                <td>
                    
                    <span class="badge bg-label-{{ $don->isFusioned() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-link"></span> associé</span> <br><br>
                    <span class="badge bg-label-{{ $don->isCompleted() ? 'success' : 'secondary' }} me-1"><span class="tf-icons bx bx-check"></span> envoyé {{ count($don->fusionsCompleted()) }}/{{ count($don->fusions) }}</span>
                    
                </td>
                <td>
                    <a title="Voir les détails" href="{{ route('gifts.show', $don->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-detail"></span>
                    </a>

                    @if (auth()->user()->isTopManager())
                        @if ($don->isFusioned() == false)                            
                    <a title="Créer une association" href="{{ route('associations.createFromDon', $don->reference) }}" type="button" class="btn rounded-pill btn-icon btn-primary">
                        <span class="tf-icons bx bx-link"></span>
                    </a>                       
                        @endif
                    @endif

                    
                        @if (!is_null($don->reward))
                    <a title="Voir la recompense" href="{{ route('rewards.show', $don->reward->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-box"></span>
                    </a>
                        @endif
                    
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>