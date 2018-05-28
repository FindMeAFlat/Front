import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './userReducer';
import cityReducer from './cityReducer';

const rootReducer = combineReducers({
  userId: userReducer,
  city: cityReducer,
  form: formReducer,
});

export default rootReducer;
