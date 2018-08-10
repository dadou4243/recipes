import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeForm = new FormGroup({
    name: new FormControl(''),
    duration: new FormControl(''),
  });

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.recipeForm.value);
    this.recipesService.addRecipe(this.recipeForm.value);
  }

}
