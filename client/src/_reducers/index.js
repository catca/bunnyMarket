import { combineReducers } from 'redux';
import user from './user_reducer';
import modal from './modal_reducer';

const rootReducer = combineReducers({
    user,
    modal
});

export default rootReducer;