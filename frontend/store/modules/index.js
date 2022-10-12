import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import post from "./post";
import comment from "./comment";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      return combineReducers({ user, post, comment })(state, action);
  }
};

export default rootReducer;
