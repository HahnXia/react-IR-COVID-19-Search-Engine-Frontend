import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import {Col, Row} from 'reactstrap';

/**
 * The doc page shows the detailed doc infomation 
 */
class DocPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'content': ''
        }
    }

    // fetch and parse the doc info from the localStorage which is set inside the query page
    componentDidMount() {
        console.log(JSON.parse(localStorage.getItem('curDocInfo')));
        this.setState({
            content: JSON.parse(localStorage.getItem('curDocInfo'))
        });
    }

    render() {
        let authors = '';
        if (this.state.content.authors !== null && this.state.content.authors !== undefined && this.state.content.authors.length > 0) {
            authors = this.state.content.authors[0];
            for (let i = 1; i < this.state.content.authors.length; i++) {
                authors = authors + ', ' + this.state.content.authors[i];
            }
            authors = authors + '.';
        } else {
            authors = 'Unknown';
        }

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
                    <br></br>
                    <div className="mt-5">
                        <h3>{this.state.content.title !== undefined && this.state.content.title !== null && this.state.content.title.length > 0
                                ? this.state.content.title
                                : 'NO TITLE FOR THIS ARTICLE'}</h3>
                    </div>
                    <div className="mt-3">
                        <Row>
                            <Col sm='auto'>
                                <p>Authors: {authors}</p>
                            </Col>
                            <Col sm='auto'>
                                <p>Publish Time: {this.state.content.publishTime}</p>
                            </Col>
                            <Col>
                                <a href={this.state.content.url}>view original text</a>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        {this.state.content.textAbstract !== undefined && this.state.content.textAbstract.length > 0 && <p>Abstract: {this.state.content.textAbstract}</p>}
                    </div>
                    <div className="mt-3">
                        {this.state.content.bodyText !== null && this.state.content.bodyText !== undefined && this.state.content.bodyText.length > 0 && this
                            .state
                            .content
                            .bodyText
                            .map((para, index) => (
                                <div key={index} className='mt-1'>
                                    <p>{para}</p>
                                </div>
                            ))}
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </Container>

            </div>
        );
    }

}

export default withRouter(DocPage);