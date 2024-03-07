import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse, RegisterInput } from '../models/authModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private actionUrl: string = "auth/";
  constructor(private _http: HttpClient, private _router: Router, private _route: ActivatedRoute) { }


  register(input: RegisterInput) {
    return this._http.post<AuthResponse>(this.actionUrl + "register", input);
  }
}
