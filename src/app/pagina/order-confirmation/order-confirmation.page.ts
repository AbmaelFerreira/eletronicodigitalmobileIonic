import { ClienteService } from './../../../services/domain/cliente.service';
import { EnderecoDTO } from './../../../models/endereco.dto';
import { ClienteDTO } from './../../../models/cliente.dto';
import { CartService } from './../../../services/domain/cart.service';
import { CartItem } from './../../../models/cart-item';
import { PedidoDTO } from './../../../models/pedido.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    private activateRoute: ActivatedRoute,
    public cartService: CartService,
    public clienteService: ClienteService,
    private router: Router
  ) {

    this.pedido = JSON.parse(this.activateRoute.snapshot.paramMap.get('pedido'));
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos'])
      },
        error => {
          this.router.navigate(['home']);

        }
      )
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }
}
