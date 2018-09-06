import { Component, OnInit } from '@angular/core';
import { RecipesService } from './../../services/recipes.service';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Recipe } from '../../data/recipes.model';
import { Units, IngredientUnits } from '../../data/recipesForm.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  recipe: Recipe;

  recipeForm: FormGroup;

  categories: any[] = [
    {value: 'Salad', viewValue: 'Salad'},
    {value: 'Hot Meal', viewValue: 'Hot Meal'},
    {value: 'Desert', viewValue: 'Desert'}
  ];

  units: IngredientUnits[] = Units;

  filteredIngredients: Observable<any>[] = [];

  ingredientsList: any[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: [''],
      duration: [''],
      ingredients: this.fb.array([]),
      category: [''],
      level: [''],
      picture: [''],
      cost: [''],
      quantity: [''],
      steps: this.fb.array([])
    });

    this.getIngredients();
    this.getRecipe();

    // To remove later
    this.addStep();
  }

  // Get the recipe ID from the URL, get the info from the DB and update the form
  getRecipe(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.recipesService.getRecipe(id).subscribe(result => {
      this.recipe = result;
      console.log(result);
      this.recipeForm.patchValue({
        'name': this.recipe.name,
        'duration': this.recipe.duration,
        'category': this.recipe.category,
        'steps': this.recipe.steps
      });
      console.log(this.recipeForm);
      console.log(this.recipeForm.value.category);
      this.ingredientsForm.patchValue(this.recipe.ingredients);
      this.addIngredient(this.recipe.ingredients);

    });
  }

  // Getter ingredients form
  get ingredientsForm() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // Getter steps form
  get stepsForm() {
    return this.recipeForm.get('steps') as FormArray;
  }

  // Get list of ingredients from the database
  getIngredients() {
    this.recipesService.getIngredients().subscribe(result => {
      this.ingredientsList = result.map(ingredient => ingredient.name);
      // this.addIngredient();
    });
  }

  // Add a ingredient to the recipe form (empty field or populate field with existing value)
  addIngredient(ingredientsValue) {
    if (ingredientsValue) {
      for (const ingredient of ingredientsValue) {
        this.ingredientsForm.push(this.fb.group({
          name: [ingredient.name],
          quantity: [ingredient.quantity],
          unit: [ingredient.unit],
        }));
        this.addAutocompletion();
      }

    } else {
      const ingredientGroup = this.fb.group({
        name: [],
        quantity: ['1'],
        unit: [],
      });
      this.ingredientsForm.push(ingredientGroup);
      this.addAutocompletion();
    }
  }

  // Add a step to the recipe form
  addStep() {
    const stepGroup = this.fb.group({
      description: [],
      duration: [],
    });

    this.stepsForm.push(stepGroup);
  }

  // Delete an ingredient from the recipe form
  deleteIngredient(i) {
    this.ingredientsForm.removeAt(i);
    this.deleteAutocompletion(i);
  }

  // Delete an step from the recipe form
  deleteStep(i) {
    this.stepsForm.removeAt(i);
  }

  // Add autocompletion Observable to the new ingredient field created
  addAutocompletion() {
    const ingredientsLength = this.ingredientsForm.controls.length - 1;

    this.filteredIngredients.push(this.ingredientsForm.controls[ingredientsLength].get('name').valueChanges
      .pipe(
        startWith(''),
        map(ingredient => {
          return ingredient ? this._filterIngredients(ingredient) : this.ingredientsList.slice();
        })
      ));
      // this.filteredIngredients[ingredientsLength].subscribe(result => console.log(result));
  }

  // Filter the autocompletion ingredients list every time a letter is typed in the ingredient name field
  private _filterIngredients(value): any[] {
    // console.log(value);
    const filterValue = value.toLowerCase();
    return this.ingredientsList.filter(ingredient => ingredient.toLowerCase().indexOf(filterValue) === 0);
  }

  // Remove the autocompletion observable for the deleted ingredient
  deleteAutocompletion(i) {
    this.filteredIngredients.splice(i, 1);
  }

  // Save the edited recipe form to the db
  onSave() {
    // console.log(this.recipeForm.value);
    const req = this.recipeForm.value;
    req['_id'] = this.recipe._id;
    this.recipesService.editRecipe(req).subscribe(
      res => this.router.navigateByUrl('recipes/' + this.recipe._id),
      error => console.log(error)
    );
  }

  // Reset the recipe form
  resetForm() {
    // REPLACE BY DEFAULT VALUE
    // this.recipeForm.reset();
  }

}
