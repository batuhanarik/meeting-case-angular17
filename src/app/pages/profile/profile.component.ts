import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/userModel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  disabled: boolean = true;
  user: UserModel;
  userLoaded = false;
  userUpdateForm: FormGroup;
  passwordUpdateForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _user: UserService,
    private _auth: AuthService,
    private _message: MessageService
  ) {
    this.userUpdateForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this._user
      .get(this._auth.claims?.userId)
      .subscribe((res: any) => {
        if (res.success) {
          this.user = res.data;
          this.createUserUpdateForm();
          this.userLoaded = true;
        }
      });
  }
  createUserUpdateForm() {
    this.userUpdateForm = this._fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }
  updateUser() {
    this._user
      .updateUser(this.userUpdateForm.value)
      .subscribe((res: any) => {
        if (res.success) {
          this.getUser();
          this._message.add({ severity: 'success', summary: res.message });
        }
      });
  }
}
