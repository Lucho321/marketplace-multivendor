import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { TarjetasAsociadasModal } from './TarjetasAsociadasModal'

export const TarjetasAsociadasCard = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <Card className="bg-light">
            <Card.Body>
                <Row>
                    <Col md={1} className="text-left pt-1 mr-0">
                        <img className="mr-2" src="/images/payment.png" alt="logo" width="40rem"/>
                    </Col>
                    <Col md={3} className="text-left pl-0 ml-0">
                        <Row>
                            <Col>
                                <p  className="mb-0 pb-0"><strong>5518 9800 9316 0817</strong></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="mb-0 pb-0">Pablo A. Venegas Elizondo</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Row>
                            <Col>
                                <p  className="mb-0 pb-0">Vence: 03/22</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="mb-0 pb-0">CVV: ***</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <Row>
                            <Col className="pt-2">
                                <p  className="mb-0 pb-0">Saldo:<strong> $ 157 000</strong></p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={1}></Col>
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
            <TarjetasAsociadasModal modalidad="Editar" show={modalShow} onHide={() => setModalShow(false)}/>
        </Card>
    )
}
