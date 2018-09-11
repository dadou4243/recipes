import { Component, OnInit } from '@angular/core';
import { JwtService } from './core/services/jwt.service';
import { UsersService } from './core/services/users.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (
    private jwtService: JwtService,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.jwtService.getToken() && !this.jwtService.checkIfTokenExpired()) {
      this.authService.setLoggedInValue(true);
      this.usersService.getCurrentUser();
    }
  }

}

