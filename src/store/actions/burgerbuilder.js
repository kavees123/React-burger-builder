import * as actionTypes from './actiontypes';
import axios from '../../axios-orders';
export const addIngredient = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    };
};

export const deleteIngredient = (name) => {
    return{
        type: actionTypes.DELETE_INGREDIENTS,
        ingredientName: name
    };
};

export const setIngredient = (ingredients) => {
    return {
      type: actionTypes.SET_INGREDIENTS , 
      ingredients: ingredients
    };

}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const loadIngredients = () => {
    return  dispatch => {
        axios.get( 'https://react-my-burger-d39a0-default-rtdb.firebaseio.com/ingredients.json' )
        .then( response => {
            dispatch(setIngredient(response.data));
        } )
        .catch( error => {
            dispatch(fetchIngredientFailed());
        } ); 
    };
}