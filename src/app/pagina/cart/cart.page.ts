import { CartService } from 'src/services/domain/cart.service';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CartItem } from 'src/models/cart-item';
import { ProdutoService } from 'src/services/domain/produto.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  
  items: CartItem[];

  constructor(
    public storage: StorageService,
    public produtoService: ProdutoService,
    public cartService:CartService)
     { }

  ngOnInit() {
    //let cart = this.storage.getCart();
    let cart = this.cartService.getCart();
    this.items = cart.items
    this.loadImageUrls();

  }

  loadImageUrls() {
    for(var i=0; i<this.items.length; i++ ){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response =>{
            item.produto.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error =>{});
    }
  }


}
