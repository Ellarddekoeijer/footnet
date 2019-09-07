import {
  GET_PLAYERS_BEGIN,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  TOGGLE_FORM,
  PLAYER_FILTER
} from './../actions/playerListActions.js';

const initialState = {
  players: [],
  loading: false,
  error: null,
  showForm: false
};

export default function playerReducer(state = initialState, action) {
  switch(action.type) {
    case GET_PLAYERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        players: action.payload
      };

    case GET_PLAYERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case TOGGLE_FORM:
      return {
        ...state,
        loading: false,
        showForm: !state.showForm
      };

    case PLAYER_FILTER:
      return {
        ...state,
        loading: false,
        players: action.payload
      };


    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

