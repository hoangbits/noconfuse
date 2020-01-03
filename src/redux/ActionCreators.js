import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// comments
export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const commentsFailed = errMess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess
});

// Promos
export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = errMess => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMess
});

// Dishes
export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = errmess => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

// redux thunk action

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + "comments")
    .then(res => res.json())
    .then(comments => {
      dispatch(addComments(comments));
    });
};

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading());
  return fetch(baseUrl + "promotions")
    .then(res => res.json())
    .then(promos => {
      dispatch(addPromos(promos));
    });
};

export const fetchDishes = () => dispatch => {
  // inner function can receive dispatch() and getState()
  dispatch(dishesLoading());
  return fetch(baseUrl + "dishes")
    .then(res => res.json())
    .then(dishes => dispatch(addDishes(dishes)));
};
