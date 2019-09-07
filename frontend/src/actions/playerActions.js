import {SERVER_URL} from '../includes.jsx';
export const NEW_PLAYER_BEGIN = 'NEW_PLAYER_BEGIN';
export const NEW_PLAYER_FAILURE = 'NEW_PLAYER_FAILURE';
export const NEW_PLAYER_SUCCESS = 'NEW_PLAYER_SUCCESS';
export const PLAYER_AVATAR = "PLAYER_AVATAR";
export const SELECT_PLAYER = "SELECT_PLAYER";
export const SELECT_PLAYERS = "SELECT_PLAYERS";
export const DELETE_PLAYER_BEGIN = 'DELETE_PLAYER_BEGIN';
export const DELETE_PLAYER_FAILURE = 'DELETE_PLAYER_FAILURE';
export const DELETE_PLAYER_SUCCESS = 'DELETE_PLAYER_SUCCESS';

export const addNewPlayer = (data, showMessage) => {
	console.log(showMessage);
	const formData = createFormData(data);
	return dispatch => {
		dispatch(newPlayerBegin());
	    fetch(SERVER_URL + 'user/new', {
	    	method: 'POST', // *GET, POST, PUT, DELETE, etc.
	        mode: 'cors', // no-cors, cors, *same-origin
	        body: formData
	    })
	    .then(handleErrors)
	  	.then(function(response) {
	    	return response.json();
		})
		.then(function(myJson) {
			dispatch(newPlayerSuccess(myJson));
			showMessage("success", "Speler is toegevoegd!");
		})
		.catch((error) => {
			dispatch(newPlayerFailure(error))})
			showMessage("error", "Er ging iets mis, probeer het nog eens");
	}
}

export const removePlayers = (players) => {
	return dispatch => {
		dispatch(deletePlayersBegin());
		fetch(SERVER_URL + 'user/delete', {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			mode: 'cors', // no-cors, cors, *same-origin
			body: JSON.stringify({"userList": players})
		})
			.then(handleErrors)
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				dispatch(deletePlayersSuccess());
			})
			.catch((error) => {
				dispatch(deletePlayersFailure(error))})
	}
}

const createFormData = (data) => {
	let objectNames = Object.getOwnPropertyNames(data);
	var formData = new FormData();
	formData.append(objectNames[0], data.firstName);
	formData.append(objectNames[1], data.lastName);
	formData.append(objectNames[2], data.coach);
	formData.append(objectNames[3], data.positions);

	formData.append(objectNames[4], data.avatar);
	formData.append(objectNames[5], data.shirtNumber);

	return formData;
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

export const newPlayerBegin = () => {
	return {
		type: "NEW_PLAYER_BEGIN"
	}
}

export const newPlayerFailure = (error) => {
	return {
		type: "NEW_PLAYER_FAILURE",
		payload: error
	}
}


export const newPlayerSuccess = (player) => {
	return {
		type: "NEW_PLAYER_SUCCESS",
		payload: player
	}
}

export const playerAvatar = (avatar) => {
	return {
		type: "PLAYER_AVATAR",
		payload: avatar
	}
}

export const selectPlayer = (id) => {
	return dispatch => {
		dispatch({
			type: "SELECT_PLAYER",
			payload: id
		});
	}
}

export const selectPlayers = (ids) => {
	return dispatch => {
		dispatch({
			type: "SELECT_PLAYERS",
			payload: ids
		});
	}
}

export const deletePlayersBegin = () => {
	return {
		type: "DELETE_PLAYER_BEGIN"
	}
}

export const deletePlayersFailure = (error) => {
	return {
		type: "DELETE_PLAYER_FAILURE",
		payload: error
	}
}


export const deletePlayersSuccess = () => {
	return {
		type: "DELETE_PLAYER_SUCCESS"
	}
}



