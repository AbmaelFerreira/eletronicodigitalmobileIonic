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
    public produtoService: ProdutoService
  ) { }

  ionViewDidLoad(){

    
}

  ngOnInit() {

     /*  
    
    this.router.params.subscribe((categoria_id:any) =>{ this.categoria_id = categoria_id['id']; })
    
    
    this.produtoService.findByCategoria(this.categoria_id).subscribe(response =>{this.items = response['content'];}, 
    */
    let categoria_id = this.activateRoute.snapshot.paramMap.get('data');
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content'];
    },
    
    error =>{

      });

    /*this.items = [
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
    ]*/
    
  }

}
