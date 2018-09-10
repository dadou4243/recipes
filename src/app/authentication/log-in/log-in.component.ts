import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService, AuthService } from './../../core/services';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  logInForm: FormGroup;

  serverError: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: [''],
      password: [''],
      rememberMe: [false]
    });
  }

  login() {
    this.authService.logIn(this.logInForm.value).subscribe(
      res => {
        this.jwtService.saveToken(res.token);
        this.authService.setLoggedInValue(true);
        this.router.navigateByUrl('profile');
      },
      err => {
        this.serverError = err.error.msg;
        console.log(err);
      }
    );
  }
}
