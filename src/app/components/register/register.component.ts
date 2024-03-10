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
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FileUploadModule, ToastModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  loading: boolean = false;
  profileImage: File = null;

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
    if (this.form.invalid) {
      this._message.add({ severity: 'info', summary: 'You must fiil out the form completely' });
      return;
    }
    this._auth
      .register(this.form.value as RegisterInput)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this._message.add({ severity: 'error', summary: err.error });
          return of();
        }),
      )
      .subscribe((res: any) => {
        if (res.success) {
          console.log("Kayıt başarılı, profile image : " + this.profileImage);
          if (this.profileImage.name) {
            this._profileImage.addProfileImage(this.profileImage, res.data.id).subscribe((imgRes: any) => {
              if (imgRes.success) {
                console.log("Profile image uploaded successfully");
                this.profileImage = null;
              }
            })
          }
          else {
            console.log("profile image boş");
          }
          setTimeout(() => {
            this.router.navigateByUrl("/auth/login");
            this._message.add({ severity: 'success', summary: `Hey! ${res.data.firstName} ${res.data.lastName}`, detail: res.message })
          }, 1500)
        }
      });
  }


  onUpload(event: UploadEvent) {
    console.log("uploaded")
    this.profileImage = null
    this.profileImage = event.files[0];
    console.log(this.profileImage);
    this._message.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}
export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
