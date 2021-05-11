import { NavController, NavParams } from '@ionic/angular';
import { ProdutoDTO } from './../../../models/produto.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(
    public navCTL: NavController,
    // public navParams: NavParams
  ) { }

  ionViewDidLoad(){

    
}

  ngOnInit() {
    this.items = [
      {
          id:"1",
          nome:"Mouse",
          preco:80.90
  
      },
      {
        id:"2",
          nome:"Teclado",
          preco:100.90
  
      }
    ]
    
  }

}
