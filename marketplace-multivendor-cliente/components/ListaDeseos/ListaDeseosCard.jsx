import React, { useState } from 'react'
import { Button, Card, Col, Row, Image } from 'react-bootstrap'

export const ListaDeseosCard = ({modalidad}) => {
    return (
        <Card className="bg-light">
            <Card.Body>
                <Row>
                    <Col md={2} className="text-left pt-1 mr-0">
                        <Image src="/images/ejemploProducto.jpg" style={{width:"120px", height:"111px"}} roundedCircle />
                    </Col>
                    <Col md={8} className="text-left pl-0 ml-0">
                        <Row>
                            <Col md={8}>
                                <Row>
                                    <Col className="mr-0 pr-0">
                                        <p  className="mb-0 pb-0 mr-0 pr-0"><strong>Botella Capitán América</strong></p>
                                    </Col>
                                </Row>
                                
                            </Col>
                            <Col md={4} className="text-right" style={{color:"#1ABC9C"}}>
                                <p  className="mb-0 pb-0"><strong>Precio: $6.99</strong></p>
                            </Col>
                        </Row>
                        <Row className="mt-0">
                            <Col md={12} style={{fontSize:"0.8rem"}}>
                                <Row>
                                    <Col>
                                        <a className="a_listadeseos_card">
                                            <p className="mb-0 pb-0">Tienda: Universal</p>
                                        </a>
                                        
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="mt-2 mb-0 pb-0">Descripción: Increíble botella de tu superhéroe favorito, el Capitán América, puedes cargar gran cantidad de agua o refresco para que te sientas como un auténtico super soldado.</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={12} style={{fontSize:"0.8rem"}}>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0">Disponibles en tienda: 15 unidades</p>
                                    </Col>
                                    <Col className="text-right">
                                        
                                    </Col>
                                </Row>
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
                        {
                            modalidad==="lista_deseos" &&
                                                            <Row>
                                                                <Col className="text-right mt-5 mb-0 pb-0">
                                                                    <img className="d-inline-block align-top ml-0 pl-0 mt-1" style={{cursor:"pointer"}} src="/images/micarrito.png" title="Añadir a carrito" alt="logo" height="18"/>
                                                                </Col>
                                                            </Row>
                        }
                        
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
