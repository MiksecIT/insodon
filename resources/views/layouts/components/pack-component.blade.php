                                <div class="card h-100">
                                    <img class="card-img-top" src="{{ load_asset_url($pack->image_url) }}" alt="Card image cap" />
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            @if (auth()->user()->isTopManager())
                                                @if(auth()->user()->isRoot() && !is_null($pack->deleted_at))
                                                <span style="margin-right: 10px;" class="badge bg-label-secondary text-danger"><span class="tf-icons bx bx-trash"></span>Supprimé</span>
                                                @endif                                                
                                                <span style="margin-right: 10px;" class="badge bg-label-{{ $pack->is_available ? 'success' : 'danger'}}">{{ $pack->is_available ? 'Publié' : 'Non publié'}}</span>
                                            @endif
                                            {{ $pack->label }}
                                        </h6>
                                        <h4 class="card-title">@convert($pack->amount) <span class="text-muted">XOF</span> 
                                            @if (!is_null($pack->amount_usd))
                                            &bullet; @convert($pack->amount_usd) <span class="pb-1 mb-4 text-muted">&dollar;</span>
                                            @endif
                                        </h4>
                                        @if (auth()->user()->isPartOfAdmin())
                                        <p class="text-muted">{{ count($pack->donsCompleted()) }}/{{ count($pack->dons) }} don(s) déjà effectué(s)</p>
                                        @endif
                                        <hr>
                                        <p class="card-text">
                                            {!! $pack->description !!}                                           
                                        </p>
                                        <a href="#!" style="display: block; width:100%;" type="button" class="btn btn-primary mb-3"
                                        type="button"  
                                            data-bs-toggle="modal"
                                            data-bs-target="#newGiftModal{{$pack->reference}}">
                                            <span class="tf-icons bx bx-rocket"></span>&nbsp; Faire un don
                                        </a>
                                        <div class="modal fade" id="newGiftModal{{$pack->reference}}" tabindex="-1" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="modalCenterTitle">Devise du don</h5>
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
                                                                Veuillez choisir la dévise dans laquelle vous voulez faire le don. <br>
                                                                
                                                                <form id="form-newGift{{ $pack->reference }}" action="{{ route('gifts.store') }}" class="mt-3" method="POST">
                                                                    @csrf
                                                                    <input type="text" name="u__d" value="{{ $pack->reference }}" hidden>
                                                                    <div class="col-md">
                                                                        <small class="text-light fw-semibold">Dévises disponibles</small>
                                                                        <div class="form-check mt-1">
                                                                            <input name="c" class="form-check-input" type="radio" value="usd" id="currency1">
                                                                            <label class="form-check-label" for="currency1"> USD &dash; Dollar américain </label>
                                                                        </div>
                                                                        <div class="form-check">
                                                                            <input name="c" class="form-check-input" type="radio" value="xof" id="currency2" checked="">
                                                                            <label class="form-check-label" for="currency2"> Continuer en XOF (FCFA) </label>
                                                                        </div>
                                                                    </div>
                                                                </form>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                            Non
                                                        </button>
                                                        <a href="#!" onclick="$('#form-newGift{{ $pack->reference }}').submit();" type="button" class="btn btn-primary">Oui, je confirme</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        @if (auth()->user()->isTopManager())
                                            <a href="#!" style="display: block; width:100%;" 
                                            type="button" 
                                            class="btn btn-outline-primary mb-3" 
                                            data-bs-toggle="modal"
                                            data-bs-target="#newRewardModal{{$pack->reference}}"
                                            >
                                                <span class="tf-icons bx bx-box"></span>&nbsp; Créer une recompense
                                            </a>
                                            <div class="modal fade" id="newRewardModal{{$pack->reference}}" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="modalCenterTitle">Recompense initiale</h5>
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
                                                                    Voulez-vous créer une récompense initiale pour ce pack ? <br>
                                                                    Si oui, veuillez entrer la référence du bénéficiaire
                                                                    <form id="form-newReward{{ $pack->reference }}" action="{{ route('gifts.reward.create') }}" method="POST">
                                                                        @csrf
                                                                        <input type="text" name="ack" value="{{ $pack->reference }}" hidden>
                                                                        <div class="mt-4">
                                                                            <input type="text" required name="rec" class="form-control" placeholder="Entrer la reference du bénéficiaire">
                                                                        </div>
                                                                        <div class="mt-4">
                                                                            <small class="text-light fw-semibold">Dévises disponibles</small>
                                                                            <div class="form-check mt-1">
                                                                                <input name="c" class="form-check-input" type="radio" value="usd" id="currency1">
                                                                                <label class="form-check-label" for="currency1"> USD &dash; Dollar américain </label>
                                                                            </div>
                                                                            <div class="form-check">
                                                                                <input name="c" class="form-check-input" type="radio" value="xof" id="currency2" checked="">
                                                                                <label class="form-check-label" for="currency2"> Continuer en XOF (FCFA) </label>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                                Non
                                                            </button>
                                                            <a href="#!" onclick="$('#form-newReward{{ $pack->reference }}').submit();" type="button" class="btn btn-primary">Oui, je confirme</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <a href="{{ route('packs.edit', $pack->reference) }}" style="display: block; width:100%;" type="button" class="btn btn-outline-primary mb-3">
                                                <span class="tf-icons bx bx-edit"></span>&nbsp; Modifier
                                            </a>

                                            @if (auth()->user()->isRoot() && is_null($pack->deleted_at))
                                            <a href="#!" style="display: block; width:100%;" type="button" class="btn btn-outline-danger mb-3" onclick="event.preventDefault();if(confirm('Vous allez supprimer ce pack, continuer ?')) {$('#form-delete{{ $pack->reference }}').submit();}">
                                                <span class="tf-icons bx bx-trash"></span>&nbsp; Supprimer
                                            </a>
                                            <form id="form-delete{{ $pack->reference }}" action="{{ route('packs.destroy', $pack->id) }}" method="POST">
                                                @csrf
                                                <input type="text" name="_method" value="DELETE" hidden>
                                            </form>
                                            @endif

                                            @if (auth()->user()->isRoot() && !is_null($pack->deleted_at))
                                                <a href="#!" style="display: block; width:100%;" type="button" class="btn btn-danger mb-3" onclick="event.preventDefault();if(confirm('Vous allez supprimer définitivement ce pack, continuer ?')) {$('#form-delete{{ $pack->reference }}').submit();}">
                                                    <span class="tf-icons bx bx-trash"></span>&nbsp; Supprimer définitivement
                                                </a>
                                                <form id="form-delete{{ $pack->reference }}" action="{{ route('packs.destroy', $pack->id) }}" method="POST">
                                                    @csrf
                                                    <input type="text" name="_method" value="DELETE" hidden>
                                                </form>
                                            @endif

                                        @endif

                                    </div>
                                </div>