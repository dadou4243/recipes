import { Component, OnInit } from '@angular/core';
import { JwtService } from './core/services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (private jwtService: JwtService) {}

  ngOnInit() {
    this.jwtService.getToken();
  }
}
