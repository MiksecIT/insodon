<nav
            class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              
              <div class="navbar-nav align-items-center">
                <div class="nav-item">
                  Hello {{ auth()->user()->name }}, @if(!is_null(\App\Utils\Utils::appSettings()->welcome)) {{ \App\Utils\Utils::appSettings()->welcome }} @else Bienvenue sur <a href="{{ url('/') }}"><strong>{{ config('app.name') }}</strong></a>@endif                  
                </div>
              </div>

              <ul class="navbar-nav flex-row align-items-center ms-auto">
                <!-- Place this tag where you want the button to render. -->

                <!-- User -->
                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                  <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online">
                      <img src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar avatar-online">
                              <img src="{{Vite::asset('resources/assets/img/avatars/default.png')}}" alt class="w-px-40 h-auto rounded-circle" />
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <span class="fw-semibold d-block">{{ auth()->user()->name }}</span>
                            <small class="text-muted">
                              @if (!is_null(auth()->user()->role)) {{ ucfirst(auth()->user()->role->label) }} @else Utilisateur @endif 
                              @if (!is_null(auth()->user()->country))                                
                              &bullet; <img src="{{ Vite::asset('resources/assets/img/countries/'.auth()->user()->country->shortern.'_flag.png') }}" style="height: 15px; width:15px; vertical-align:middle; margin-right:3px;" alt="{{ auth()->user()->country->shortern }}_flag">{{ auth()->user()->country->label }}
                              @endif
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <a class="dropdown-item" href="{{ route('home') }}">
                        <i class="bx bx-user me-2"></i>
                        <span class="align-middle">Tableau de bord</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="{{ route('gifts.index') }}">
                        <i class="bx bx-gift me-2"></i>
                        <span class="align-middle">Dons</span>
                      </a>
                    </li>

                    @if(\App\Utils\Utils::appSettings()->enable_notifications)
                    <li>
                      <a class="dropdown-item" href="{{ route('notifications.index') }}">
                        <span class="d-flex align-items-center align-middle">
                          <i class="flex-shrink-0 bx bx-bell me-2"></i>
                          <span class="flex-grow-1 align-middle">Notifications</span>
                          <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                        </span>
                      </a>
                    </li>
                    @endif

                    <li>
                      <a class="dropdown-item" href="{{ route('app.settings') }}">
                        <i class="bx bx-cog me-2"></i>
                        <span class="align-middle">Paramètres</span>
                      </a>
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#!" onclick="event.preventDefault();$('#logout-form').submit();">
                        <i class="bx bx-power-off me-2"></i>
                        <span class="align-middle">Déconnexion</span>
                      </a>
                      <form action="{{ Route::has('logout') ? route('logout') : '#!' }}" method="POST" style="display: none;" id="logout-form">
                          @csrf
                      </form>
                    </li>
                  </ul>
                </li>
                <!--/ User -->
              </ul>
            </div>
          </nav>