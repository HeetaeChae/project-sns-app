import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./modules";

//배포 모드일 때
const isProduction = process.env.NODE === "production";

const configureStore = () => {
  const middlewares = [];
  const enhancer = isProduction
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: !isProduction });

export default wrapper;
