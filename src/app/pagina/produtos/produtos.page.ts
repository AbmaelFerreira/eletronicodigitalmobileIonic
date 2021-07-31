import { API_CONFIG } from './../../../config/api.config';
import { ProdutoService } from './../../../services/domain/produto.service';
import { ProdutoDTO } from './../../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {


  items: ProdutoDTO[];
  loading: any;

  constructor(

    private activateRoute: ActivatedRoute,
    public produtoService: ProdutoService,
    private router: Router,
    public loadingController: LoadingController
  ) { }

  ionViewDidLoad() {

  }

  ngOnInit() {
    let categoria_id = this.activateRoute.snapshot.paramMap.get('data');
    this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {

        this.items = response['content'];
        this.hideLoader();

        this.loadImageUrls();

      },
        error => {
          this.loading.dismiss();
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

  // async presentLoading() {
  //   this.loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Aguarde...',
  //     spinner: 'lines'
  //   });

  //   return this.loading.present();
  // }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
      spinner: 'lines'
    }).then((res) => {
      res.present();
    })
  }

  hideLoader() {

    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }
}
