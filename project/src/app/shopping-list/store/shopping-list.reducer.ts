import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as sla from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Carrots', 2),
    new Ingredient('Chocolate Powder Bag', 1)
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: sla.AddIngredient
) {
  switch (action.type) {
    case sla.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    default:
      return state;
  }
}
