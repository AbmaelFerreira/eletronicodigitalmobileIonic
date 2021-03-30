import { StorageService } from './domain/storage.service';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LocalUser } from 'src/models/local_user';
import { JwtHelperService  } from '@auth0/angular-jwt';


@Injectable()
export class AuthService{

  jwtHelper: JwtHelperService = new JwtHelperService();

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
      
  refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseURl}/auth/refresh_token`,
            {},
            { observe: 'response',  responseType: 'text' }
        )
       }
    

      succesFullLogin(authorizationValue: string){

        let  tok = authorizationValue.substring(7);
        //let  tok = authorizationValue
        let user: LocalUser = {
          token: tok,
          email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
         
      }

      logout(){
        this.storage.setLocalUser(null);
      }
}