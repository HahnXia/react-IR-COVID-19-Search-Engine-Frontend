import React from 'react';
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

const DocSnapshot = (props) => {

    return (
        <div>

            <h3 className="mb-1" onClick={e => props.handleRedirectDocInfo(e, props.info.id)}>{props.info.title}</h3>
            <Row>
                <Col sm='auto'>
                    <p>Authors: {props.info.authors.length > 4
                            ? (props.info.authors.slice(0, 3) + ' ...')
                            : props.info.authors}</p>
                </Col>
                <Col sm='auto'>
                    <p>Publish Time: {props.info.publishTime}</p>
                </Col>
                <Col sm='auto'>
                    <p>Score: {props.info.score}</p>
                </Col>
                {props.info.url.length > 0 && <Col sm='auto'>
                    <a href={props.info.url}>view original text</a>
                </Col>
}
            </Row>

            {props.info.textAbstract !== null && props.info.textAbstract.length > 0 && props.info.textAbstract[0].length > 0
                ? <p>Abstract: {props
                            .info
                            .textAbstract[0]
                            .substring(0, 800)}</p>
                : (props.info.bodyText !== null && props.info.bodyText.length > 0 && props.info.bodyText[0].length > 0
                    ? <p>Body: {props
                                .info
                                .bodyText[0]
                                .substring(0, 800)}</p>
                    : <p>No text</p>)
}

        </div>
    )
};

export default DocSnapshot;
