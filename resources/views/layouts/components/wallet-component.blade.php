                                                            
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

                                                            </div>