import { StorageService } from './../services/domain/storage.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Observable} from "rxjs/Rx";
import { AuthService } from 'src/services/auth.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
       // Era utilizado para mostrar o 66984611494
       // public auth: AuthService,
        public storage: StorageService
        
    ) {}

    handleError(error: HttpErrorResponse){
        let  errorObj = error.error;
              
        console.log(errorObj);
        return throwError(errorObj);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     //const authToken = this.auth.authenticate;
     //console.log(authToken);
        
        return next.handle(req)        
            .pipe(
                catchError((error, catchError) => {

                    let errorObj = error;
                    if(errorObj.error){
                        errorObj = errorObj.error;
                    }
                    if(!errorObj.status) {
                        errorObj = JSON.parse(errorObj);
                    }
                            console.log("Error detectado pelo interceptor");
                            console.error(errorObj);

                            switch(errorObj.status){
                                case 403:
                                    this.handler403();
                                    break;
                            }

                            return Observable.throwError(errorObj);
                })
            ) as any;
        }
        handler403(){
            this.storage.setLocalUser(null);
        }
    }

 /*export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};

*/