import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  logInForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: [''],
      password: [''],
      rememberMe: [false]
    });
  }

  login() {
    console.log(this.logInForm.value);
  }

}
