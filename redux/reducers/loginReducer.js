// Initialize State
import { LOGIN_SCREEN } from '../actions/loginActions';

const loginReducer = (state = { value: false }, action) => {
    switch (action.type) {
        case LOGIN_SCREEN:
            return { ...state, value: !state.value }
        default:
            return {...state};
    }
};

export default loginReducer;

