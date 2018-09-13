import { Component, OnInit } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  currentUser: any;

  constructor(
    private jwtService: JwtService,
  ) { }

  ngOnInit() {
    this.currentUser = this.jwtService.currentUser;
  }

}
