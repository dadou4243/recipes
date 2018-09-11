import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from './../../core/services';
import { UsersService } from '../../core/services/users.service';

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
    private router: Router,
    private jwtService: JwtService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: [''],
      password: [''],
      rememberMe: [false]
    });
  }

  login() {
    this.usersService.logIn(this.logInForm.value).subscribe(
      res => {
        this.jwtService.saveToken(res.token);
        this.usersService.setLoggedInValue(true);
        this.usersService.getCurrentUser();
        this.router.navigateByUrl('profile');
      },
      err => {
        this.serverError = err.error.msg;
        console.log(err);
      }
    );
  }
}
