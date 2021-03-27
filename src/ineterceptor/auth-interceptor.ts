import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/domain/storage.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { empty, Observable, throwError } from "rxjs";
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseURl.length;

        let requestToApi = req.url.substring(0, N) == API_CONFIG.baseURl;

        if(localUser && requestToApi){
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }else {
                
        
        
        return next.handle(req)        
            .pipe(
                    catchError(
                        error => {
                            console.error(error);
                            return empty();
                        }
                    ) 
             );
            }

        }

 
    }
    export const AuthInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
 