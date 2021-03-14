import { CategoriaDTO } from './../../../models/categoria.dto';
import { CategoriaService } from './../../../services/domain/categoria.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.backetBaseUrl;

  itens:CategoriaDTO[];

  constructor(
    public navCtrl:NavController,
    public categoriaService: CategoriaService) { 
  }

  ionViewDidLoad(){
    
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
}
