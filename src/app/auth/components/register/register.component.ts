import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { error } from 'console';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  email: string = "";
  password: string = "";
  first_name: string = "";
  last_name: string = "";
  role: string = "Customer";
  passtype: string = "password";
  loading = false;

  registerForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    role: new FormControl("Customer"),
    password: new FormControl(null, [Validators.required])
  })
  constructor(private _Router: Router, private toastr: ToastrService, private _userRegister: AuthService) {

  }

  ngOnInit() {

  }
  showpass() {
    this.passtype = this.passtype === 'password' ? 'text' : 'password';
  }
  onRegister(data: FormGroup) {
    this.loading = true;
    this._userRegister.onRegister(data.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      complete: () => {
        this.loading = false;
        this.toastr.success("register sucesfully");
        this._Router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading = false;
        if (Array.isArray(err.error.message)) {
          err.error.message.forEach((msg: string | undefined) => {
            this.toastr.error(msg);
          });
        } else {
          this.toastr.error(err.error.message);
        }

      },
    })
  }
}