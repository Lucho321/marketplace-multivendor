import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { DireccionesEnvioModal } from './DireccionesEnvioModal';

export const DireccionesEnvioCard = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <Card className="bg-light">
            <Card.Body>
                <Row>
                    <Col md={1} className="text-left pt-1 mr-0">
                        <img className="mr-2" src="/images/gps.png" alt="logo" width="50rem"/>
                    </Col>
                    <Col md={9} className="text-left pl-0 ml-0">
                        <Row>
                            <Col>
                                <p  className="mb-0 pb-0"><strong>Detalle: </strong>Barrio Cooperativa, contiguo al Colegio Calderón Guardia, a la par de la panadería Dulce Oasis, puerta de madera con águila de vidrio</p>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6} style={{fontSize:"0.8rem"}}>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0"><strong>Provincia: </strong>San José</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0"><strong>País: </strong>Costa Rica</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} style={{fontSize:"0.8rem"}}>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0"><strong>Código postal: </strong>11901</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0"><strong>Número casillero: </strong>CCR-1510</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2} className="text-right pt-1">
                        <Row>
                            <Col className="mr-2 pr-0">
                                <Button variant="outline-info" onClick={() => setModalShow(true)}>
                                    <small>Editar</small>
                                </Button>
                            </Col>
                            <Col className="ml-0 pl-0">
                                <Button variant="outline-danger">
                                    <small>Eliminar</small>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
            <DireccionesEnvioModal modalidad="Editar" show={modalShow} onHide={() => setModalShow(false)}/>
        </Card>
    )
}
