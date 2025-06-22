                        @isset($flash_success)
                            <div class="alert alert-success alert-dismissible" role="alert">
                                {{ $flash_success }}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        @endif

                        @isset ($flash_error)
                            <div class="alert alert-danger alert-dismissible" role="alert">
                                {{ $flash_error }}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        @endif

                        @isset ($flash_warning)
                            <div class="alert alert-warning alert-dismissible" role="alert">
                                {{ $flash_warning }}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        @endif

                        @isset ($flash_info)
                            <div class="alert alert-info alert-dismissible" role="alert">
                                {{ $flash_info }}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        @endif