import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginInput } from '../../models/authModel';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
    private _message: MessageService
  ) { }

  get getControls() {
    return this.form.controls;
  }

  submit() {
    this.isFormClicked = true;
    if (this.form.invalid) {
      if (this.getControls.email.invalid) {

      } else if (this.getControls.password.invalid) {

      }
      return;
    }

    this._service
      .login(this.form.value as LoginInput)
      .pipe(
        catchError((err: Error) => {
          this._message.add({ severity: 'error', summary: err.message });
          return of();
        })
      )
      .subscribe((res: any) => {
        if (res.token) {
          if (res.token != null) { }
        }
      });
  }
}
