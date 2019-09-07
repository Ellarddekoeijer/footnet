import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CropImage from '../../containers/CropImage.jsx';

export default class NewPlayerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			coach: "",
			positions: {},
			avatar: "",
			submitted: false
		}
	}

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	}

	handleSubmit = (evt) => {
		evt.preventDefault();
		let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            coach: this.state.coach,
            positions: this.state.positions,
            avatar: this.props.profileAvatar,
			shirtNumber: this.state.shirtNumber,
        };

		this.props.newUser(data, this.props.showMessage)
	}

	render() {
		//All coach options for selection
		let options = this.props.coaches.map((coach) => <option key={coach._id}>{coach.firstName} {coach.lastName}</option>);

		//Button for adding another player
		let button = <Button className="defaultButton" href="#">
			Nog een speler toevoegen
		</Button>
		return (
			<Form className="newPlayerForm" onSubmit={(evt) => this.handleSubmit(evt)}>
				<Form.Group>
					<label htmlFor="firstname">Voornaam</label>
				    <Form.Control id="firstname" required name="firstName" type="text" placeholder="Voornaam" onChange={(evt) => this.handleChange(evt)}/>
				</Form.Group>

				<Form.Group>
					<label htmlFor="lastname">Achternaam</label>
				    <Form.Control id="lastname" required name="lastName" type="text" placeholder="Achternaam" onChange={(evt) => this.handleChange(evt)}/>
				</Form.Group>

				<Form.Group>
					<label htmlFor="shirtnumber">Rugnummer</label>
					<Form.Control id="shirtnumber" required name="shirtNumber" type="number" placeholder="Rugnummer" onChange={(evt) => this.handleChange(evt)}/>
				</Form.Group>

				<Form.Group>
					<label htmlFor="coach">Trainer/coach</label>
					<Form.Control onChange={(evt) => this.handleChange(evt)} name="coach" as="select">
						<option id="coach" className="defaultOption" key="select">Trainer</option>
						{options}
					</Form.Control>
				</Form.Group>

				{/*Hide crop when checkmark clicked*/}
				{!this.state.isHidden && <CropImage toggle={this.toggleVisibility} maxWidth="50" maxHeight="50"/>}

				<Button disabled={this.state.submitted} className="defaultButton" type="submit">
					Voeg speler toe
				</Button>

				{/*If submitted display button*/}
				{this.state.submitted ? button : ""}

			</Form>
		);
	}
}
