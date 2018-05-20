import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { cityReducer } from "./cityReducer";

const rootReducer = combineReducers({
  userId: userReducer,
  city: cityReducer,
});

export default rootReducer;
