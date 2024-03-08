import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { MeetingListComponent } from "../../components/meeting-list/meeting-list.component";
import { authGuard } from "../../guards/auth.guard";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: MeetingListComponent
            }
        ]
    },

];