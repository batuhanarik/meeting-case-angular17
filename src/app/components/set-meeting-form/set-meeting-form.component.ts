import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MeetingService } from '../../services/meeting.service';
import { Meeting } from '../../models/meetingModel';
@Component({
  selector: 'app-set-meeting-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastModule, FileUploadModule],
  providers: [DynamicMeetingDialogService, MessageService],
  templateUrl: './set-meeting-form.component.html'
})
export class SetMeetingFormComponent {
  originalEvent: Event;
  files: File[];
  uploadedFiles: any[] = [];

  setMeetingForm = new FormGroup({
    meetingName: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    // meetingDocuments: new FormControl(''),
  }, { validators: this.dateRangeValidator });
  constructor(private _meeting: MeetingService, private _message: MessageService) { }

  submit() {
    if (this.setMeetingForm.invalid) {
      return;
    }
    this._meeting.addMeeting(this.setMeetingForm.value as unknown as Meeting).subscribe((res: any) => {
      this._message.add({ severity: 'success', summary: '', detail: res.message });
    });
  }

  resetForm() {
    this.setMeetingForm.reset();
  }



  onUpload(event: UploadEvent | any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this._message.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  setToday() {
    var today = new Date();
    return today;
  }
  dateRangeValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate').value;
    const endDate = formGroup.get('endDate').value;

    if (startDate && endDate && startDate > endDate) {
      return { dateRange: true };
    }

    return null;
  }
}
