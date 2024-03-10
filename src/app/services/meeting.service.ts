import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Meeting } from '../models/meetingModel';
import { MeetingDetailDto } from '../models/meetingDetailDto';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  meetingsUrl = 'meetings';
  constructor(private _http: HttpClient) { }

  getMeetings(): Observable<ListResponseModel<Meeting>> {
    return this._http.get<ListResponseModel<Meeting>>(
      this.meetingsUrl + '/getall'
    );
  }
  getMeetingDetails(): Observable<ListResponseModel<MeetingDetailDto>> {
    return this._http.get<ListResponseModel<MeetingDetailDto>>(
      this.meetingsUrl + '/getmeetingdetails'
    );
  }

  getMeetingById(
    id: number
  ): Observable<ObjectResponseModel<Meeting>> {
    return this._http.get<ObjectResponseModel<Meeting>>(
      this.meetingsUrl + '/getbyid?id=' + id
    );
  }

  // getWeddingPlaceDetails(): Observable<
  //   ListResponseModel<MeetingDetailDto>
  // > {
  //   return this._http.get<ListResponseModel<MeetingDetailDto>>(
  //     this.meetingsUrl + '/getdetails'
  //   );
  // }

  // getWeddingPlaceDetail(
  //   wpId: number
  // ): Observable<ObjectResponseModel<MeetingDetailDto>> {
  //   return this._http.get<ObjectResponseModel<MeetingDetailDto>>(
  //     this.meetingsUrl + '/getdetailbyid?wpId=' + wpId
  //   );
  // }

  addMeeting(
    meeting: Meeting
  ): Observable<ObjectResponseModel<Meeting>> {
    return this._http.post<ObjectResponseModel<Meeting>>(
      this.meetingsUrl + '/add',
      meeting
    );
  }
  // addMeetingImages(
  //   images: File[],
  //   weddingPlaceId: number
  // ): Observable<ResponseModel> {
  //   const formData = new FormData();
  //   for (let i = 0; i < images.length; i++) {
  //     formData.append('images', images[i]);
  //   }
  //   formData.append('weddingPlaceId', weddingPlaceId.toString());
  //   return this._http.post<ResponseModel>(
  //     this.meetingImagesUrl + '/AddMultiple',
  //     formData
  //   );
  // }

  deleteMeeting(meeting: Meeting): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(this.meetingsUrl + '/delete',
      meeting
    );
  }

  // deleteMeetingImage(image: MeetingImage): Observable<ResponseModel> {
  //   return this._http.post<ResponseModel>(
  //     this.meetingImagesUrl + '/delete',
  //     image
  //   );
  // }
}
