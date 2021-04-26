import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EstadoDTO } from 'src/models/estado.dto';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class EstadoService{
    
   constructor(public http:HttpClient){}

   findAll(): Observable<EstadoDTO[]> {
       return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseURl}/estados`);
   }
   
}