import React from 'react';
import Switch from "react-bootstrap-switch";
import ReactDatetime from "react-datetime";
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

const styles = {
    fontWeight: '100'
}

const AdvancedSearchBox = ({handelTextChange, handlesubmit, handleDateSinceChange, handleEmbeddingChange,handleDateToChange, states}) => (

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
                                    onChange={handelTextChange}/>
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
                        <Col sm="3">
                            <FormGroup>
                                <Label for='author' id='bootstrap-overrides'>
                                    Author
                                </Label>
                                <Input
                                    id='author'
                                    className='mr-1'
                                    name='author'
                                    type="text"
                                    value={states.author}
                                    onChange={handelTextChange}/>
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label id='bootstrap-overrides'>
                                    Date Since
                                </Label>
                                <InputGroup className="date" id="datetimepicker">

                                    <ReactDatetime
                                        onChange={handleDateSinceChange}
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
                        </Col>

                        <Col sm="3">
                            <FormGroup>
                                <Label id='bootstrap-overrides'>
                                    Date to
                                </Label>
                                <InputGroup className="date" id="datetimepicker">
                                    <ReactDatetime
                                        onChange={handleDateToChange}
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
                        </Col>
                        <Col sm="1"></Col>
                        <Col sm="auto">
                            <FormGroup>
                                <div id="switches">
                                    <Label for='sw' id='bootstrap-overrides'>
                                        Embedding
                                    </Label>
                                    <div className='mt-1'>
                                        <Switch id='sw' onChange={handleEmbeddingChange} defaultValue={false} onColor="primary" offColor="primary"/>
                                    </div>
                                </div>
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