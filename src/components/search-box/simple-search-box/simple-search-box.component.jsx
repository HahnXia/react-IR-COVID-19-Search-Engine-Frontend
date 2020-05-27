import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Form, Input} from 'reactstrap';
import {Button} from "reactstrap";
// import './search-box.styles.css';

/**
 * The search bar for the index page. It will automatically call the text query for the input and redirect to the query page
 */
class SimpleSearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    // Using localStorage to store the value for cross page value Initial all iterms
    componentDidMount() {
        localStorage.setItem('dateSince', '');
        localStorage.setItem('queryText', '');
        localStorage.setItem('dateTo', '');
        localStorage.setItem('embedding', 'OFF');
        localStorage.setItem('authors', []);
        localStorage.setItem('curPage', 0);
        localStorage.setItem('totalPage', -1);
    }

    // update the text state while inputing
    handleChange = (event) => {
        this.setState({text: event.target.value});
    }

    // redirected to the query page
    handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('queryText', this.state.text);

        this
            .props
            .history
            .push({pathname: '/query'});
    }

    render() {
        return (
            <div>
                <br/>
                <Form>
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
                        onClick={this.handleSubmit}
                        outline>Submit</Button>
                    <Button
                        className="btn-round"
                        color="neutral"
                        type="button"
                        value="Submit"
                        onClick={this.handleSubmit}
                        outline>
                        Advanced Search</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(SimpleSearchBox);