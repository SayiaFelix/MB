import { Router } from '@angular/router';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class SystemHttpInterceptor implements HttpInterceptor {
  constructor(private _router: Router,  public toastrService: ToastrService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (  event.body.response && event.body.response.code === 403 ) {
          this.toastrService.error( event.body.response.description,  '403: No rights');
        }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.toastrService.error('logged Out', 'Your session has expired');
          this._router.navigate(['/login']);
        }
      }
    });
  }
}
