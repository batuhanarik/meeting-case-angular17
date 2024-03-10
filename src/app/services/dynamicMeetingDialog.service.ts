import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MeetingService } from './meeting.service';
@Injectable({
  providedIn: 'root',
})
export class DynamicMeetingDialogService {

  ref: DynamicDialogRef;
  private dialogClosedSubject: Subject<any> = new Subject<any>();

  constructor(private dialogService: DialogService, private _meeting: MeetingService) { }

  openDialog(componentType: any, data: any): Observable<any> {
    const config: DynamicDialogConfig = {
      data: data,
      header: 'Set Meeting',
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' }
    };

    this.ref = this.dialogService.open(componentType, config);

    this.ref.onClose.subscribe(result => {
      this.dialogClosedSubject.next(result);
    });

    return this.dialogClosedSubject.asObservable();
  }

  openMeetingsTableDialog(componentType: any, data: any): Observable<any> {
    const config: DynamicDialogConfig = {
      data: data,
      header: 'Meetings List',
      width: '80%',
      contentStyle: { 'min-height': '500px', 'max-height': '500px', 'overflow': 'auto' }
    };

    this.ref = this.dialogService.open(componentType, config);

    this.ref.onClose.subscribe(result => {
      this.dialogClosedSubject.next(result);
    });

    return this.dialogClosedSubject.asObservable();
  }

  closeDialog(result?: any): void {
    this.ref.close(result);
  }
}
