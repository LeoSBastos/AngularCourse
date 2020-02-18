import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from './../recipe.service';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params.id;
        }),
        switchMap(id => {
          this.id = id;
          this.editMode = id != null;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        const recipeIngredients = new FormArray([]);
        if (this.editMode) {
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
        }
        this.form = new FormGroup({
          name: new FormControl(recipeName, Validators.required),
          imagePath: new FormControl(recipeImagePath, Validators.required),
          description: new FormControl(recipeDescription, Validators.required),
          ingredients: recipeIngredients
        });
      });
  }
  onSubmit() {
    const value = this.form.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, value);
    } else {
      this.recipeService.addRecipe(value);
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
}
