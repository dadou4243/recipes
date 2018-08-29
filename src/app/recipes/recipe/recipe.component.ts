import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipes.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipeObservable: Observable<any>;
  recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.recipeObservable = this.recipesService.getRecipe(id);
    this.recipeObservable.subscribe(result => {
      this.recipe = result;
      console.log(result);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
