import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(req);

    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    const token = this.tokenService.GetToken();

    if (token) {
      headersConfig['Authorization'] = `bearer ${token}`;
    }

    const _req = req.clone({ setHeaders: headersConfig });

    return next.handle(_req);
  }
}
