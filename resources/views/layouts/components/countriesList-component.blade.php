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
            @foreach ($countries as $country)

            <tr>
                {{-- <td>{{ $country->reference }}</td> --}}
                <td>
                    @if (!is_null($country->shortern))
                    <img style="height: 20px; width:20px;" src="{{ Vite::asset('resources/assets/img/countries/'.$country->shortern.'_flag.png') }}" alt="{{ $country->shortern }}">
                    @endif
                    {{ $country->label }}
                    <span class="badge bg-label-{{ $country->is_available == 1 ? 'success' : 'secondary'}}">@if($country->is_available == 1) publié @else non publié @endif</span>
                </td>
                <td>
                    @include("layouts.components.usersBubbles-component", ["users" => $country->users , "limit" => 10])
                </td>
                <td>
                    <a href="{{ route('countries.show', $country->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-detail"></span>
                    </a>
                    <a href="{{ route('countries.edit', $country->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-edit"></span>
                    </a>
                </td>
            </tr>

            @endforeach
        </tbody>
    </table>
</div>