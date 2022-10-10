import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
    confirmpassword: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private service: UserService,private router : Router) {}

  ngOnInit(): void {}
  submit() {
    if (
      this.signupForm.value.confirmpassword == this.signupForm.value.password
    ) {
      delete this.signupForm.value.confirmpassword;
      this.service.signup(this.signupForm.value).subscribe({
        next: (res: any) => {
          alert('Account created successfully Please Login');
          this.router.navigate(["/login"]);
           this.signupForm.reset();      
        },
        error(error: HttpErrorResponse) {
          alert('Email Already exists please Login');
        },
      });
    } else { 
      this.signupForm.controls.confirmpassword.setErrors({
        'must match': false,
      });
    }
  }

}
