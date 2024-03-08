import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { ENVIRONMENT } from './tokens/environment.token';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  },
  { provide: ENVIRONMENT, useValue: environment }, importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule), provideAnimations(),
  provideAnimations(),
  ]
};
