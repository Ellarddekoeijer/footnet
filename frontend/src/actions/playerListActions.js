import {SERVER_URL} from '../includes.jsx';
export const GET_PLAYERS_BEGIN = 'GET_PLAYERS_BEGIN';
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS';
export const GET_PLAYERS_FAILURE = 'GET_PLAYERS_FAILURE';
export const TOGGLE_FORM = 'TOGGLE_FORM';
export const PLAYER_FILTER = 'PLAYER_FILTER';


export const getAllPlayers = () => {
	return dispatch => {
		dispatch(getPlayersBegin());
	    fetch(SERVER_URL + 'player', {
	    	method: 'GET', // *GET, POST, PUT, DELETE, etc.
	        mode: 'cors', // no-cors, cors, *same-origin
	        headers: {
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        }
	    })
	    .then(handleErrors)
	  	.then(function(response) {
	    	return response.json();
		})
		.then(function(players) {
			dispatch(getPlayersSuccess(players));
		})
		.catch((error) => dispatch(getPlayersFailure(error)))
	}
}

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const getPlayersBegin = () => {
	return {
		type: "GET_PLAYERS_BEGIN"
	}
}

export const getPlayersFailure = (error) => {
	return {
		type: "GET_PLAYERS_FAILURE",
		payload: error
	}
}


export const getPlayersSuccess = (players) => {
	return {
		type: "GET_PLAYERS_SUCCESS",
		payload: players
	}
}

export const toggleForm = () => {
	return {
		type: "TOGGLE_FORM"
	}
}

export const filterPlayers = (players, filter) => {
	//Loop over all players currently in the redux state.
	const playerList = players.filter((player) => {
			//Loop over the player object.
			for (const key of Object.keys(player)) {
				//Check if player data resembles the filter.
				if(player[key].toString().includes(filter)) {
					//Return player once filter is found in their data.
					return player;
				}
			}
		}
	);
	console.log(playerList);

	return {
		type: "PLAYER_FILTER",
		payload: playerList
	}
}


