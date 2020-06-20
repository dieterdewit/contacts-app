import { CONTACTS } from '../actions/contactsAction';

const contactsReducer = (state = { contacts: '' }, action) => {
    switch (action.type) {
        case 'CONTACTS':
            return { ...state, contacts: action.payload };
        default:
            return state;
    }
};

export default contactsReducer;