import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipeForm: FormGroup;

  categories: any[] = [
    {value: 'salad-0', viewValue: 'Salad'},
    {value: 'hotMeal-1', viewValue: 'Hot Meal'},
    {value: 'desert-2', viewValue: 'Desert'}
  ];

  units: any[] = [
    {value: 'grams', viewValue: 'Grams'},
    {value: 'liters', viewValue: 'Liters'},
    {value: 'units', viewValue: 'Units'},
  ];

  filteredIngredients: Observable<any>[] = [];

  ingredientsList: string[] = ['Tomato', 'Lettuce', 'Onion', 'Pepper', 'Salt', 'Water', 'Olive Oil', 'Cherry tomato', 'Cucomber'];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: [''],
      duration: [''],
      ingredients: this.fb.array([]),
      category: [''],
      level: [''],
      picture: [''],
      steps: [''],
      cost: [''],
      quantity: [''],
    });

    this.addIngredient();
  }

  get ingredientsForm() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredientName() {
    return this.ingredientsForm.get('name');
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      name: [],
      quantity: ['1'],
      unit: [],
    });

    this.ingredientsForm.push(ingredientGroup);
    this.addAutocompletion();
  }

  deleteIngredient(i) {
    this.ingredientsForm.removeAt(i);
    this.deleteAutocompletion(i);
  }

  addAutocompletion() {
    const ingredientsLength = this.ingredientsForm.controls.length - 1;

    console.log(this.ingredientsForm.controls[ingredientsLength].get('name'));

    this.filteredIngredients.push(this.ingredientsForm.controls[ingredientsLength].get('name').valueChanges
      .pipe(
        startWith(''),
        map(ingredient => {
          return ingredient ? this._filterIngredients(ingredient) : this.ingredientsList.slice();
        })
      ));
      this.filteredIngredients[ingredientsLength].subscribe(result => console.log(result));
  }

  deleteAutocompletion(i) {
    this.filteredIngredients.splice(i, 1);
  }

  onSubmit() {
    this.recipeForm.value.createdAt = new Date();
    console.log(this.recipeForm.value);
    this.recipesService.addRecipe(this.recipeForm.value).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('recipes');
      },
      error => console.log(error)
    );
  }

  private _filterIngredients(value): any[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.ingredientsList.filter(ingredient => {
      return ingredient.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  resetForm() {

  }

}
