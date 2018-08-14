import { Recipe } from '../recipes/recipes';
import { RECIPES } from '../recipes/mock-recipes';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RecipesService {

  recipes: Observable<Recipe[]>;

  constructor() {
    this.getRecipes();
  }

  getRecipes() {
    return this.recipes = of(RECIPES);
  }

  addRecipe(recipe) {
    recipe.id = Math.floor(Math.random() * 10000);
    RECIPES.push(recipe);
    console.log(RECIPES);
  }

  deleteRecipe(id) {
    console.log('delete recipe', id);
    const index = RECIPES.indexOf(RECIPES.find(elem => elem.id === id));
    RECIPES.splice(index, 1);
  }
}
