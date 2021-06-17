import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Form, InputGroup, Button } from 'react-bootstrap'

export const TarjetasAsociadasModal = (props) => {
    const { modalidad } = props;
    const [ numberCard, setNumberCard ] = useState('');
    const [ expiritionNumber, setExpiritionNumber ] = useState('');

    const convertNumberCard = ()=>{

    }
    const handleNumberCardChange = (e)=>{
        let number = e.target.value.split('-').join("");
        if(number.length > 0){
            number = number.match(new RegExp('.{1,4}', 'g')).join("-");
        }
        setNumberCard(number);
    }
    const handleExpiritionChange = (e)=>{
        let number = e.target.value.split('/').join("");
        if(number.length > 0){
            number = number.match(new RegExp('.{1,2}', 'g')).join("/");
        }
        setExpiritionNumber(number);
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{`${modalidad} tarjeta`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mt-1 mb-3">
                    <Col className="text-center">
                        <img className="mr-2" src={`/images/visa.png`} alt="logo" height="30"/>
                        <img className="mr-2" src={`/images/american.png`} alt="logo" height="25"/>
                        <img className="mr-2" src={`/images/mastercard.png`} alt="logo" height="25"/>
                        <img className="mr-2" src={`/images/jcn.png`} alt="logo" height="25"/>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-1">
                        <Form.Group >
                            <Form.Label>Nombre completo del titular</Form.Label>
                            <Form.Control name="nombre" placeholder="Ej. Pablo Andrés Venegas Elizondo" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <Form.Group >
                            <Form.Label>Número de tarjeta (16 dígitos)</Form.Label>
                            <Form.Control value={numberCard} onChange={handleNumberCardChange} maxLength="19" name="num_tarjeta" placeholder="Ej. 5517-5401-3276-0815" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Fecha de vencimiento (me/añ)</Form.Label>
                            <Form.Control value={expiritionNumber} onChange={handleExpiritionChange} maxLength="5" name="fecha_vencimiento" placeholder="Ej. 03/22" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Código de seguridad</Form.Label>
                            <Form.Control type="password" maxLength="3" name="codigo_seguridad" placeholder="Ej. 613" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                {
                    modalidad === "Agregar" &&  <Row className="mt-1">
                                                    <Col md={6}>
                                                        <Form.Group >
                                                            <Form.Label>Saldo</Form.Label>
                                                            <InputGroup hasValidation>
                                                                <InputGroup.Prepend>
                                                                    <InputGroup.Text>$</InputGroup.Text>
                                                                </InputGroup.Prepend>
                                                                <Form.Control maxLength="5" name="saldo" placeholder="Ej. 1000000" />
                                                            </InputGroup>
                                                            <Form.Text className="text-muted"></Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                }
                <Row  className="mt-2">
                    <Col>
                        <p  className="mb-0 pb-0" style={{fontSize:"0.6rem"}}>
                            La información aquí proporcionada será utilizada con el fin de compras y ventas en la página, 
                            no se utilizará ni compartirán los datos con herramientas o sitios externos. 
                            Además la información sensible es incriptada a nivel de base de datos.
                        </p>
                    </Col>
                </Row>

                
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary">Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}
