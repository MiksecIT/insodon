            <footer class="content-footer footer bg-footer-theme">
              <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div class="mb-2 mb-md-0">
                  ©
                  <script>
                    document.write(new Date().getFullYear());
                  </script>
                  , 
                  <a href="{{ url('/') }}" class="footer-link fw-bolder">{{config('app.name')}}</a>
                </div>
                <div>
                  @if (!is_null(\App\Utils\Utils::appSettings()->terms))
                  <a href="#!" class="footer-link me-4" data-bs-toggle="modal" data-bs-target="#termsModal">
                    Conditions
                    <div class="modal fade" id="termsModal" tabindex="-1" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="modalFullTitle">Condition d'utilisation</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div>
                              {!! \App\Utils\Utils::appSettings()->terms !!}
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                              Fermer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  @endif

                  @if (!is_null(\App\Utils\Utils::appSettings()->privacy))
                  <a href="#!" class="footer-link me-4" data-bs-toggle="modal" data-bs-target="#privacyModal">
                    Confidentialité
                    <div class="modal fade" id="privacyModal" tabindex="-1" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="modalFullTitle">Politique de confidentialité</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div>
                              {!! \App\Utils\Utils::appSettings()->privacy !!}
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                              Fermer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  @endif
                </div>
              </div>
            </footer>