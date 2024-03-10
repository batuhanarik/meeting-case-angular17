import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const _message = inject(MessageService);
  return next(req).pipe(catchError((err: any) => {
    _message.add({ severity: 'error', summary: 'Something went wrong :(' });
    return of();
  }));
};
