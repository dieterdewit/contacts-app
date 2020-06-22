export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

import axios from 'axios';
import cookie from 'js-cookie';

export const login = user => dispatch =>
    axios({
        method: 'POST',
        url: `http://localhost:3100/api/auth/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: user
    })//.then(data => data.json())
        .then(response => {
            setCookie('token', response.data.token);
            setCookie('userId', response.data.userId)
            //Router.push('/');
            dispatch({ type: 'LOGIN', payload: response.data })
        })
        .catch(err => console.log(err));

export const logout = () => {
    return dispatch => {
        removeCookie('token');
        //Router.push('/');
        dispatch({ type: 'LOGOUT' });
    };
};

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1,
            path: '/'
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key, req) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
    return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};

export const checkServerSideCookie = ctx => {
    if (ctx.isServer) {
        if (ctx.req.headers.cookie) {
            return getCookie('token', ctx.req);
        }
    } else {
        return ctx.store.getState().logged.logged.token;
    }
};
