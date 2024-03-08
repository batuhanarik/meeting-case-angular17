import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SetMeetingFormComponent } from '../set-meeting-form/set-meeting-form.component';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
        console.log('Dialog kapatıldı. Sonuç:', result);
      });

    // this._dynamicMeetingDialog.openSetMeetingModal();
  }
}
