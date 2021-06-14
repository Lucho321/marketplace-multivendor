import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Form, InputGroup, Button } from 'react-bootstrap'
import Select from 'react-select';

export const RedSocialModal = (props) => {

    const [ socialRed, setSocialRed ] = useState('facebook');
    const [ socialRedPrepend, setSocialRedPrepend ] = useState('facebook.com/');
    const [ isSocialRedChanged, setSocialRedChanged ] = useState(false);
    const [ socialRedInput, setSocialRedInput ] = useState('');

    const socialInputChange = (e)=>{
        setSocialRedInput(e.target.value);
        setSocialRedChanged(true);
    }


    const getDefaultValue = ()=>{
        return redSocialOptions.find(op=>op.value===socialRed);
    }

    const handleSocialRed = (e)=>{
        let rs = e.value;
        setSocialRed(rs);
        if(rs==="tiktok"){
            setSocialRedPrepend('tiktok.com/@');
        }else if(rs==="twitch"){
            setSocialRedPrepend('twitch.tv/');
        }else{
            setSocialRedPrepend(`${rs}.com/`);
        }

    }

    const redSocialOptions = [
        { value: 'facebook', label: 'Facebook'},
        { value: 'instagram', label: 'Instagram'},
        { value: 'twitter', label: 'Twitter'},
        { value: 'reddit', label: 'Reddit'},
        { value: 'tiktok', label: 'Tiktok'},
        { value: 'youtube', label: 'Youtube'},
        { value: 'twitch', label: 'Twitch'},
    ]

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Red Social</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={getDefaultValue()}
                            isSearchable={false}
                            name="color"
                            options={redSocialOptions}
                            onChange={handleSocialRed}
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={1} className="text-right">
                        <img className="mr-2" src={`/images/${socialRed}.png`} alt="logo" width="36"/>
                    </Col>
                    <Col md={11} >
                        <Form.Group controlId="validationCustomUsername">
                            <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">{socialRedPrepend}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    onChange = { socialInputChange }
                                    value = { socialRedInput }
                                    placeholder="Escribe aquí tu usuario"
                                    autoComplete="off"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" disabled={!socialRedInput || /^\s*$/.test(socialRedInput)}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}
