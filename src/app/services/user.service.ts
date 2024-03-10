import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  usersUrl = 'users';
  userEmails: [] = [];
  emails: string = "";

  getAllUserEmails(): Observable<any> {
    return this._http.get<string[]>(
      this.usersUrl + '/getallemails'
    )
  }
}
