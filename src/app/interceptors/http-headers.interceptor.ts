import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': '280196b45emsh95d981b9ee09715p1a3414jsn3fcaa5295257',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '806ce9eea21c4975ba44f2877945b6d0',
      },
    });
    return next.handle(req);
  }
}
