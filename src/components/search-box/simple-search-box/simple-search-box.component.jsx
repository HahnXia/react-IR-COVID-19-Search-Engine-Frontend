import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Form, Input} from 'reactstrap';
import {Button} from "reactstrap";
// import './search-box.styles.css';

class SimpleSearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleChange = (event) => {
        this.setState({text: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this
            .props
            .history
            .push({
                pathname: '/query',
                search: '?text=' + this.state.text
            });
    }

    render() {
        return (
            <div>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder='What do you want to know about COVID-19?'/>
                    <br/>
                    <Button
                        className="btn-round mr-1"
                        color="neutral"
                        type="submit"
                        value="Submit"
                        outline>Submit</Button>
                    <Button
                        href='/query'
                        className="btn-round"
                        color="neutral"
                        type="button"
                        value="Submit"
                        outline>
                        Advanced Search</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(SimpleSearchBox);