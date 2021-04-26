import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CidadeDTO } from 'src/models/cidade.dto';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class CidadeService{
   constructor(public http:HttpClient){}

   findAll(estado_id: string): Observable<CidadeDTO[]> {
       return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseURl}/estados/${estado_id}/cidades`);
   }

   
}