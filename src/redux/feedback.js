import * as ActionTypes from "./ActionTypes";

// Feedback mutation
export const FeedBacks = (state = { errMess: null, feedBacks: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
      const feedback = action.payload;
      return {
        ...state,
        feedBacks: state.feedBacks.concat(feedback)
      };
    default:
      return state;
  }
};
