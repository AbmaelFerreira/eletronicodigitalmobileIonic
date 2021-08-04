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


  items: ProdutoDTO[] = [];
  page: number = 0;



  constructor(

    private activateRoute: ActivatedRoute,
    public produtoService: ProdutoService,
    private router: Router,
    public loadingController: LoadingController
  ) { }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.loadData();
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    });
    await loading.present();
  }

  dismiss() {

    setTimeout(() => {
      this.loadingController.dismiss();
    }, 300);
  }

  doRefresh(event) {
    this.page = 0;
    this.items = [];

    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadData() {
    let categoria_id = this.activateRoute.snapshot.paramMap.get('data');
    this.presentLoading();

    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        this.loadImageUrls(start, end);
        console.log(this.page);
        console.log(this.items);
        this.dismiss();

      },
        error => {
          this.dismiss();
        });
  }

  loadDataInfinite(event) {
    this.page++;
    this.loadData();

    setTimeout(() => {
      event.target.complete();

    }, 1000);

  }


}
