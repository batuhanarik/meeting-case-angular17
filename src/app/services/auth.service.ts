import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse, LoginInput, RegisterInput } from '../models/authModel';
import { tap } from 'rxjs';
import { UserClaims } from '../models/userClaims';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  claims: UserClaims;
  private actionUrl: string = "auth/";
  constructor(private _http: HttpClient, private _router: Router, private _route: ActivatedRoute, private _authState: AuthStore) {
    if (this._authState.isAuthenticated()) {
      this.getClaims();
    }
  }

  handleTokenResponse = (res: AuthResponse) => {
    this._authState.setState(res);
    const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._router.navigateByUrl(returnUrl);
    this.getClaims();
  };
  register(input: RegisterInput) {
    return this._http.post<AuthResponse>(this.actionUrl + "register", input);
  }
  logout(): void {
    localStorage.setItem('auth', 'null');
    this._router.navigate(['/auth/login']);
  }
  login(input: LoginInput) {
    return this._http
      .post<AuthResponse>(this.actionUrl + "login", input)
      .pipe(tap(this.handleTokenResponse));
  }
  private getToken() {
    return JSON.parse(localStorage.getItem('auth'))['token'].toString();
  }
  private getClaims() {
    let token = this.getToken();
    let tokenAttributes = this.getTokenAttributes(token);
    if (tokenAttributes) {
      let claims: UserClaims = {
        userId:
          tokenAttributes[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
        email: tokenAttributes['email'],
        fullName:
          tokenAttributes[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ],
        roles:
          tokenAttributes[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
      };
      this.claims = claims;
    }
  }
  private getTokenAttributes(token: string): any {
    if (token) {
      let tokenData = token.split('.')[1];
      return JSON.parse(
        decodeURIComponent(
          atob(tokenData)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        )
      );
    }
    return null;
  }
}
