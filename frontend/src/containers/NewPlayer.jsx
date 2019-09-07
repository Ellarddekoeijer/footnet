//react
import React, { Component } from 'react';

//components import
import NewPlayerForm from '../Components/newPlayer/NewPlayerForm.jsx';

//redux
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

//bootstrap
import Alert from 'react-bootstrap/Alert';
import './../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

//actions
import { addNewPlayer} from './../actions/playerActions.js';
import {getAllCoaches} from './../actions/coachActions.js';
import {toggleForm} from './../actions/playerListActions.js';
import {getAllPlayers} from "./../actions/playerListActions";


class NewPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
			showMessage: false,
			message: null
        }
    }


	componentDidMount() {
		this.props.getAllCoaches();
	}

	toggleVisibility = () => {
        this.setState({isHidden: !this.state.isHidden})
    }


  	showMessage = (type, message) => {
    	let messageElement;

		//Check what type of message needs to be displayed
		switch(type) {
			case "success":
				messageElement = <Alert className="playerAlert" key="success" variant="success">
					{message}
				</Alert>;
				break;
			case "error":
				messageElement = <Alert className="playerAlert" key="error" variant="warning">
					{message}
				</Alert>;
				break;
			default:
				messageElement = <Alert className="playerAlert" key="info" variant="info">
					{message}
				</Alert>;
		}

		//Set state to display the message
		this.setState({
			showMessage: true,
			messageElement: messageElement
		});

		//Hide message after three secconds
		setTimeout(() => {
			this.setState({showMessage: false});
		}, 3000)
  	}

	render() {
		return (
			<div className="newPlayerContainer">
				<Row className="noMargin justify-content-md-center">
					<Col lg="8" md="8" className="newPlayer">
						<h3 className="bold">Speler toevoegen</h3>
						<h4>Voeg een speler toe aan je team/speleroverzicht.</h4>
						{ this.state.showMessage && this.state.messageElement }
						<div onClick={() => this.props.toggleForm()} className="closeForm"><FontAwesomeIcon icon={faTimes} /></div>

						<NewPlayerForm profileAvatar={this.props.avatar} loading={this.props.loading} coaches={this.props.coaches} showMessage={this.showMessage} newUser={this.props.addNewPlayer} />
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		coaches: state.coach.coaches,
		player: state.player.newPlayer.player,
		error: state.player.newPlayer.error,
		loading: state.player.newPlayer.loading,
        avatar: state.player.newPlayer.avatar,
		players: state.playerList.players,
		showForm: state.playerList.showForm
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		addNewPlayer: (data, showMessage) => addNewPlayer(data, showMessage, dispatch),
		getAllCoaches: () => getAllCoaches(dispatch),
		toggleForm: toggleForm,
		getAllPlayers: () => getAllPlayers(dispatch),
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewPlayer);
