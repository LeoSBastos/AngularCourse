import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Recipe } from './../recipe.model';
import * as RecipesActions from './recipe.actions';

export class RecipeEffects {
  url = 'https://ng-course-recipe-book-8fd2b.firebaseio.com/recipes.json';
  @Effect() fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.url);
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    })
    // tap(recipes => {
    //   this.store.dispatch(new RecipeActions.SetRecipes(recipes));
    // })
    // );
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
