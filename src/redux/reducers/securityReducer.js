export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REST_PASS_SUCCESS = "REST_PASS_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const GO_TO_FORGOT_PASS = "GO_TO_FORGOT_PASS";
export const BACK_TO_LOGIN = "BACK_TO_LOGIN";
export const STAR_LOADING = "STAR_LOADING";
export const END_LOADING = "END_LOADING";

const initialState = {
    token: {},
    isLogin: false,
    user: {},
    forgot: false,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                user: action.user,
                isLogin: true
            }
        case REST_PASS_SUCCESS:
            return {
                ...state,
                user: {...state.user, nouveauCompte: false},
                loading: false
            }
        case CHECK_LOGIN:
            return {
                ...state,
                isLogin: true,
                loading: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                user: {},
                isLogin: false,
                loading: false
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isLogin: false,
                loading: false
            }
        case BACK_TO_LOGIN:
            return {
                ...state,
                forgot: false
            }
        case GO_TO_FORGOT_PASS:
            return {
                ...state,
                forgot: true
            }
        case STAR_LOADING:
            return {
                ...state,
                loading: true
            }
        case END_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}