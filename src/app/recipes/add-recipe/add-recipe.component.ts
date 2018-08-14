import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    ingredients: new FormControl(''),
    category: new FormControl('', Validators.required),
  });

  constructor(
    private recipesService: RecipesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.recipeForm.value);
    this.recipeForm.value.createdAt = new Date();
    this.recipesService.addRecipe(this.recipeForm.value);
    this.router.navigateByUrl('recipes');
  }

}
