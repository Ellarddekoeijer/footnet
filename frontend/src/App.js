//React
import React from 'react';

//CSS
import './App.css';

//Redux
import { connect } from 'react-redux';

//Actions

//Bootstrap imports, importing them like this prevents the whole library from loading.
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

//Components & Containers
import NewPlayer from './containers/NewPlayer.jsx';
import PlayerList from './containers/PlayerList.jsx';
import Confirmation from './Components/Confirmation.jsx';

class App extends React.Component {
  	render() {
	    return (
	      <Container fluid="true" className="mainContainer">
			  <Confirmation
				  show={this.props.modal.show}
				  title={this.props.modal.title}
				  message={this.props.modal.body}
				  buttons={this.props.modal.buttons}
			  />
	      	<Row className="mr-0">
	      		<Col lg="3" md="4" className="playerList pr-0">
	      			<PlayerList />
	      		</Col>
	      		<Col lg="9" md="8" className="field pl-0">

	      		</Col>
	      	</Row>
	      
	      {this.props.showForm && <NewPlayer />}
	    </Container>
	    );
  	}
}

function mapStateToProps(state) {
	return {
		showForm: state.playerList.showForm,
		modal: state.modal
	};
}


export default connect(mapStateToProps)(App);
