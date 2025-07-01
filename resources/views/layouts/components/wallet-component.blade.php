                                                            
                                                            @php
                                                                if (is_null($user->setting)) {
                                                                    $user->initSetting();
                                                                }
                                                            @endphp
                                                            
                                                            <div class="alert alert-secondary">
                                                                
                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_1)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet_1" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Portefeuile 1</h6>
                                                                            <p>
                                                                                @if (!is_null($user->setting->wallet_1))
                                                                                <strong class="text-primary">
                                                                                    {{ $user->setting->wallet_1 }}
                                                                                </strong>
                                                                                @else
                                                                                Pas renseigné
                                                                                @endif
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_2)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet_2" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Portefeuile 2</h6>
                                                                            <p>
                                                                                @if (!is_null($user->setting->wallet_2))
                                                                                <strong class="text-primary">
                                                                                    {{{ $user->setting->wallet_2 }}}
                                                                                </strong>
                                                                                @else
                                                                                Pas renseigné
                                                                                @endif
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_3)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet_3" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Portefeuile 3</h6>
                                                                            @if (!is_null($user->setting->wallet_3))
                                                                            <strong class="text-primary">
                                                                                {{{ $user->setting->wallet_3 }}}
                                                                            </strong>
                                                                            @else
                                                                            Pas renseigné
                                                                            @endif
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_4)
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/icons/unicons/wallet.png') }}" alt="wallet_4" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Portefeuile 4</h6>
                                                                            @if (!is_null($user->setting->wallet_4))
                                                                            <strong class="text-primary">
                                                                                {{{ $user->setting->wallet_4 }}}
                                                                            </strong>
                                                                            @else
                                                                            Pas renseigné
                                                                            @endif
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                @if(\App\Utils\Utils::appSettings()->enable_wallet_usdt)
                                                                <hr>
                                                                <div class="d-flex mb-3">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="{{ Vite::asset('resources/assets/img/wallets/usdt.png') }}" alt="usdt" class="me-3" height="30" />
                                                                    </div>
                                                                    <div class="flex-grow-1 row">
                                                                        <div class="col-12 mb-sm-0 mb-2">
                                                                            <h6 class="mb-2">Usdt</h6>
                                                                            @if (!is_null($user->setting->wallet_usdt))
                                                                            <strong class="text-primary">
                                                                                {{{ $user->setting->wallet_usdt }}}
                                                                            </strong>
                                                                            @else
                                                                            Pas renseigné
                                                                            @endif
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @endif

                                                                <div class="accordion mt-3" id="accordionContacts">
                                                                    <div class="card accordion-item">
                                                                        <h2 class="accordion-header" id="headingOne">
                                                                            <button
                                                                            type="button"
                                                                            class="accordion-button"
                                                                            data-bs-toggle="collapse"
                                                                            data-bs-target="#accordionContactsContent"
                                                                            aria-expanded="false"
                                                                            aria-controls="accordionContactsContent"
                                                                            >
                                                                                <i class="tf-icons bx bx-phone" style="margin-right:3px;"></i> Contacts 
                                                                                
                                                                            </button>
                                                                        </h2>

                                                                        <div
                                                                            id="accordionContactsContent"
                                                                            class="accordion-collapse collapse"
                                                                            data-bs-parent="#accordionContacts"
                                                                        >
                                                                            <div class="accordion-body">
                                                                                @if (!is_null($user->phone_number) || !is_null($user->phone_number2))
                                                                                <div class="row">
                                                                                    @if (!is_null($user->phone_number))
                                                                                    <div class="col-md-6">
                                                                                        <strong class="text-primary">{{ $user->phone_number }}</strong>
                                                                                        @if($user->phone_number_is_wa)
                                                                                        <span class="badge rounded-pill bg-success mb-3"><i class="tf-icons bx bxl-whatsapp"></i> whatsapp</span>
                                                                                        @endif
                                                                                        @if($user->phone_number_is_tg)
                                                                                        <span class="badge rounded-pill bg-info"><i class="tf-icons bx bxl-telegram"></i> telegram</span>
                                                                                        @endif
                                                                                    </div>
                                                                                    @endif
                                                                                    @if (!is_null($user->phone_number2))
                                                                                    <div class="col-md-6">
                                                                                        <strong class="text-primary">{{ $user->phone_number2 }}</strong>
                                                                                        @if($user->phone_number2_is_wa)
                                                                                        <span class="badge rounded-pill bg-success mb-3"><i class="tf-icons bx bxl-whatsapp"></i> whatsapp</span>
                                                                                        @endif
                                                                                        @if($user->phone_number2_is_tg)
                                                                                        <span class="badge rounded-pill bg-info"><i class="tf-icons bx bxl-telegram"></i> telegram</span>
                                                                                        @endif
                                                                                    </div>
                                                                                    @endif
                                                                                </div>
                                                                                @else
                                                                                <span class="badge bg-label-secondary">pas renseigné</span>
                                                                                @endif
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>