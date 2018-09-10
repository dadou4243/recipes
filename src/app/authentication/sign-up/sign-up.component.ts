import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { JwtService } from './../../core/services/jwt.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  signUp() {
    this.authService.signUp(this.signUpForm).subscribe(
      res => {
        console.log(res);
        this.authService.logIn(res);
        this.authService.setLoggedInValue(true);
        this.jwtService.saveToken(res.token);
        this.router.navigateByUrl('profile');
      },
      err => console.log(err)
    );
  }

}
