import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe(value => {
      console.log(value);
      this.loggedIn = value;
    });
  }

}
