import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse, RegisterInput } from '../../models/authModel';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  loading: boolean = false;
  isWeddingPlaceOwner: boolean = false;
  form = this._fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],

  });
  constructor(private _fb: FormBuilder, private router: Router, private _auth: AuthService) {
  }

  submit() {
    console.log("submitting...")
    this._auth.register(this.form.value as RegisterInput).subscribe((res: AuthResponse) => {
      console.log(res);
    })
    //   if (this.form.invalid) {
    //     return;
    //   }
    //   this.loading = true;
    //   this._service
    //     .register(this.form.value as RegisterInput)
    //     .pipe(
    //       catchError(() => {
    //         Swal.fire({
    //           position: 'bottom-end',
    //           icon: 'error',
    //           title: `Beklenmedik bir hata oluştu!`,
    //           showConfirmButton: false,
    //           timer: 1500
    //         })
    //         return of();
    //       }),
    //     )
    //     .subscribe((res: any) => {
    //       if (res.token !== null) {
    //         Swal.fire({
    //           position: 'bottom-end',
    //           icon: 'success',
    //           title: `Başarıyla Kayıt Olundu!`,
    //           showConfirmButton: false,
    //           timer: 1500
    //         }).finally(() => {
    //           this.loading = false;
    //           this.form.reset();
    //           this.router.navigateByUrl('/auth/login');
    //         })
    //       }
    //     });

    // }
  }
}
