import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-resetpassword',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule,FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent implements OnInit {
  loading = false;
  passwordsMatch: boolean = true;
  email: string = '';
  password: string = '';
  otp: string = '';
    passtype: { [key: string]: string } = {
    password: 'password',
  };
  userEmail : string = localStorage.getItem('userEmail') || '';
  resetPasswordForm = new FormGroup({
    email: new FormControl(this.userEmail, Validators.required),
    password: new FormControl('', Validators.required),
    otp: new FormControl('', Validators.required)
  });

  constructor(
    private _Router: Router,
    private toastr: ToastrService,
    private _auth: AuthService,
    private _translate: TranslateService
  ) {}

  ngOnInit() {
    console.log(localStorage.getItem('userEmail'),"userEmail")
  }
    showpass(field: string) {
    this.passtype[field] = this.passtype[field] === 'password' ? 'text' : 'password';
    console.log(this.passtype[field],"field")
  }
  onresetPassword(form: FormGroup) {
    if (form.invalid) return;
    this.loading = true;
    const body = {
      email: form.value.email,
      password: form.value.password,
      otp: form.value.otp
    };

    this._auth.resetPassword(body).subscribe({
      next: (res) => {
        this.toastr.success(res.message || this._translate.instant('Password reset successfully'));
        this._Router.navigate(['auth/login']);
      },
      error: (err) => {
        console.log(err,"err")
              if (Array.isArray(err.error.message)) {
          err.error.message.forEach((msg: string | undefined) => {
            this.toastr.error(msg);
          });
        } else {
          this.toastr.error(err.error.message);
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}

