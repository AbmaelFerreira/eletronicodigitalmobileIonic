import { Observable } from 'rxjs';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){}

    findByCategoria(categoria_id: string){
        return this.http.get(`${API_CONFIG.baseURl}/produtos/?categorias=${categoria_id}`);
    }
}