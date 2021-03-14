import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoriaDTO } from 'src/models/categoria.dto';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';



@Injectable()
export class CategoriaService{
   constructor(public http:HttpClient){}

   findAll(): Observable<CategoriaDTO[]> {
       return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseURl}/categorias`);
   }

   
}