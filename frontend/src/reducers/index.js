import { combineReducers } from 'redux';
import playerReducer from './playerReducer.js';
import coachReducer from './coachReducer.js';
import playerListReducer from './playerListReducer.js';
import modalReducer from './modalReducer.js';

const allReducers = combineReducers({
	player: playerReducer,
	coach: coachReducer,
	playerList: playerListReducer,
	modal: modalReducer
});

export default allReducers;