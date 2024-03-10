import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Meeting } from '../../models/meetingModel';
import { MeetingService } from '../../services/meeting.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DynamicMeetingDialogService } from '../../services/dynamicMeetingDialog.service';
import { UpdateMeetingFormComponent } from '../update-meeting-form/update-meeting-form.component';
@Component({
  selector: 'app-meetings-table',
  standalone: true,
  imports: [TableModule, ToastModule],
  templateUrl: './meetings-table.component.html',
  providers: [MessageService]
})
export class MeetingsTableComponent implements OnInit {

  constructor(private _meeting: MeetingService, private _message: MessageService, private _dialog: DynamicMeetingDialogService) { }
  ngOnInit(): void {
    this.getMeetings();
  }

  parseISODate = (isoDateString: string): Date => {
    return new Date(isoDateString);
  };

  meetings: Meeting[] = [];

  getMeetings() {
    this._meeting.getMeetings().subscribe((res) => {
      this.meetings = res.data;
    });
  }

  updateMeeting(data: any) {
    this._dialog.openMeetingUpdateDialog(UpdateMeetingFormComponent, data).subscribe();
  }

  deleteMeeting(meeting: Meeting) {
    this._meeting
      .deleteMeeting(meeting)
      .subscribe((res: any) => {
        if (res.success) {
          this._message.add({
            severity: 'success', summary: 'The meeting has been deleted.'
          });
          this.getMeetings();
          return;
        }
        this._message.add({ severity: 'error', summary: 'Something went wrong :(' });
      });
  }

}
