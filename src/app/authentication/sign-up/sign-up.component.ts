import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from './../../core/services/jwt.service';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  signUp() {
    this.usersService.signUp(this.signUpForm).subscribe(
      res => {
        console.log(res);
        this.usersService.logIn(res);
        this.usersService.setLoggedInValue(true);
        this.jwtService.saveToken(res.token);
        this.usersService.getCurrentUser();
        this.router.navigateByUrl('profile');
      },
      err => console.log(err)
    );
  }

}
