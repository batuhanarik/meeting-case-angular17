import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { MeetingListComponent } from "../../components/meeting-list/meeting-list.component";
import { authGuard } from "../../guards/auth.guard";
import { ProfileComponent } from "../profile/profile.component";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: MeetingListComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    },

];