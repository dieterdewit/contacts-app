import { LOGIN, LOGOUT } from '../actions/loginActions';

const loginReducer = (state = { logged: '' }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, logged: action.payload };
        case 'LOGOUT':
            return { logged: '' };
        default:
            return state;
    }
};

export default loginReducer;