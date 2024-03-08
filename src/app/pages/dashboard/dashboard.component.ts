import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavComponent } from '../../components/nav/nav.component';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  fullName: string = '';
  isSidebarVisible = false;
  constructor(
    private _auth: AuthService
  ) { }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getFullName();
  }
  getFullName() {
    this.fullName = this._auth.claims.fullName;
  }
  logout() {
    this._auth.logout();
  }
}
