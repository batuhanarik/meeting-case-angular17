import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginInput } from '../../models/authModel';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CustomMessageService } from '../../services/custom-message.service';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  isFormClicked: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _service: AuthService,
    private _message: MessageService,
    private _customMessage: CustomMessageService
  ) { }

  get getControls() {
    return this.form.controls;
  }

  submit() {
    this.isFormClicked = true;
    if (this.form.invalid) {
      if (this.getControls.email.invalid) {
        this._message.add({ severity: 'info', summary: 'Make sure your email address is correct!' });
      } else if (this.getControls.password.invalid) {
        this._message.add({ severity: 'info', summary: 'Password cannot be empty.' });

      }
      return;
    }

    this._service
      .login(this.form.value as LoginInput)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this._message.add({ severity: 'error', summary: err.error });
          return of();
        })
      )
      .subscribe(res => {
        if (res.token) {
          this._message.add({ severity: 'success', summary: `Welcome ${this._service.claims.fullName}` });
          return;
        }
      });
  }

}
