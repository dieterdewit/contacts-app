export const REGISTER = 'REGISTER';
import axios from 'axios';

export const register = new_user => dispatch =>
    axios({
        method: 'POST',
        url: `http://localhost:3100/api/auth/register`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: new_user
    }).then(response => dispatch({ type: 'REGISTER', payload: response.data }))
        .catch(err => console.log(err));