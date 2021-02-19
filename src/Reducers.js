import { combineReducers} from 'redux';
import userReducers from './reducers/UserReducers';

export default combineReducers({
    user:userReducers
});