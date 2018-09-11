import { Component, OnInit } from '@angular/core';
import { RecipesService, UsersService } from '../../core/services';
import { Recipe } from '../../data/recipes.model';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {

  recipes: Recipe[];
  currentUser: any;

  constructor(
    private recipesService: RecipesService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
      if (user) {
        this.getRecipes(this.currentUser._id);
      }
    });
  }

  getRecipes(authorId): void {
    this.recipesService.getMyRecipes(authorId).subscribe(result => {
      // console.log(result);
      this.recipes = result;
    });
  }

  deleteRecipe(id) {
    const pos = this.recipes.map(elem => elem._id).indexOf(id);
        this.recipes.splice(pos, 1);
  }

}
