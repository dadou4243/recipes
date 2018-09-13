import { Component, OnInit } from '@angular/core';
import { JwtService } from './core/services/jwt.service';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    if (this.jwtService.getToken() && !this.jwtService.checkIfTokenExpired()) {
      this.usersService.setLoggedInValue(true);
    }
  }

}

