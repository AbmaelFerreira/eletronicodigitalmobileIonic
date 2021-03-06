import { Observable } from 'rxjs';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) { }

    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(
            `${API_CONFIG.baseURl}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 24) {
        return this.http.get(
            `${API_CONFIG.baseURl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);

    }


    getSmallImageFromBucket(id: string): Observable<any> {

        let url = `${API_CONFIG.backetBaseUrl}/prod${id}-small.jpg`;

        return this.http.get(url, { responseType: 'blob' });
    }


    getImageFromBucket(id: string): Observable<any> {

        let url = `${API_CONFIG.backetBaseUrl}/prod${id}.jpg`;

        return this.http.get(url, { responseType: 'blob' });
    }
}