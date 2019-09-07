import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faEllipsisV, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Controls extends React.Component {
  render() {
  	//Depeding on the props given change the controls element
	  let controls;
	  if(!this.props.deletePlayers){
	  	controls = <Row>
			<Col><FontAwesomeIcon onClick={() => this.props.toggleForm()} className="listControl" icon={faPlus} /></Col>
			<Col><FontAwesomeIcon onClick={() => this.props.togglePlayerDeleteion()} className="listControl" icon={faMinus} /></Col>
			<Col><FontAwesomeIcon className="listControl" icon={faEllipsisV} /></Col>
		</Row>
	  } else {
	  	controls = <Row>
			<Col><FontAwesomeIcon className="listControl" onClick={() => this.props.delete()} icon={faTrashAlt} /></Col>
			<Col><FontAwesomeIcon onClick={() => this.props.togglePlayerDeleteion()} className="listControl" icon={faTimes} /></Col>
		</Row>
	  }
    return (
		<Row className="pb-2">
			<Col md="6" sm="12" className="listControllText">Spelers</Col>
			<Col md="6" sm="12">
				{controls}
			</Col>
		</Row>
    );
  }
}

export default Controls;