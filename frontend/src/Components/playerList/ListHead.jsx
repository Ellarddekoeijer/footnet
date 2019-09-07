import React from 'react';
import logo from './../../images/FootNet-Logo-white.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ListHead extends React.Component {
  render() {
    return (
		<Row className="listHead justify-content-md-center">
			<Col md="4" sm="12"><img className="logo" src={logo} alt="FootNet logo"/></Col>
			<Col md="8" sm="12"><h4 className="listTitle">{this.props.title}</h4></Col>
		</Row>
    );
  }
}
export default ListHead;