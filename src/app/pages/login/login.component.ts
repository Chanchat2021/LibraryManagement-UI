import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailHasError = false;
  loggedInUserId!: number;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
  });
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.service.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loggedInUserId = Number(res);
        sessionStorage.setItem('loggedInUserId', res);
        alert('Login successful');
        this.loginForm.reset();
        this.verifyAdmin();
      },
      error(error: HttpErrorResponse) {
        alert('Invalid credentials Please Login with valid credentials');
      },
    });
  }
  verifyAdmin() {
    this.service.verifyAdmin(this.loggedInUserId).subscribe({
      next: (res: any) => {
        if (res) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error(error: HttpErrorResponse) {
        alert('Something Went Wrong');
      },
    });
  }
}
