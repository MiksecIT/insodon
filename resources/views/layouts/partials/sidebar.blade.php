        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
          <div class="app-brand demo">
            <a href="{{ url('/') }}" class="app-brand-link">
              <span class="app-brand-logo">
                <img style="height: 30px; width:30px; object-fit:contain;" src="{{ Vite::asset('resources/assets/img/favicon/logo.jpg') }}" alt="">
              </span>
              <span class="app-brand-text menu-text fw-semi-bolder ms-2">{{ config('app.name') }}</span>
            </a>

            <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i class="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div class="menu-inner-shadow"></div>

          <ul class="menu-inner py-1">
            <li class="menu-item">
              <a href="#!" class="menu-link">
                <i class="menu-icon tf-icons bx bx-group"></i>
                <div data-i18n="Authentications">Membres <span class="badge bg-label-primary">{{ number_format(count(\App\Models\User::all()) + 350) }}</span></div>
              </a>
            </li>
            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Menu</span>
            </li>
            <!-- Dashboard -->
            <li class="menu-item {{ Route::is('home*') ? 'active' : ''}} ">
              <a href="{{ route('home') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Tableau de bord</div>
              </a>
            </li>
            <li class="menu-item {{ Route::is('packs*') ? 'active' : ''}} ">
              <a href="{{ route('packs.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Account Settings">Packs <span style="margin-left:4px;" class="text-muted">{{ count(\App\Models\Pack::where('is_available', 1)->get()) }}</span></div>
              </a>
            </li>
            <li class="menu-item {{ Route::is('gifts*') ? 'active' : ''}} ">
              <a href="{{ route('gifts.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-gift"></i>
                <div data-i18n="Account">Dons 
                  <span style="margin-left:4px;" class="text-muted">
                    @if (auth()->user()->isPartOfAdmin())
                    {{ count(auth()->user()->dons) }}/{{ \App\Models\Don::count() }}
                    @else
                    {{ count(auth()->user()->dons) }}
                    @endif
                  </span>
                </div>
              </a>
            </li>
            <li class="menu-item {{ Route::is('associations*') ? 'active' : ''}} ">
              <a href="{{ route('associations.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-link"></i>
                <div data-i18n="Notifications">Associations
                  @if (count(auth()->user()->pendingRelatedFusions()) > 0)
                  <span style="margin-left:4px;" class="badge badge-center rounded-pill bg-danger">{{ count(auth()->user()->pendingRelatedFusions()) }}</span>
                  @else
                  <span style="margin-left:4px;" class="text-muted">
                    @if (auth()->user()->isPartOfAdmin())
                    {{ count(auth()->user()->relatedFusions()) }}/{{ \App\Models\Fusion::count() }}
                    @else
                    {{ count(auth()->user()->relatedFusions()) }}
                    @endif
                  </span>
                  @endif
                </div>
              </a>
            </li>

            <li class="menu-item {{ Route::is('rewards*') ? 'active' : ''}} ">
              <a href="{{ route('rewards.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-box"></i>
                <div data-i18n="Notifications">Récompenses 
                  <span style="margin-left:4px;" class="text-muted">
                    @if (auth()->user()->isPartOfAdmin())
                    {{ count(auth()->user()->rewards) }}/{{ \App\Models\Reward::count() }}
                    @else
                    {{ count(auth()->user()->rewards) }}
                    @endif
                  </span>
                </div>
              </a>
            </li>

            @if (\App\Utils\Utils::appSettings()->enable_royalties)
              @if (auth()->user()->isPartOfAdmin() || count(auth()->user()->affiliates) > 0)
            <li class="menu-item {{ Route::is('bonus*') ? 'active' : ''}} ">
              <a href="{{ route('bonus.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-rocket"></i>
                <div data-i18n="Bonus">Bonus 
                  <span style="margin-left:4px;" class="text-muted">
                    @if (auth()->user()->isPartOfAdmin())
                    {{ count(auth()->user()->gainedRoyalties) }}/{{ \App\Models\Royalty::count() }}
                    @else
                    {{ count(auth()->user()->gainedRoyalties) }}
                    @endif
                  </span>
                </div>
              </a>
            </li>
              @endif
            @endif

            @if (\App\Utils\Utils::appSettings()->enable_notifications && 1 == 2)
            <li class="menu-item {{ Route::is('notifications*') ? 'active' : ''}}">
              <a href="{{ route('notifications.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-bell"></i>
                <div data-i18n="Authentications">Notifications <span style="margin-left:4px;" class="badge badge-center rounded-pill bg-danger">4</span></div>
              </a>
            </li>
            @endif

            <li class="menu-item {{ Route::is('app.settings*') ? 'active' : ''}}">
              <a href="{{ route('app.settings') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-cog"></i>
                <div data-i18n="Boxicons">Paramètres</div>
              </a>
            </li>
            
            @if (auth()->user()->isPartOfAdmin())
            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Administration</span>
            </li>
            <li class="menu-item {{ Route::is('users*') ? 'active' : '' }}">
              <a href="{{ route('users.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-group"></i>
                <div data-i18n="Account Settings">Utilisateurs <span style="margin-left:4px;" class="text-muted">{{ auth()->user()->isRoot() ? \App\Models\User::count() : \App\Models\User::count() - 1 }}</span></div>
              </a>
            </li>
            <li class="menu-item {{ Route::is('roles*') ? 'active' : '' }}">
              <a href="{{ route('roles.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-badge"></i>
                <div data-i18n="Notifications">Roles <span style="margin-left:4px;" class="text-muted">{{ auth()->user()->isRoot() ? \App\Models\Role::count() : \App\Models\Role::count() - 1 }}</span></div>
              </a>
            </li>
            <li class="menu-item {{ Route::is('countries*') ? 'active' : '' }}">
              <a href="{{ route('countries.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-globe"></i>
                <div data-i18n="Notifications">Pays <span style="margin-left:4px;" class="text-muted">{{ \App\Models\Country::where("is_available", 1)->get()->count().'/'.\App\Models\Country::count() }}</span></div>
              </a>
            </li>
            @endif

            @if (\App\Utils\Utils::appSettings()->enable_faq || \App\Utils\Utils::appSettings()->enable_support)
            <li class="menu-header small text-uppercase"><span class="menu-header-text">Assistance</span></li>
            @endif

            @if (\App\Utils\Utils::appSettings()->enable_support)
            <li class="menu-item {{ Route::is('app.support*') ? 'active' : '' }}">
              <a
                href="{{ route('app.support') }}"
                
                class="menu-link"
              >
                <i class="menu-icon tf-icons bx bx-support"></i>
                <div data-i18n="Support">Support</div>
              </a>
            </li>
            @endif

            @if (\App\Utils\Utils::appSettings()->enable_faq)
            <li class="menu-item {{ Route::is('faqs*') ? 'active' : '' }}">
              <a
                href="{{ route('faqs.index') }}"
                
                class="menu-link"
              >
                <i class="menu-icon tf-icons bx bx-file"></i>
                <div data-i18n="Documentation">FAQ</div>
              </a>
            </li>
            @endif

            @if (1)
            <li class="menu-item">
              <a href="#!" 
                title="Faire une recherche"
                type="button" 
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
                class="menu-link">
                <i class="menu-icon tf-icons bx bx-search"></i>
                <div data-i18n="Boxicons">Recherche</div>
              </a>              
            </li>
            @endif

          </ul>
          
        </aside>
                @if (1)
                <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-scrollable" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="modalCenterTitle">
                            Recherche
                          </h5>
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
                                <form id="form-search" action="{{ route('app.search.init') }}" method="POST">
                                  @csrf
                                  <div class="col-md mb-4">
                                      <small class="text-light fw-semibold">Référence</small>
                                      <input type="text" required name="s" class="form-control" placeholder="Entrer une reference">
                                  </div>
                                  <div class="col-md">
                                    <small class="text-light fw-semibold">Sélectionner la cible</small>
                                    <div class="form-check mt-1">
                                      <input name="c" class="form-check-input" type="radio" value="gifts">
                                      <label class="form-check-label" for="currency1"> Dons </label>
                                    </div>
                                    <div class="form-check mt-1">
                                      <input name="c" class="form-check-input" type="radio" value="associations">
                                      <label class="form-check-label" for="currency1"> Associations </label>
                                    </div>
                                    <div class="form-check mt-1">
                                      <input name="c" class="form-check-input" type="radio" value="rewards">
                                      <label class="form-check-label" for="currency1"> Recompenses </label>
                                    </div>
                                    <div class="form-check mt-1">
                                      <input name="c" class="form-check-input" type="radio" value="bonus">
                                      <label class="form-check-label" for="currency1"> Bonus </label>
                                    </div>
                                    <div class="form-check mt-1">
                                      <input name="c" class="form-check-input" type="radio" value="users">
                                      <label class="form-check-label" for="currency1"> Utilisateurs </label>
                                    </div>
                                  </div>
                                </form>                                   
                              </div>
                          </div>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                              Fermer
                          </button>
                          <button onclick="$('#form-search').submit();" type="button" class="btn btn-primary">Rechercher</button>
                          
                      </div>
                  </div>
                  </div>
                </div>
                @endif