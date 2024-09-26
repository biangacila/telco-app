
import otherReducer from "./reducer";

import {combineReducers} from 'redux';


const rootReducer =combineReducers({
    core:otherReducer,
});

export default rootReducer;
