                    @php
                        $limitInner = $limit;
                        $remaining = count($users) > 0 ? count($users) - $limitInner : 0;
                    @endphp

                    @if (count($users) > 0)                    
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        @foreach ($users as $u)                           
                            @php
                                $limitInner -= 1;
                            @endphp

                            @if ($limitInner > 0)
                        <li
                        data-bs-toggle="tooltip"
                        data-popup="tooltip-custom"
                        data-bs-placement="top"
                        class="avatar avatar-xs pull-up"
                        title="{{ $u->name }}"
                        >
                            <a href="{{ route('users.show', $u->reference) }}">
                                <img src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />
                            </a>
                        </li>
                            @endif

                        @endforeach
                    </ul>
                        @if ($remaining > 0)
                        + {{ $remaining }} autre(s)
                        @endif
                    @else
                    <span class="badge bg-label-secondary">pas encore</span>
                    @endif