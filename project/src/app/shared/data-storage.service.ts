import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import * as RecipeActions from '../recipes/store/recipe.actions';
import * as fromApp from '../store/app.reducer';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://ng-course-recipe-book-8fd2b.firebaseio.com/recipes.json';
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(this.url, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.store.dispatch(new RecipeActions.SetRecipes(recipes));
      })
    );
  }
}
