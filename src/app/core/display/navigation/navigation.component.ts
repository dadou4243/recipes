import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { JwtService } from './../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  links = [
    {
      name: 'My Recipes',
      url: 'recipes/list'
    },
    {
      name: 'Explore',
      url: 'explore'
    },
    {
      name: 'Create a recipe',
      url: 'recipes/create'
    },
    {
      name: 'Log In',
      url: 'login'
    },
    {
      name: 'Sign Up',
      url: 'signup'
    }
  ];

  loggedIn: Boolean = false;

  currentUser: any = {};

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usersService.loggedIn.subscribe(value => {
      this.loggedIn = value;
    });

    this.usersService.currentUser.subscribe(user => {
      console.log(user);
      this.currentUser = user;
    });
  }

  logOut() {
    console.log('logOut');
    this.jwtService.destroyToken();
    this.usersService.setLoggedInValue(false);
    this.router.navigateByUrl('');
  }

}
