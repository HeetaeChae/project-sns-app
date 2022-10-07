import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./modules/index";
//사가 추가
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index";

//배포 모드일 때
const isProduction = process.env.NODE === "production";

const configureStore = () => {
  //사가 불러오기
  const sagaMiddleware = createSagaMiddleware();
  //미들웨어에 사가 추가
  const middlewares = [sagaMiddleware];
  const enhancer = isProduction
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  //디스패치시 필요함.
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: !isProduction });

export default wrapper;
