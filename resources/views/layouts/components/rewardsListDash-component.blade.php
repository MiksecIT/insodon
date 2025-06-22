<div class="table-responsive text-nowrap">
    <table class="table table-hover" style="height: 100%;">
        <thead>
            <tr>
                <th>recompense</th>
                {{-- <th>Montant</th> --}}
                <th>Contributeur(s)</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            @for ($i=0;$i<5;$i++)
            <tr>
                <td>

                    <a href="#!">
                        <span class="badge bg-label-dark">#696cff</span>
                    </a> <br><br>
                    <strong>@convert(rand(0,30000))</strong> <span class="text-muted">FCFA</span>
                    <br><br>
                    Angular Project  
                    {{-- 
                        First - color danger # Premier don du pack
                        Second - color warning # Deuxième don du pack
                        Third - color success # Troisième et dernier don du pack
                    --}}
                    @php
                        $packOrders = ["<span class='badge rounded-pill bg-label-danger'>1er</span>", "<span class='badge rounded-pill bg-label-warning'>2e</span>", "<span class='badge rounded-pill bg-label-success'>2e</span>"];
                    @endphp
                    {{-- <span class="badge rounded-pill bg-label-success">first</span> --}}
                    {!! $packOrders[array_rand($packOrders)] !!}
                    <br>
                    <span class="tf-icons bx bx-gift"></span> <span class="text-muted">&rarr;</span> <strong>@convert(rand(2000,30000))</strong> <span class="text-muted">XOF</span> &bullet; <strong>@convert(rand(10,50))</strong> <span class="pb-1 mb-4 text-muted">&dollar;</span>
                    
                                        
                </td>
                {{-- <td><strong>@convert(rand(0,30000))</strong> <span class="text-muted">FCFA</span></td> --}}
                
                <td>
                    {{ rand(0,10) }} au total <br>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li
                        data-bs-toggle="tooltip"
                        data-popup="tooltip-custom"
                        data-bs-placement="top"
                        class="avatar avatar-xs pull-up"
                        title="Lilian Fuller"
                        >
                        <a href="#!">
                            <img src="{{Vite::asset('resources/assets/img/avatars/5.png')}}" alt="Avatar" class="rounded-circle" />
                        </a>
                        </li>
                        <li
                        data-bs-toggle="tooltip"
                        data-popup="tooltip-custom"
                        data-bs-placement="top"
                        class="avatar avatar-xs pull-up"
                        title="Sophia Wilkerson"
                        >
                        <a href="#!">
                            <img src="{{Vite::asset('resources/assets/img/avatars/6.png')}}" alt="Avatar" class="rounded-circle" />
                        </a>
                        </li>
                        <li
                        data-bs-toggle="tooltip"
                        data-popup="tooltip-custom"
                        data-bs-placement="top"
                        class="avatar avatar-xs pull-up"
                        title="Christina Parker"
                        >
                        <a href="#!">
                            <img src="{{Vite::asset('resources/assets/img/avatars/7.png')}}" alt="Avatar" class="rounded-circle" />
                        </a>
                        </li>
                    </ul>
                </td>
                <td>
                    <span class="badge bg-label-secondary me-1">élligible</span> <br><br>
                    <span class="badge bg-label-secondary me-1">Associée</span> <br><br>
                    <span class="badge bg-label-primary me-1">Reçu ({{ rand(0,10) }}/10)</span> <br><br>
                    <span class="badge bg-label-success me-1">terminée</span>
                </td>
            </tr>
            @endfor
        </tbody>
    </table>
</div>