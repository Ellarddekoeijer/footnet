import {SERVER_URL} from '../includes.jsx';
export const GET_COACHES_BEGIN = 'GET_COACHES_BEGIN';
export const GET_COACHES_SUCCESS = 'GET_COACHES_SUCCESS';
export const GET_COACHES_FAILURE = 'GET_COACHES_FAILURE';

export const getAllCoaches = () => {
	return dispatch => {
		dispatch(getCoachesBegin());
	    fetch(SERVER_URL+'coach', {
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
		.then(function(coaches) {
			dispatch(getCoachesSuccess(coaches));
		})
		.catch((error) => dispatch(getCoachesFailure(error)))
	}
}

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const getCoachesBegin = (coaches) => {
	return {
		type: "GET_COACHES_BEGIN"
	}
}

export const getCoachesFailure = (error) => {
	return {
		type: "GET_COACHES_FAILURE",
		payload: error
	}
}


export const getCoachesSuccess = (coaches) => {
	return {
		type: "GET_COACHES_SUCCESS",
		payload: coaches
	}
}



