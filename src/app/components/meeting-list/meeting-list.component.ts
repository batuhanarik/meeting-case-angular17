import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MeetingService } from '../../services/meeting.service';
import { Meeting } from '../../models/meetingModel';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './meeting-list.component.html'
})
export class MeetingListComponent implements OnInit {

  meetings: Meeting[] = [];
  constructor(private _meeting: MeetingService) {
  }
  ngOnInit() {
    this.getMeetings();
  }

  getMeetings() {
    this._meeting.getMeetings().subscribe((res: any) => {
      this.meetings = res.data;
    })
  }
}
