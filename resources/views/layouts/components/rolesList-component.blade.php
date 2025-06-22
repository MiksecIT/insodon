<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                {{-- <th>Reference</th> --}}
                <th>Nom</th>
                <th>Utilisateur(s) associé(s)</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @foreach ($roles as $role)

            @php
                $show = false;
            @endphp

            @if ($role->reference == "root")
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

            @if($show)
            <tr>
                {{-- <td>{{ $role->reference }}</td> --}}
                <td>{{ $role->label }}</td>
                <td>
                    {{ count($role->users) }} au total <br>
                    @if (count($role->users) > 0)
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        @foreach ($role->users as $u)
                            
                        
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

                        @endforeach
                    </ul>
                    @endif
                </td>
                <td>
                    <button type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-detail"></span>
                    </button>
                </td>
            </tr>
            @endif

            @endforeach
        </tbody>
    </table>
</div>