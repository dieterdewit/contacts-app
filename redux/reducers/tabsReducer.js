// Initialize State
import {PAGE1_TAB, PAGE2_TAB, RESET_TABS} from '../actions/tabsActions';

const tabsReducer = (state = { value: -1 }, action) => {
    switch (action.type) {
        case RESET_TABS:
            return { ...state, value: -1 }
        case PAGE1_TAB:
            return { ...state, value: 0 };
        case PAGE2_TAB:
            return { ...state, value: 1 };
        default:
            return {...state};
    }
};

export default tabsReducer;

