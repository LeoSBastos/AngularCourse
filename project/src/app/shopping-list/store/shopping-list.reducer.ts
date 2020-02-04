import { Ingredient } from '../../shared/ingredient.model';
import * as sla from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Carrots', 2),
    new Ingredient('Chocolate Powder Bag', 1)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: sla.ShoppingListActions
) {
  switch (action.type) {
    case sla.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case sla.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case sla.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = { ...ingredient, ...action.payload.ingredient };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return { ...state, ingredients: updatedIngredients };

    case sla.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => {
          return index !== action.payload;
        })
      };

    default:
      return state;
  }
}
