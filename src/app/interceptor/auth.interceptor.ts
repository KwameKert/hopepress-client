import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(public _toastr: ToastrService) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if(evt.body && evt.body.success)
                        this._toastr.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
                }
            }),
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    try {
                        this._toastr.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
                    } catch(e) {
                        this._toastr.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
                    }
                    //log error 
                }
                return of(err);
            }));
    
      }
      
}