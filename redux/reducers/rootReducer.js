// Combine all Reducers
import { combineReducers } from 'redux';
import tabsReducer from "./tabsReducer";
import buttonReducer from "./buttonReducer";
import contactsReducer from "./contactsReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    selected: tabsReducer,
    button: buttonReducer,
    contacts: contactsReducer,
    registered: registerReducer,
    logged: loginReducer
});

export default rootReducer;