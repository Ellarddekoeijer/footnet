//Bootstrap imports, importing them like this prevents the whole library from loading.
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//React
import React from "react";

//Redux
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

//Actions
import {hideModal} from "../actions/modalActions";

function Confirmation(props) {
    const handleClose = () => {
        props.hideModal();
    };

    let buttons = props.buttons.map((button, index) => {
            return <Button key={index} className={button.className} onClick={(e) => button.callback(e)}>
                {button.value}
            </Button>
    }

    );
    return (
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.message}</Modal.Body>
                <Modal.Footer>
                    {buttons}
                </Modal.Footer>
            </Modal>
    );
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        hideModal: (modalData) => dispatch(hideModal(modalData))
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(Confirmation);
