import { Recipe } from '../recipes/recipes';
import { RECIPES } from '../recipes/mock-recipes';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class RecipesService {

  API_URL = 'http://localhost:4600';

  recipes: Observable<any>;

  constructor(private http: HttpClient) {
    this.getRecipes();
  }

  getRecipes() {
    return this.recipes = this.http.get(this.API_URL + '/api/recipes');
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
