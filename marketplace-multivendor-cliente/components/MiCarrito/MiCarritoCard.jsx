import React, { useState } from 'react'
import { Button, Card, Col, Row, Image, Form } from 'react-bootstrap'

export const MiCarritoCard = () => {
    return (
        <Card className="bg-light">
            <Card.Body>
                <Row>
                    <Col md={1} className="text-left pt-1 mr-0">
                        <Image src="/images/ejemploProducto.jpg" style={{width:"50px", height:"41px"}} roundedCircle />
                    </Col>
                    <Col md={5} className="text-left pl-0 ml-0">
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col className="mr-0 pr-0" style={{fontSize:"0.9rem"}}>
                                        <p  className="mb-0 pb-0 mr-0 pr-0"><strong>Botella Capitán América</strong></p>
                                    </Col>
                                </Row>
                                
                            </Col>
                        </Row>
                        <Row className="mt-0">
                            <Col md={12} style={{fontSize:"0.65rem"}}>
                                <Row>
                                    <Col>
                                        <a className="a_listadeseos_card">
                                            <p className="mb-0 pb-0">Tienda: Universal</p>
                                        </a>
                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-0">
                            <Col md={12} style={{fontSize:"0.65rem"}}>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0">Disponibles en tienda: 15 unidades</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} >
                        <Row>
                            <Col className="mt-2 pt-1 mr-0 pr-0" style={{fontSize:"0.8rem"}}>
                                <strong>Precio: $6.99</strong>
                            </Col>
                            <Col className=" ml-0 pl-0 mt-2" style={{fontSize:"0.7rem"}}>
                                <Form inline>
                                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                        Cantidad:
                                    </Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        className=""
                                        id="inlineFormCustomSelectPref"
                                        style={{width:"50%"}}
                                    ></Form.Control>
                                </Form>
                            </Col>
                        </Row>
                        
                        
                    </Col>
                    <Col md={2} className="text-right pt-1">
                        <Row>
                            <Col className="ml-0 pl-0">
                                <Button variant="outline-danger">
                                    <small>Eliminar</small>
                                </Button>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
