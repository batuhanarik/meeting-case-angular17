import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';

@Component({
  selector: 'app-set-meeting-form',
  standalone: true,
  imports: [CommonModule],
  providers: [DynamicMeetingDialogService],
  templateUrl: './set-meeting-form.component.html'
})
export class SetMeetingFormComponent {
  constructor() { }
}
