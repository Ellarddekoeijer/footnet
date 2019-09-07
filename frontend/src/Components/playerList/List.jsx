import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SERVER_URL} from '../../includes.jsx';

class List extends React.Component {

  render() {
  	let players = this.props.players.map((player) =>
        <ListItem
            key={player._id}
            firstName={player.firstName}
            lastName={player.lastName}
            playerId={player._id}
            avatar={player.avatar}
            shirtNumber={player.shirtNumber}
            addPlayerToSelection={this.props.addPlayerToSelection}
            deletePlayers={this.props.deletePlayers}
        >
        </ListItem>);
    return (
		<Row id="list">
			{players}
		</Row>
    );
  }
}


class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
    }

    handleClick = (playerId) => {
        //Only allow to be selected when deletePlayers is true
        if (this.props.deletePlayers){
            this.setState(prevState => ({
                selected: !prevState.selected
            }));

            this.props.addPlayerToSelection(playerId)
        }
    }
  render() {
    return (
        <Col md="12" className={"listItem fade show pt-3 pb-3 " + (this.state.selected && this.props.deletePlayers ? "selected" : "")} onClick={() => { this.handleClick(this.props.playerId) }}>
            <Row className="justify-content-md-center">
                <Col md="2" className="avatar pr-0">
                    <img src={SERVER_URL + this.props.avatar} alt="player avatar" />
                </Col>
                <Col md="9" className="listUserInfo">
                    <Col md="12" className="font-weight-bold">
                        {this.props.firstName} {this.props.lastName}
                    </Col>
                    <Col md="12" >
                        (Aanvaller, verdediger)
                    </Col>
                </Col>
            </Row>
        </Col>
    );
  }
}

export default List;