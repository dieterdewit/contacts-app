// Combine all Reducers
import { combineReducers } from 'redux';
import tabsReducer from "./tabsReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    selected: tabsReducer,
    login: loginReducer
});

export default rootReducer;