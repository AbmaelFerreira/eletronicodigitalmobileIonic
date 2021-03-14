import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { empty, Observable, throwError } from "rxjs";
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public auth: AuthService,
          ) { }

    handleError(error: HttpErrorResponse){
        let  errorObj = error.error;
              
        console.log(errorObj);
        return throwError(errorObj);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      
     //const authToken = this.auth.authenticate;

        console.log("Passou pelo interceptor");
        //console.log(authToken);
        
        return next.handle(req)        
            .pipe(
                    catchError(
                        error => {
                            console.error(error);
                            return empty();
                        }
                    ) // this.handleError)
             );
        }

 
    }
 /*export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};

*/