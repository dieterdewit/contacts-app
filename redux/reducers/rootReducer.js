// Combine all Reducers
import { combineReducers } from 'redux';
import tabsReducer from "./tabsReducer";
import buttonReducer from "./buttonReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    selected: tabsReducer,
    button: buttonReducer,
    registered: registerReducer,
    logged: loginReducer
});

export default rootReducer;