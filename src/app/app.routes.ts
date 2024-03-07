import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [authGuard] },
    { path: "auth", loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES) }
];
