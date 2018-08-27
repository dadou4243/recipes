import { Component, OnInit } from '@angular/core';
import { RECIPES } from '../mock-recipes';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipes';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id: string = +this.route.snapshot.paramMap.get('id');
    this.recipe = RECIPES.find(recipe => recipe._id === id);
  }

  goBack(): void {
    this.location.back();
  }

}
