import { configureStore,combineReducers,applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
import offerReducer from "../reducers/offerReducer";
import travelReducer from "../reducers/travelReducer";
import uiReducer from "../reducers/uiReducer";

const reducers=combineReducers({
  auth:authReducer,
  travel:travelReducer,
  offer:offerReducer,
  ui:uiReducer
});

const store=configureStore({
  reducer:reducers,
  applyMiddleware:applyMiddleware(thunk)
});

export default store;