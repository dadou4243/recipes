import { RecipesService } from '../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links = [
    {
      name: 'All Recipes',
      url: 'recipes/list'
    },
    {
      name: 'My Recipes',
      url: 'recipes/my-recipes'
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
    private recipesService: RecipesService,
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
