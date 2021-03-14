import { StorageService } from './domain/storage.service';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LocalUser } from 'src/models/local_user';

@Injectable()
export class AuthService{

  constructor(private http: HttpClient, public storage: StorageService){ }

  authenticate(creds: CredenciaisDTO) {
      
        return this.http.post(
            `${API_CONFIG.baseURl}/login`,
            creds, 
            { observe: 'response',  responseType: 'text' }
        ).pipe(tap( res => {
          
          const token = res.headers.get('Authorization');
          
          console.log(token);

        }))
      }

      succesFullLogin(authorizationValue: string){

        let  tok = authorizationValue.substring(7);
        //let  tok = authorizationValue
        let user: LocalUser = {
          token: tok
        };
        this.storage.setLocalUser(user);
         
      }

      logout(){
        this.storage.setLocalUser(null);
      }
}





    /*
    
    protected deductHeader() {
      console.log(this.headers().get('Authorization'));
        return {headers: this.hasToken() ? this.securityHeaders() : this.headers()};
      }
  
      protected headers(): HttpHeaders {
        return new HttpHeaders({
          'Content-Type': 'application/json',
         
        });
      }

      protected securityHeaders(): HttpHeaders {
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        });
      }
    
    protected getCurrentUser() {
        const ret = localStorage.getItem('currentUser');
        if (ret) {
          return JSON.parse(ret);
        }
    
        return null;
      }
    
     protected getToken(): string {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          return currentUser.token;
        }
    
        return null;
      }
    
      hasToken(): boolean {
        const jwt = this.getToken();
    
        return jwt != null && jwt !== '';
      }

    handleError(error: HttpErrorResponse){
        let  errorObj = error.error;
              
        console.log(errorObj);
        return throwError(errorObj);
    }
    
    */