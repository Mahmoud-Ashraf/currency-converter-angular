import { LoaderService } from './../services/loader.service';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private count = 0;
  constructor(private loader: LoaderService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.count === 0) {
      this.loader.show();
    }
    this.count++;
    return next.handle(request).pipe(finalize(() => {
      this.count--;
      if (this.count === 0) {
        this.loader.hide();
      }
    }));
  }
}
