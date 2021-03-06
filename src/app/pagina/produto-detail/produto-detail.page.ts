import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from './../../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produto.service';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(

    public produtoService: ProdutoService,
    private activateRoute: ActivatedRoute,
    public cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    let detailData = this.activateRoute.snapshot.paramMap.get('detailData');

    this.produtoService.findById(detailData)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();

      },
        error => {

        });
  }

  getImageUrlIfExists() {

    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${this.item.id}.jpg`;
      }, error => {
        console.log('Não encotri a imagem')
      });
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);

    this.router.navigate(['cart']);
  }
}
