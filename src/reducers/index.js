import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { cityReducer } from './cityReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  userId: userReducer,
  city: cityReducer,
  form: formReducer,
});

export default rootReducer;
