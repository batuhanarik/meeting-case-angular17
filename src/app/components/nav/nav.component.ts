import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SetMeetingFormComponent } from '../set-meeting-form/set-meeting-form.component';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MeetingsTableComponent } from '../meetings-table/meetings-table.component';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',

  providers: [DynamicMeetingDialogService, DialogService]
})
export class NavComponent {
  constructor(private _dynamicMeetingDialog: DynamicMeetingDialogService) { }
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
}
