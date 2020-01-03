import * as ActionTypes from "./ActionTypes";

// Comment mutation
export const Comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      const comment = action.payload;
      return {
        ...state,
        comments: state.comments.concat(comment)
      };
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        errMess: null,
        comments: action.payload
      };
    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        errMess: action.payload
      };
    default:
      return state;
  }
};
