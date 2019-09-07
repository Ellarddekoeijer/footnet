import React, {Component} from 'react';

//Bootstrap imports, importing them like this prevents the whole library from loading.
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class Search extends Component {
    render() {
        return (
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm" >Zoeken</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" value={this.props.value} onChange={(e) => this.props.handleSearch(e)} aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
        );
    }
}

export default Search;