<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Initiateur</th>
                <th>Messages</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @foreach ($messages as $message)
            <tr>
                <td>
                    {{ $message->reference }}
                    <div style="font-size:12px; margin-top: 10px;" class="text-muted">
                        <span class="tf-icons bx bx-calendar"></span> {{ $message->created_at }}
                    </div>
                </td>
                <td>
                    @if (!is_null($message->user))
                    <a href="{{ route('users.show', $message->user->reference) }}" style="color: inherit !important;">
                        <span style="display: inline-block;"><img style="height: 30px; width:30px; margin-right:2px;" src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt="Avatar" class="rounded-circle" />{{$message->user->name}} </span>
                        @if (!is_null($message->user->country))
                            @if (!is_null($message->user->country->shortern))
                        <img title="{{ $message->user->country->label }}" style="height: 15px; width:15px;" alt="ci" src="{{ Vite::asset('resources/assets/img/countries/'.$message->user->country->shortern.'_flag.png') }}">
                            @endif
                        @endif
                    </a>
                    
                    @if($message->user->id == auth()->user()->id)<br> <br> <span class="badge bg-label-secondary">Vous</span> @endif
                    @else
                    <span class="badge bg-label-secondary">introuvable</span>
                    @endif
                </td>
                <td><strong>{{ count($message->chats) }}</td>
                
                <td>
                    <a href="{{ route('app.support.details', $message->reference) }}" type="button" class="btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-detail"></span>
                    </a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>