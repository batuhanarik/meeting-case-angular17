import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { MeetingService } from '../../services/meeting.service';
import { MeetingMailService } from '../../services/meeting-mail.service';
import { MessageService } from 'primeng/api';
import { MeetingDocumentService } from '../../services/meeting-document.service';
import { Meeting } from '../../models/meetingModel';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-meeting-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastModule, FileUploadModule],
  providers: [MessageService, DatePipe],
  templateUrl: './update-meeting-form.component.html'
})
export class UpdateMeetingFormComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef | undefined;

  constructor(private config: DynamicDialogConfig,
    private _meeting: MeetingService,
    private _message: MessageService,
    private _meetingDocument: MeetingDocumentService,
    private _datePipe: DatePipe
  ) { }
  ngOnDestroy(): void {
    if (this.ref)
      this.ref.destroy();

  }
  meetingDetail: any;
  ngOnInit(): void {
    this.getMeetingDetail();
  }
  files: File[];

  updateMeetingForm = new FormGroup({
    id: new FormControl(0),
    meetingName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  }, { validators: this.dateRangeValidator });

  submit() {
    if (this.updateMeetingForm.invalid) {
      return;
    }
    this._meeting.updateMeeting(this.updateMeetingForm.value as unknown as Meeting).subscribe((res: any) => {
      if (res.success) {
        this._message.add({ severity: 'success', summary: '', detail: res.message });
      }
    });
  }
  getMeetingDetail() {
    this._meeting.getMeetingById(this.config.data.id).subscribe((res: any) => {
      this.meetingDetail = res.data;
      this.meetingDetail.startDate = this._datePipe.transform(this.meetingDetail.startDate, 'yyyy-MM-dd');
      this.meetingDetail.endDate = this._datePipe.transform(this.meetingDetail.endDate, 'yyyy-MM-dd');

      this.updateMeetingForm.controls.id.patchValue(this.meetingDetail.id);
      this.updateMeetingForm.controls.description?.setValue(this.meetingDetail?.description);
      this.updateMeetingForm.controls.meetingName.patchValue(this.meetingDetail.meetingName);
      this.updateMeetingForm.controls.startDate.patchValue(this.meetingDetail.startDate);
      this.updateMeetingForm.controls.endDate.patchValue(this.meetingDetail.endDate);
    })
  }
  resetForm() {
    this.updateMeetingForm.reset();
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

