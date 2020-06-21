// Initialize State
import { LOGIN_SCREEN, SUCCESS, ERROR } from '../actions/buttonActions';

const buttonReducer = (state = { value: false, stats: false, err: false }, action) => {
    switch (action.type) {
        case LOGIN_SCREEN:
            return { ...state, value: !state.value }
        case SUCCESS:
            return { ...state, stats: !state.stats }
        case ERROR:
            return { ...state, err: !state.err }
        default:
            return {...state};
    }
};

export default buttonReducer;

