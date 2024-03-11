import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class MeetingDocumentService {

  private meetingDocumentUrl = "meetingdocuments/"

  constructor(private _http: HttpClient) { }

  addMeetingDocuments(
    files: File[],
    meetingId: number
  ): Observable<ResponseModel> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('meetingId', meetingId.toString());
    return this._http.post<ResponseModel>(
      this.meetingDocumentUrl + 'add',
      formData
    );
  }

  download(id: number): Observable<string> {
    return this._http.get('meetingdocuments/download?id=' + id, { responseType: 'text' })
  }


  downloadDocument(documentPath: string) {
    this._http.get(documentPath, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const fileName = "Meeting_Document";
        saveAs(response, fileName);
      },
      error => {
      }
    );
  }
}
