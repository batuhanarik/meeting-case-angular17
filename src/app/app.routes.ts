import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
    { path: "", loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES) }
];
