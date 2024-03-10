import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {
  private profileImageUrl = "profileimages"

  constructor(private _http: HttpClient) { }


  addProfileImage(
    profileImage: File,
    userId: number
  ): Observable<ResponseModel> {
    const formData = new FormData();
    formData.append('file', profileImage);
    formData.append('userId', userId.toString());
    return this._http.post<ResponseModel>(
      this.profileImageUrl + '/Add',
      formData
    );
  }
}
