//Action Types
export const LOGIN_SCREEN = "LOGIN_SCREEN";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

//Action Creator
export const loginScreen = () => ({
    type: LOGIN_SCREEN
});

export const success = () => ({
    type: SUCCESS
})

export const error = () => ({
    type: ERROR
})