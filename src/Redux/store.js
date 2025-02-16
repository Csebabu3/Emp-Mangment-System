import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchLogin } from "./Sagas/loginsaga";
import authReducer from "./Reducers/loginreducer";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ auth: authReducer });

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchLogin);

export default store;
