// Initialize State
import { LOGIN_SCREEN } from '../actions/buttonActions';

const buttonReducer = (state = { value: false }, action) => {
    switch (action.type) {
        case LOGIN_SCREEN:
            return { ...state, value: !state.value }
        default:
            return {...state};
    }
};

export default buttonReducer;

