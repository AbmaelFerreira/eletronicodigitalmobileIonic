import { PedidoDTO } from './../../models/pedido.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class PedidoService {
    constructor(public http: HttpClient) { }

    insert(obj: PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseURl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

}