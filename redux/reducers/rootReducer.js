// Combine all Reducers
import { combineReducers } from 'redux';
import tabsReducer from "./tabsReducer";
import buttonReducer from "./buttonReducer";
import contactsReducer from "./contactsReducer";

const rootReducer = combineReducers({
    selected: tabsReducer,
    button: buttonReducer,
    contacts: contactsReducer
});

export default rootReducer;