import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../data/recipes.model';
import { RecipesService } from '../../core/services/recipes.service';
import { JwtService } from '../../core/services/jwt.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {

  recipes: Recipe[] = [];
  currentUser: any;

  constructor(
    private recipesService: RecipesService,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    if (this.jwtService.getToken) {
      this.getRecipes(this.jwtService.currentUser._id);
    }
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
