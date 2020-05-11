import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Row} from 'reactstrap';

const DocSnapshot = (props) => {
    // console.log('here: '); console.log(props.info);
    const docInfo = props.embedding === 'ON'
        ? props.info.covidMeta
        : props.info;
    // console.log(docInfo);

    let authors = '';
    if (docInfo.authors !== undefined && docInfo.authors !== null && docInfo.authors !== undefined && docInfo.authors.length > 0) {
        authors = docInfo.authors[0];
        for (let i = 1; i < docInfo.authors.length && i < 3; i++) {
            authors = authors + ', ' + docInfo.authors[i];
        }
        if (docInfo.authors.length >= 3) {
            authors = authors + '...';
        } else {
            authors = authors + '.';
        }
    } else {
        authors = 'Unknown';
    }

    const snapshootText = props.embedding === 'ON'
        ? <p>Paragraph: {props.info.sentence.text}</p>
        : docInfo.textAbstract !== undefined && docInfo.textAbstract !== null && docInfo.textAbstract.length > 0 && docInfo.textAbstract[0].length > 0
            ? <p>Abstract: {docInfo
                        .textAbstract[0]
                        .substring(0, 800)}</p>
            : (docInfo.bodyText !== undefined && docInfo.bodyText !== null && docInfo.bodyText.length > 0 && docInfo.bodyText[0].length > 0
                ? <p>Body: {props
                            .info
                            .bodyText[0]
                            .substring(0, 800)}</p>
                : <p>No text</p>);

    const score = props.embedding === 'OFF'
        ? <Col sm='auto'>
                <p>Score: {docInfo.score}</p>
            </Col>
        : <Col sm='auto'>
            <p>Score: {props.info.sentence.score}</p>
        </Col>;

    const url = docInfo.url !== undefined && docInfo.url.length > 0
        ? <Col sm='auto'>
                <a href={docInfo.url}>view original text</a>
            </Col>
        : <div></div>;

    return (
        <div>
            <div className="mt-4">
                <Link
                    style={{
                    color: '#403e3e',
                    fontSize: 21
                }}
                    onClick={e => props.handleRedirectDocInfo(e, props.ID)}>{docInfo.title !== undefined && docInfo.title !== null && docInfo.title.length > 0
                        ? docInfo.title
                        : 'NO TITLE FOR THIS ARTICLE'}</Link>
            </div>

            <Row className="mt-1">
                <Col sm='auto'>
                    <p>Authors: {authors}</p>
                </Col>
                <Col sm='auto'>
                    <p>Publish Time: {docInfo.publishTime}</p>
                </Col>

                {score}
                {url}

            </Row>
            {snapshootText}
        </div>
    )
};

export default DocSnapshot;
