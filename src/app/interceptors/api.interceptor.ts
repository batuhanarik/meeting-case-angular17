import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { ENVIRONMENT, Environment } from '../tokens/environment.token';
import { Observable } from 'rxjs';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject(ENVIRONMENT) private _environment: Environment) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = JSON.parse(localStorage.getItem('auth')) || {};
    const token: string | null = auth.token?.toString() || null;

    console.log(token);

    let headers = req.headers;

    if (token && !(req.url.includes('login') || req.url.includes('register'))) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const clone = req.clone({
      headers,
      url: req.url.includes('https://localhost:7046')
        ? req.url
        : `${this._environment.apiUrl}${req.url}`,
    });

    return next.handle(clone);
  }
}