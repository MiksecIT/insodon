<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Nom complet</th>
                <th>Dons</th>
                <th>Recompenses</th>
                <th>Communauté</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @foreach ($users as $user)

            @php

                $show = false;

                $user->initSetting();

            @endphp

            @if ($user->reference == "root")
                @if (auth()->user()->isRoot())
                    @php
                        $show = true;
                    @endphp
                @else
                    @php
                        $show = false;
                    @endphp
                @endif
            @else
                @php
                    $show = true;
                @endphp
            @endif

            @if ($show)
            <tr>
                <td>{{ $user->reference }}</td>
                <td>
                    <a href="{{ route('users.show', $user->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$user->name}} </span>
                        @if (!is_null($user->country))
                            @if (!is_null($user->country->shortern))
                        <img title="Côte d'ivoire" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$user->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    @if (auth()->user()->id == $user->id)
                    <span class="badge bg-label-secondary">Vous</span> 
                    @endif
                    @if (auth()->user()->isPartOfAdmin())
                        @if (!is_null($user->role))
                        <br><br>
                        <span class="badge bg-label-secondary">{{ $user->role->label }}</span>
                        @endif
                    @endif

                </td>
                <td>
                    {{ count($user->dons) }}
                </td>
                <td>
                    {{ count($user->rewards) }}
                </td>
                <td>                    
                    @include("layouts.components.usersBubbles-component", ["users" => $user->affiliates , "limit" => 10])
                </td>
                <td>
                    <a title="Voir les détails" href="{{ route('users.show', $user->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-detail"></span>
                    </a>
                    
                    @if (auth()->user()->isPartOfAdmin())
                    <a title="Modifier" href="{{ route('users.edit', $user->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-edit"></span>
                    </a>
                    @endif
                                       
                </td>
            </tr>
            @endif

            @endforeach
        </tbody>
    </table>
</div>