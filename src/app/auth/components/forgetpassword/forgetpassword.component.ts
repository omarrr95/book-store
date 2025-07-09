import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-forgetpassword',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule,FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnInit {
  loading = false;
  passwordsMatch: boolean = true;
  email: string = '';

  forgetPasswordForm = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  constructor(
    private _Router: Router,
    private toastr: ToastrService,
    private _auth: AuthService,
    private _translate: TranslateService
  ) {}

  ngOnInit() {}
  onforgetPassword(form: FormGroup) {
    if (form.invalid) return;
    this.loading = true;
    const body = {
      email: form.value.email
    };

    this._auth.forgetPassword(body).subscribe({
      next: (res) => {
        localStorage.setItem('userEmail', body.email);
        console.log(res,"err")
        this.toastr.success(res.message || this._translate.instant('Password forget successfully'));
        this._Router.navigate(['auth/reset-password']);
      },
      error: (err) => {
        console.log(err,"err")
        this.toastr.error(err.error?.message || this._translate.instant('forget password failed'));
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}

