import React from 'react';
import Datetime from "react-datetime";
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
import {Button, Container} from "reactstrap";

/**
 * The Advanced search box component
 * @param {*} param0 
 */
const AdvancedSearchBox = ({
    handleAuthorsChange,
    handleTextChange,
    handlesubmit,
    handleDateSinceChange,
    handleEmbeddingChange,
    handleDateToChange,
    states
}) => (

    <div className="section">
        <Container>
            <Form onSubmit={handlesubmit}>
                <div>
                    <Row>
                        <Col sm="9">
                            <FormGroup>
                                <Label for='text' id='bootstrap-overrides'>
                                    Text Search
                                </Label>
                                <Input
                                    id='text'
                                    className='mr-1'
                                    name='queryText'
                                    type="text"
                                    value={states.queryText}
                                    onChange={handleTextChange}/>
                            </FormGroup>
                        </Col>

                        <Col sm="1"></Col>
                        <Col sm="auto">
                            <FormGroup>
                                <Button
                                    id='search-btn'
                                    className="btn-round mr-1 mt-4"
                                    color="primary"
                                    outline
                                    type="submit">
                                    Search
                                </Button>

                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className='mt-2'>
                    <Row>
                        <Col sm="3">{states.embedding === 'ON'
                                ? <div></div>
                                : <FormGroup>
                                    <Label for='author' id='bootstrap-overrides'>
                                        Author
                                    </Label>
                                    <Input
                                        id='author'
                                        className='mr-1'
                                        name='author'
                                        type="text"
                                        value={states.authors}
                                        onChange={handleAuthorsChange}/>
                                </FormGroup>
}
                        </Col>
                        <Col sm="3">{states.embedding === 'ON'
                                ? <div></div>
                                : <FormGroup>
                                    <Label id='bootstrap-overrides'>
                                        Date Since
                                    </Label>
                                    <InputGroup className="date" id="datetimepicker">

                                        <Datetime
                                            dateFormat="YYYY-MM-DD"
                                            timeFormat={false}
                                            onChange={handleDateSinceChange}
                                            value={states.dateSince}
                                            inputProps={{
                                            placeholder: ""
                                        }}/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <span className="glyphicon glyphicon-calendar">
                                                    <i aria-hidden={true} className="fa fa-calendar"/>
                                                </span>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
}

                        </Col>

                        <Col sm="3">
                            {states.embedding === 'ON'
                                ? <div></div>
                                : <FormGroup>
                                    <Label id='bootstrap-overrides'>
                                        Date to
                                    </Label>
                                    <InputGroup className="date" id="datetimepicker">
                                        <Datetime
                                            dateFormat="YYYY-MM-DD"
                                            timeFormat={false}
                                            onChange={handleDateToChange}
                                            value={states.dateTo}
                                            inputProps={{
                                            placeholder: ""
                                        }}/>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <span className="glyphicon glyphicon-calendar">
                                                    <i aria-hidden={true} className="fa fa-calendar"/>
                                                </span>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
}
                        </Col>
                        <Col sm="1"></Col>
                        <Col sm="auto">
                            <FormGroup>
                                <Label for="inputState">Embedding Search</Label>
                                <Input
                                    type="select"
                                    name="select"
                                    id="inputState"
                                    value={states.embedding}
                                    onChange={handleEmbeddingChange}>
                                    <option>OFF</option>
                                    <option>ON</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>

            </Form>
            <Col sm="5"></Col>

        </Container>
    </div>

);

export default AdvancedSearchBox;