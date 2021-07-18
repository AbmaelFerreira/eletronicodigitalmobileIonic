import { API_CONFIG } from './../../../config/api.config';
import { ProdutoService } from './../../../services/domain/produto.service';
import { ProdutoDTO } from './../../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {


  items: ProdutoDTO[];

  constructor(

    private activateRoute: ActivatedRoute,
    public produtoService: ProdutoService,
    private router: Router
  ) { }

  ionViewDidLoad() {

  }

  ngOnInit() {


    let categoria_id = this.activateRoute.snapshot.paramMap.get('data');

    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
        error => {

        });
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  showDetail(produto_id: string) {

    let detailData = JSON.stringify(produto_id);

    this.router.navigate(['produto-detail', { detailData }]);


  }
}
