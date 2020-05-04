import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import DocInfo from '../../components/doc/doc-info/doc-info.component';
import {Container} from 'reactstrap';
import {
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Label,
    Input,
    Col,
    Row
} from 'reactstrap';

class DocPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'content': ''
        }
    }

    componentDidMount() {
        console.log(JSON.parse(localStorage.getItem('curDocInfo')));
        this.setState({
            content: JSON.parse(localStorage.getItem('curDocInfo'))
        });
    }

    render() {
        return (
            <div>
                <div
                    style={{
                    backgroundImage: "url(" + require("../../assets/img/covid19.jpg") + ")"
                }}
                    className="page-header page-header-xs"
                    data-parallax={true}>
                    <div className="filter"/>
                    <div className="motto text-center">
                        <h1>
                            COVID-19 Document Infomation
                        </h1>
                    </div>
                </div>
                <Container>
                    <div className="mt-5">
                        <h3>{this.state.content.title}</h3>
                    </div>
                    <div className="mt-3">
                        <Row>
                            <Col sm='auto'>
                                <p>Authors: {this.state.content.authors}</p>
                            </Col>
                            <Col sm='auto'>
                                <p>Publish Time: {this.state.content.publishTime}</p>
                            </Col>
                            <Col>
                                <a href={this.state.content.url}>view original text</a>
                            </Col>
                        </Row>
                    </div>
                    <div className="mt-3">
                        {this.state.content.bodyText !== undefined && this.state.content.bodyText.length > 0 && this
                            .state
                            .content
                            .bodyText
                            .map(para => (
                                <div className='mt-1'>
                                    <p>{para}</p>
                                </div>
                            ))}
                    </div>

                </Container>

            </div>
        );
    }

}

export default withRouter(DocPage);