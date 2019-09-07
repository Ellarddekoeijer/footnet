import {
  NEW_PLAYER_BEGIN,
  NEW_PLAYER_SUCCESS,
  NEW_PLAYER_FAILURE,
  PLAYER_AVATAR,
  SELECT_PLAYER,
  SELECT_PLAYERS,
  DELETE_PLAYER_BEGIN,
  DELETE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAILURE,
} from './../actions/playerActions.js';

const initialState = {
  newPlayer: {
    player: false,
    loading: false,
    error: null,
    avatar: null
  },
  playerSelection: {
    userID: null,
    multiple: false,
    userIDs: []
  },
  playerDelete: {
    loading: false,
    error: null
  }
};

export default function playerReducer(state = initialState, action) {
  switch(action.type) {
    case NEW_PLAYER_BEGIN:
      return {
        ...state,
        newPlayer: {
          avatar: null,
          loading: true,
          error: null
        }
      };

    case NEW_PLAYER_SUCCESS:
      return {
        ...state,
        newPlayer: {
          avatar: null,
          loading: false,
          player: true,
          error: null
        }
      };

    case NEW_PLAYER_FAILURE:
      return {
        ...state,
        newPlayer: {
          avatar: null,
          player: false,
          loading: false,
          error: action.payload
        }
      };

    case PLAYER_AVATAR:
      return {
        ...state,
        newPlayer: {
          avatar: action.payload,
          error: null,
          player: true,
        }
      };

    case SELECT_PLAYER:
      return {
        ...state,
        playerSelection: {
          userID: action.payload,
          multiple: false
        }
      };

    case SELECT_PLAYERS:
      return {
        ...state,
        playerSelection: {
          userIDs: action.payload,
          multiple: true
        }
      };

    case DELETE_PLAYER_BEGIN:
      return {
        ...state,
        playerDelete: {
          loading: true,
          error: null
        }
      };

    case DELETE_PLAYER_SUCCESS:
      return {
        ...state,
        playerDelete: {
          loading: false
        }
      };

    case DELETE_PLAYER_FAILURE:
      return {
        ...state,
        playerDelete: {
          loading: false,
          error: action.payload
        }
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}