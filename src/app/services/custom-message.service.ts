import { Inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  constructor(private _message: MessageService) { }

  error() {
    this._message.add({ severity: 'error', summary: 'Something went wrong :(' });
  }
}
