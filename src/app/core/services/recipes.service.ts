import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Recipe } from '../../data/recipes.model';
import { UsersService } from './users.service';
import { JwtService } from './jwt.service';

@Injectable()

export class RecipesService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.API_URL}/recipes`);
  }

  getRecipe(id): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.API_URL}/recipes/` + id);
  }

  addRecipe(recipe): Observable<Recipe>  {
    recipe.author = this.jwtService.currentUser._id;
    return this.http.post<Recipe>(`${environment.API_URL}/recipes`, recipe);
  }

  deleteRecipe(id) {
    return this.http.delete<any>(`${environment.API_URL}/recipes/` + id);
  }

  getIngredients(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/ingredients`);
  }

  editRecipe(recipe): Observable<any> {
    console.log(recipe);
    return this.http.patch<any>(`${environment.API_URL}/recipes/` + recipe._id, recipe);
  }

  searchRecipe(searchInput) {
    console.log(searchInput);
    return this.http.post<any>(`${environment.API_URL}/recipes/search`, {searchInput});
  }

  getMyRecipes(authorId) {
    return this.http.get<any[]>(`${environment.API_URL}/recipes/user/${authorId}`);
  }
}
