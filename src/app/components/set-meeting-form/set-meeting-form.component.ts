import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MeetingService } from '../../services/meeting.service';
import { Meeting } from '../../models/meetingModel';
import { MeetingMailService } from '../../services/meeting-mail.service';
import { AuthService } from '../../services/auth.service';
import { MeetingDocumentService } from '../../services/meeting-document.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-set-meeting-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastModule, FileUploadModule],
  providers: [DynamicMeetingDialogService, MessageService],
  templateUrl: './set-meeting-form.component.html'
})
export class SetMeetingFormComponent {
  files: File[];

  setMeetingForm = new FormGroup({
    meetingName: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  }, { validators: this.dateRangeValidator });
  constructor(private _auth: AuthService,
    private _meeting: MeetingService,
    private _email: MeetingMailService,
    private _message: MessageService,
    private _meetingDocument: MeetingDocumentService) { }

  submit() {
    if (this.setMeetingForm.invalid) {
      return;
    }
    this._meeting.addMeeting(this.setMeetingForm.value as unknown as Meeting).pipe(
      catchError((err: HttpErrorResponse) => {
        this._message.add({ severity: 'error', summary: JSON.parse(err.error)['Message'] });
        return of();
      })
    )
      .subscribe((res: any) => {
        if (res.success) {
          this._message.add({ severity: 'success', summary: '', detail: res.message });
          this.resetForm();
          this._meetingDocument.addMeetingDocuments(this.files, res.data.id).subscribe((docRes) => {
          })
        }
        this._email.sendEmail(this._auth.claims.fullName, this.setMeetingForm.controls['meetingName'].value, this.setMeetingForm.controls['startDate'].value, this.setMeetingForm.controls['endDate'].value)
      });
  }

  resetForm() {
    this.setMeetingForm.reset();
  }


  onUpload(event: UploadEvent) {
    this.files = [];
    for (let file of event.files) {
      this.files.push(file);
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
export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
