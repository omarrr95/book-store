import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  passtype: string = "password";
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })
  constructor(private _Router: Router, private toastr: ToastrService, private _userLogin: AuthService, private _translate: TranslateService) {
  }

  ngOnInit() {

  }
  showpass() {
    this.passtype = this.passtype === 'password' ? 'text' : 'password';
  }
  onLogin(data: FormGroup) {
    this.loading = true;
    this._userLogin.onLogin(data.value).subscribe({
      next: (res: any) => {
        console.log(res,"res")
        localStorage.setItem('userToken', res.data.refreshToken);
        this.toastr.success(res.message);
        localStorage.setItem('user', res.data.profile.first_name);
        localStorage.setItem('userEmail', res.data.profile.email);
        localStorage.setItem('userRole', res.data.profile.role);
        //  this.toastr.success(this._translate.instant('login sucesfully'));
      },
      complete: () => {
        this.loading = false;
        this._translate.instant('Login')
        this._Router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error.message);
      },
    })
  }
}
