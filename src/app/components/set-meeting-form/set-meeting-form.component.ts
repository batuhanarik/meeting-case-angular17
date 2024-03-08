import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
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
    meetingName: new FormControl(''),
    meetingStartDate: new FormControl(''),
    meetingEndDate: new FormControl(''),
    meetingDocuments: new FormControl(''),
  });
  selectedCities!: any[];
  constructor(private messageService: MessageService) { }



  onUpload(event: UploadEvent | any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
