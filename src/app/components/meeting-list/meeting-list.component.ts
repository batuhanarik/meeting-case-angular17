import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './meeting-list.component.html'
})
export class MeetingListComponent {
  meetings: any[] = ["MEETING I", "MEETING 2", "MEETING 3", "MEETING 4", "MEETING 5", "MEETING 6"]
}
