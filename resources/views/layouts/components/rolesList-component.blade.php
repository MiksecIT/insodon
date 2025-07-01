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
                    @include("layouts.components.usersBubbles-component", ["users" => $role->users , "limit" => 10])
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