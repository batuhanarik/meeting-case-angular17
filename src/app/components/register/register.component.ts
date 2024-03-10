import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse, RegisterInput } from '../../models/authModel';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProfileImageService } from '../../services/profile-image.service';
import { ResponseModel } from '../../models/responseModel';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FileUploadModule, ToastModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  loading: boolean = false;
  profileImage: any;

  form = this._fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],

  });
  constructor(private _fb: FormBuilder, private router: Router, private _auth: AuthService, private _profileImage: ProfileImageService, private _message: MessageService) {
  }

  submit() {
    console.log("submitting...")
    // debugger
    // this._auth.register(this.form.value as unknown as RegisterInput).subscribe((res: any) => {
    //   if (res.success) {
    //     console.log(res);
    //     setTimeout(() => {
    //       this.router.navigateByUrl("/auth/login");
    //     }, 1500)

    //     // this._profileImage.addProfileImage(this.profileImage, res).subscribe((res: ResponseModel) => {
    //     //   console.log(res.message);
    //     // })
    //     this._message.add({ severity: 'success', summary: `Hey! ${res.data.firstName} ${res.data.lastName}`, detail: res.message });

    //   }
    //   this.form.reset();
    //   this.profileImage = null;
    // })


    if (this.form.invalid) {
      console.log(this.form.value)
      this._message.add({ severity: 'info', summary: 'You must fiil out the form completely' });
      return;
    }
    this._auth
      .register(this.form.value as RegisterInput)
      .pipe(
        catchError(() => {
          this._message.add({ severity: 'error', summary: 'Something went wrong :(' });
          return of();
        }),
      )
      .subscribe((res: any) => {
        if (res.success) {
          this._message.add({ severity: 'success', summary: `Hey! ${res.data.firstName} ${res.data.lastName}`, detail: res.message })
          setTimeout(() => {
            this.router.navigateByUrl("/auth/login");
          }, 1500)

        }
      });
  }


  onUpload(event: any) {
    console.log("uploaded")
    this.profileImage = event?.files[0];
    this._message.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}
