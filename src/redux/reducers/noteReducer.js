export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const NOTE_LOADING = "NOTE_LOADING";
export const NOTE_STOP_LOADING = "NOTE_STOP_LOADING";

const initialState = {
    note: {},
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case NOTE_LOADING:
            return {
                ...state,
                loading: true
            }
        case NOTE_STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        case ADD_NOTE:
            return {
                ...state,
                note: action.payload,
                loading: false
            }
        case DELETE_NOTE:
            return {
                ...state,
                note: {},
                loading: false
            }
        default:
            return state;

    }
}