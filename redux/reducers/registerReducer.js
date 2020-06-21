import { REGISTER } from '../actions/registerActons';

const registerReducer = (state = { registered: '' }, action) => {
    switch (action.type) {
        case 'REGISTER':
            return { ...state, registered: action.payload };
        default:
            return state;
    }
};

export default registerReducer;