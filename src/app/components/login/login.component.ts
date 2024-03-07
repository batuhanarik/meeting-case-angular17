import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginInput } from '../../models/authModel';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

      console.log(this.form.value);
      return;
    }

    this._service
      .login(this.form.value as LoginInput)
      .pipe(
        catchError((err) => {

          return of(null);
        })
      )
      .subscribe((res: any) => {
        if (res.token) {
          if (res.token != null)
            console.log(res.token);
        }
      });
  }
}
