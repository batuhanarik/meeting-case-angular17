import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MeetingService } from '../../services/meeting.service';
import { Meeting } from '../../models/meetingModel';
import { MeetingDetailDto } from '../../models/meetingDetailDto';
import { MeetingDocumentService } from '../../services/meeting-document.service';
import { DocumentPathPipe } from '../../pipes/document-path.pipe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  providers: [DocumentPathPipe],
  templateUrl: './meeting-list.component.html'
})
export class MeetingListComponent implements OnInit {

  meetings: MeetingDetailDto[] = [];
  constructor(private _meeting: MeetingService, private _meetingDocument: MeetingDocumentService, private documentPathPipe: DocumentPathPipe) {
  }
  ngOnInit() {
    this.getMeetingDetails();
  }

  getMeetings() {
    this._meeting.getMeetings().subscribe((res: any) => {
      this.meetings = res.data;
    })
  }
  getMeetingDetails() {
    this._meeting.getMeetingDetails().subscribe((res: any) => {
      this.meetings = res.data;
    })
  }



  download(id: number) {
    this._meetingDocument.download(Number(id)).subscribe((res: string) => {
      const transformedPath = this.documentPathPipe.transform(res);
      this._meetingDocument.downloadDocument(transformedPath);
    })

  }
}
