import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// comments
export const addComment = comment => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => dispatch => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  };
  newComment.date = new Date().toISOString();
  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            "Error: " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        throw err;
      }
    )
    .then(res => res.json())
    .then(res => dispatch(addComment(res)))
    .catch(err => {
      console.log("POST comments: " + err.message);
      alert("Your comment could now be posted \n Error: " + err.message);
    });
};

export const addFeedBack = feedback => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback
});

export const postFeedback = (
  firstName,
  lastName,
  telNum,
  email,
  agree,
  contactType,
  message
) => dispatch => {
  const newFeedback = {
    firstName: firstName,
    lastName: lastName,
    telNum: telNum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  };
  newFeedback.date = new Date().toISOString();
  return fetch(baseUrl + "feedback", {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            "Error: " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        throw err;
      }
    )
    .then(res => res.json())
    .then(res => dispatch(addFeedBack(res)))
    .catch(err => {
      console.log("POST a FeedBack: " + err.message);
      alert("Your Feedback could now be posted \n Error: " + err.message);
    });
};

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

// Leaders
export const addLeaders = leaders => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = errMess => ({
  type: ActionTypes.LEADER_FAILED,
  payload: errMess
});

// redux thunk action

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + "comments")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        throw new Error(err.message);
      }
    )
    .then(res => res.json())
    .then(comments => {
      dispatch(addComments(comments));
    })
    .catch(err => dispatch(commentsFailed(err.message)));
};

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading());
  return fetch(baseUrl + "promotions")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error: " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        throw new Error(err.message);
      }
    )
    .then(res => res.json())
    .then(promos => {
      dispatch(addPromos(promos));
    })
    .catch(err => {
      dispatch(promosFailed(err.message));
    });
};

export const fetchDishes = () => dispatch => {
  // inner function can receive dispatch() and getState()
  dispatch(dishesLoading());
  return fetch(baseUrl + "dishes")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        throw new Error(err.message);
      }
    )
    .then(res => res.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err.message)));
};

export const fetchLeaders = () => dispatch => {
  // inner function can receive dispatch() and getState()
  dispatch(leadersLoading());
  return fetch(baseUrl + "leaders")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        throw new Error(err.message);
      }
    )
    .then(res => res.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(err => dispatch(leadersFailed(err.message)));
};
