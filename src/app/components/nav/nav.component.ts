import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { SetMeetingFormComponent } from '../set-meeting-form/set-meeting-form.component';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MeetingsTableComponent } from '../meetings-table/meetings-table.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ObjectResponseModel } from '../../models/objectResponseModel';
import { UserDetailDto } from '../../models/userDetailDto';
import { AuthService } from '../../services/auth.service';
import { ImagePathPipe } from '../../pipes/image-path.pipe';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, ImagePathPipe],
  templateUrl: './nav.component.html',

  providers: [DynamicMeetingDialogService, DialogService]
})
export class NavComponent implements OnInit {
  userDetail: UserDetailDto = null;
  constructor(private _dynamicMeetingDialog: DynamicMeetingDialogService, private _user: UserService, private _auth: AuthService) {
  }
  ngOnInit(): void {
    this.getUserDetail()
  }
  ref: DynamicDialogRef | undefined;
  // constructor(public dialogService: DialogService) { }

  openSetMeetingDialog(): void {
    this._dynamicMeetingDialog.openDialog(SetMeetingFormComponent, null)
      .subscribe(result => {
      });

  }
  openMeetingsListDialog() {
    this._dynamicMeetingDialog.openMeetingsTableDialog(MeetingsTableComponent, null)
      .subscribe(res => { })
  }
  getUserDetail() {
    this._user.getUserDetail(this._auth.claims.userId).subscribe((res: ObjectResponseModel<UserDetailDto>) => {
      this.userDetail = res.data
    })
  }
}
