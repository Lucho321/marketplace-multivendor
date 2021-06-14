import React, { useState } from 'react'
import { Col, Row, Form, Button, InputGroup } from 'react-bootstrap'


export const RedSocialCard = () => {

    const [ socialRed, setSocialRed ] = useState('');
    const [ isSocialRedChanged, setSocialRedChanged ] = useState(false);
    const socialInputChange = (e)=>{
        setSocialRed(e.target.value);
        setSocialRedChanged(true);
    }



    return (
        <Row>
            <Col md={1} className="">
                <img className="mr-2" src="/images/facebook.png" alt="logo" width="36"/>
            </Col>
            <Col md={9}>
                <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">facebook.com/</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            aria-describedby="inputGroupPrepend"
                            value= { socialRed }
                            onChange = {socialInputChange}
                        />
                    </InputGroup>
                </Form.Group>
            </Col>
            <Col md={1} className="pt-1">
                {
                    isSocialRedChanged &&
                                            <img style={{cursor:"pointer", marginRight:"10px"}} src="/images/save.png" alt="logo" width="20"/>
                }               
            </Col>
        </Row>
    )
}
