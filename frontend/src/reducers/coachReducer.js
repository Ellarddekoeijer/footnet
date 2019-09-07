import {
  GET_COACHES_BEGIN,
  GET_COACHES_SUCCESS,
  GET_COACHES_FAILURE
} from './../actions/coachActions.js';

const initialState = {
  coaches: [],
  loading: false,
  error: null
};

export default function coachReducer(state = initialState, action) {
  switch(action.type) {

    case GET_COACHES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_COACHES_SUCCESS:
      return {
        ...state,
        loading: false,
        coaches: action.payload
      };

    case GET_COACHES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}