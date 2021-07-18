import { CategoriaDTO } from './../../../models/categoria.dto';
import { CategoriaService } from './../../../services/domain/categoria.service';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.backetBaseUrl;

  itens: CategoriaDTO[];

  constructor(

    public categoriaService: CategoriaService,

    public menu: MenuController,
    private router: Router) {
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.itens = response;
      },
        error => {
          // console.log('error ocorrido', error);
        });
  }

  showProdutos(categoria_id: string) {

    let data = JSON.stringify(categoria_id);
    this.router.navigate(['produtos', { data }]);

    //this.router.navigate(['/produtos', {categoria_id: categoria_id}])


  }
}
