import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import user from "./user";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
