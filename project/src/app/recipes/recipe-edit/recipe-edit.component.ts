import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  id: number;
  editMode = false;
  form: FormGroup;

  private storeSub: Subscription;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.editMode = params.id !== null;
      this.initForm();
    });
  }
  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState =>
            recipeState.recipes.find((recipe, index) => index === this.id)
          )
        )
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            recipe.ingredients.forEach(ingredient => {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            });
          }
        });
    }
    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
  onSubmit() {
    const value = this.form.value;
    if (this.editMode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({ index: this.id, newRecipe: value })
      );
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(value));
    }
    this.onCancel();
  }
  get controls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }
  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
