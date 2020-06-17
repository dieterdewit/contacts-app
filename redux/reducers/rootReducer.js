// Combine all Reducers
import { combineReducers } from 'redux';
import tabsReducer from "./tabsReducer";

const rootReducer = combineReducers({
    selected: tabsReducer
});

export default rootReducer;