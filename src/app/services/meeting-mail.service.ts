import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { MessageService } from 'primeng/api';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class MeetingMailService {
  public toEmailList = "";
  public SERVICE_ID = "service_4ufsz5a";
  public TEMPLATE_ID = "template_jn3djjl";
  public PUBLIC_KEY = "4KKJfHN2BfrAxmaNr";

  constructor(private _message: MessageService, private _user: UserService) {
    this._user.getAllUserEmails().subscribe((res: any) => {
      this.toEmailList = res.data.join(',');
    })
  }

  public sendEmail(fullName: string, meetingName: string, startDate: string, endDate: string) {
    const templateParams = {
      toEmailList: this.toEmailList,
      fullName,
      meetingName,
      startDate,
      endDate,
    }
    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, {
      publicKey: this.PUBLIC_KEY,
    })
      .then(
        () => {
          this._message.add({ severity: 'success', summary: 'Meeting information email was sent to relevant employees.' });
        },
        (error) => {
          this._message.add({ severity: 'error', summary: `Upss... Error has been occured : ${(error as EmailJSResponseStatus).text}` });
        },
      );
  }
}
