import { RecipesService } from '../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes';
import { RECIPES } from '../mock-recipes';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipesService.getRecipes()
        .subscribe(recipes => this.recipes = recipes);
  }

  deleteRecipe(id) {
    this.recipesService.deleteRecipe(id);
  }

}
