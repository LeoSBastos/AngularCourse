import { AddIngredients } from './../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Carrot Cake',
  //     'Carrot cake with chocolate topping',
  //     'https://img.itdg.com.br/tdg/images/recipes/000/007/228/127811/127811_original.jpg',
  //     [new Ingredient('Carrot', 3), new Ingredient('Chocolate Powder', 1)]
  //   ),
  //   new Recipe(
  //     'Prestigio Cake',
  //     'Coconut cake with chocolate topping',
  //     'https://receitatodahora.com.br/wp-content/uploads/2018/12/bolo-prestigio-gelado.jpg',
  //     [
  //       new Ingredient('Grated Coconut', 1),
  //       new Ingredient('Chocolate Powder', 1)
  //     ]
  //   )
  // ];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
