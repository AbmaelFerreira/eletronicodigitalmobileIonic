import { CartService } from './../../../services/domain/cart.service';
import { PedidoDTO } from './../../../models/pedido.dto';
import { ClienteService } from './../../../services/domain/cliente.service';
import { StorageService } from './../../../services/domain/storage.service';
import { EnderecoDTO } from './../../../models/endereco.dto';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public storage: StorageService,
    // private activateRoute: ActivatedRoute,
    private router: Router,
    public clienteService: ClienteService,
    public nav: NavController,
    public cartService: CartService

  ) { }

  ngOnInit() {

    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            items: cart.items.map(x => { return { quantidade: x.quantidade, produto: { id: x.produto.id } } })

          }

        },
          error => {
            if (error.status == 403) {
              this.nav.navigateForward('/home');
            }
          });
    }
    else {
      this.nav.navigateForward('/home');
    }
  }

  nextPage(item_pedido: EnderecoDTO) {

    this.pedido.enderecoDeEntrega = { id: item_pedido.id };

    let pedidoDTO = JSON.stringify(this.pedido)

    this.router.navigate(['payment', { pedido: pedidoDTO }]);
    console.log(this.pedido);
  }
}
