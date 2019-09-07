//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

//Bootstrap imports, importing them like this prevents the whole library from loading.
import Container from 'react-bootstrap/Container';

//Components & Containers
import ListHead from './../Components/playerList/ListHead.jsx';
import Controls from './../Components/playerList/Controls.jsx';
import List from './../Components/playerList/List.jsx';
import Search from './../Components/playerList/Search.jsx';

//Actions
import {hideModal, showModal} from "../actions/modalActions";
import {getAllPlayers, toggleForm, filterPlayers} from './../actions/playerListActions.js';
import {selectPlayer, selectPlayers, removePlayers} from './../actions/playerActions.js';

let selectionArray = [];

class PlayerList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			deleting: false,
			playerList: [],
			filter: "",
			filterResult: []
		}
	}

	deleteSelectedPlayers = () => {
		this.props.showModal(
			{
				"title": "Spelers verwijderen.",
				body: "Weet u zeker dat u de selectie wilt verwijderen?",
				buttons: [
					{
						className: "defaultButton",
						value: "Annuleren",
						callback: () => this.props.hideModal(),
					},
					{
						className: "defaultButton",
						value: "Verwijderen",
						callback: () => {
							this.props.removePlayers(this.props.playerSelection.userIDs);
							this.props.hideModal();
						}
					}
				]
			}
		);
	};

	handleSearch = event => {
		const value = event.target.value;
		this.setState({
			filter: value
		});

		this.filterPlayers(this.state.playerList, value);
	};

	filterPlayers = (players, filter) => {
		//Loop over all players currently in the redux state.
		const playerList = players.filter((player) => {
				//Loop over the player object.
				for (const key of Object.keys(player)) {
					//Check if player data resembles the filter.
					if(player[key].toString().toLowerCase().includes(filter.toLowerCase())) {
						//Return player once filter is found in their data.
						return player;
					}
				}
			}
		);

		console.log(playerList);

		this.setState({
			filterResult: playerList
		})
	};

	//Adds a player to the selection store
	addPlayerToSelection = (id) => {
		if (this.state.deleting){
			//Push id to selection array when id is not in it yet
			if(!selectionArray.includes(id)){
				selectionArray.push(id);
			} else {
				//Id already exists in the array, remove it
				var index = selectionArray.indexOf(id);
				if (index !== -1) selectionArray.splice(index, 1);
			}

			this.props.selectPlayers(selectionArray);
		}
	};

	//Toggles the list controls to allow player deletion.
	togglePlayerDeletion = () => {
		this.setState(prevState => ({
			deleting: !prevState.deleting
		}));

		this.playerDeletionExit();
	};


	playerDeletionExit = () => {
		if (this.state.deleting) {
			//Empty the selected players
		}
	};

	renderTitle(){
		//Depending on the state of the app, render a title to display.
		let title;

		if (this.state.deleting) {
			title = "Spelers verwijderen"
		} else if(this.props.showForm) {
			title = "Speler toevoegen"
		} else {
			title = "Team opstellen"
		}

		return title;
	}

	componentDidMount() {
		//Initial player fetch
		this.props.getAllPlayers();

		// //Fetch all players every second
		this.interval = setInterval(() => {
			this.props.getAllPlayers();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	static getDerivedStateFromProps(newProps, prevState){
		if(newProps.players !== prevState.playerList){
			return ({playerList: newProps.players })
		}
	}

  render() {
	let title = this.renderTitle();
	let playerList;
	if (this.state.filterResult.length > 0) {
		playerList = this.state.filterResult
	} else {
		playerList = this.state.playerList
	}
    return (
    	<Container>
	    	<ListHead
				deletePlayers={this.state.deleting}
				title={title}
			/>

	    	<Controls
				togglePlayerDeleteion={this.togglePlayerDeletion}
				delete={this.deleteSelectedPlayers}
				deletePlayers={this.state.deleting}
				toggleForm={this.props.toggleForm}
			/>

	    	<Search
				handleSearch={this.handleSearch}
				value={this.props.filter}
			/>

	    	<List
				deletePlayers={this.state.deleting}
				addPlayerToSelection={this.addPlayerToSelection}
				players={playerList}
			/>
    	</Container>
   	);
  }
}

function mapStateToProps(state) {
	return {
		players: state.playerList.players,
		playerSelection: state.player.playerSelection,
		showForm: state.playerList.showForm,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		getAllPlayers: () => getAllPlayers(dispatch),
		removePlayers: (players) => removePlayers(players),
		toggleForm: toggleForm,
		selectPlayer: selectPlayer,
		selectPlayers: selectPlayers,
		showModal: (modalData) => dispatch(showModal(modalData)),
		hideModal: (modalData) => dispatch(hideModal(modalData)),
		filterPlayers: (players, filter) => dispatch(filterPlayers(players, filter))
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PlayerList);