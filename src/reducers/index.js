import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './userReducer';
import cityReducer from './cityReducer';
import criteriaReducer from './criteriaReducer';

const rootReducer = combineReducers({
  userId: userReducer,
  city: cityReducer,
  form: formReducer,
  criteria: criteriaReducer,
});

export default rootReducer;
