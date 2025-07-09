import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-changepassword',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule,FormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent implements OnInit {
  loading = false;
  passwordsMatch: boolean = true;
  password_new: string = '';
  confirm_password: string = '';
  checkPasswordsMatch() {
    if(this.password_new === this.confirm_password) {
this.passwordsMatch = true;
    }
    else {
this.passwordsMatch = false;
    }
  }
  passtype: { [key: string]: string } = {
    password: 'password',
    password_new: 'password',
    confirm_password: 'password'
  };

  changePasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    password_new: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });

  constructor(
    private _Router: Router,
    private toastr: ToastrService,
    private _auth: AuthService,
    private _translate: TranslateService
  ) {}

  ngOnInit() {}

  showpass(field: string) {
    this.passtype[field] = this.passtype[field] === 'password' ? 'text' : 'password';
    console.log(this.passtype[field],"field")
  }
  onChangePassword(form: FormGroup) {
    if (form.invalid) return;
    this.loading = true;
    const body = {
      password: form.value.password,
      password_new: form.value.password_new
    };

    this._auth.changePassword(body).subscribe({
      next: (res) => {
        console.log(res,"err")
        this.toastr.success(res.message || this._translate.instant('Password changed successfully'));
        this._Router.navigate(['/']);
      },
      error: (err) => {
        console.log(err,"err")
        this.toastr.error(err.error?.message || this._translate.instant('Change password failed'));
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}

