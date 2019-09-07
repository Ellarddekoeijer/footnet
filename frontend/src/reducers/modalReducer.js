import {
    SHOW_MODAL,
    HIDE_MODAL,
} from './../actions/modalActions.js';

const initialState = {
    show: false,
    title: "Modal title",
    body: "Modal body",
    buttons: [
         {
            className: "defaultButton",
            value: "Annuleren",
            callback: () => alert("Empty")
        },
         {
            className: "defaultButton",
                value: "Akkoord",
                callback: () => alert("Empty")
        }
    ]
};

export default function modalReducer(state = initialState, action) {
    switch(action.type) {

        case SHOW_MODAL:
            return {
                ...state,
                show: true,
                title: action.payload.title,
                body: action.payload.body,
                buttons: action.payload.buttons
            };

        case HIDE_MODAL:
            return {
                ...state,
                show: false,
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}