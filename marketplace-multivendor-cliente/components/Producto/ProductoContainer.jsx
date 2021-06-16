import React from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import {ProductoCarousels} from './ProductoCarousels'
import ReactStars from "react-rating-stars-component";
import { ProductoCalificar } from './ProductoCalificar';
import { ProductoComentar } from './ProductoComentar';
import { ProductoComentario } from './ProductoComentario';

export const ProductoContainer = ({productoId}) => {
    return (
        <>
            <Row className="mt-3 mb-5">
                <Col md={4} className="text-center">
                    <ProductoCarousels />
                </Col>
                <Col md={8}>
                    <Row>
                        <Col style={{fontSize:"0.75rem", color:"#212529"}}>
                            Publicación: 01/06/2021
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9}>
                            <h1>Nike SpaceJam Lebron</h1>
                            <span><h3 style={{color:"#247d6d"}}>$299.99<small style={{fontSize:"0.75rem", color:"#212529"}}> + envío: $6</small></h3></span>
                            
                        </Col>
                        <Col md={3} className="pt-1 text-center">
                            <ReactStars
                                value={4.5}
                                count={5}
                                edit={false}
                                size={35}
                                activeColor="#ffd700"
                            />
                        </Col>
                    </Row>
                    <Row className="pt-3" style={{fontSize:"0.85rem"}}>
                        <Col>
                            <Row>
                                <Col>
                                    <a className="a_productocard">
                                        Visita la tienda <strong>NIKE</strong>
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Unidades disponibles: 15
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    Ubicación: USA
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Duración envío: 6 días
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            Ver categorías
                        </Col>
                    </Row>
                    <Row className="pt-3">
                        <Col>
                            Fabolusas tennis Nike edición especial de la película SpaceJam protagonizada por el increíble Lebrom James,
                            atrévete a jugar como Lebron, y usa sus tennis...¡Bugs Bunny te espera en el equipo! Confortables, con estilo y la 
                            suspensión necesaria para saltar al espacio exterior.
                        </Col>
                    </Row>
                    <Row className="pt-5">
                        <Col>
                            <img className="d-inline-block align-top" src="/images/misdeseos.png" title="Mi lista de deseos" alt="logo" height="25"/>
                            <img className="ml-2 d-inline-block align-top" src="/images/micarrito.png" title="Mi carrito de compras" alt="logo" height="25"/>
                        </Col>
                        <Col className="text-right">
                            <Button variant="info">Comprar</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="bg-light" >
                <Col md={12}>
                    <Row className="p-4">
                        <Col md={3} className="pr-5">
                            <Row className="mb-2">
                                <Col className="text-center"> 
                                    <h5>¿Qué te pareció el producto?</h5>
                                </Col>
                            </Row>
                            
                            <ProductoCalificar />
                        </Col> 
                        <Col md={9} className="pl-5" style={{borderLeft:"1px solid #343a40"}}>
                            <Row className="mb-2">
                                <Col> 
                                    <h5>¡Escribe un comentario de este producto!</h5>
                                </Col>
                            </Row>
                            <ProductoComentar />
                        </Col>
                    </Row>
                </Col>
                <Col md={12} className="mt-4">
                    <Row>
                        <Col className="mb-3">
                            <h6>Otras personas han comentado...</h6>
                        </Col>
                    </Row>
                    <Row>
                        <ProductoComentario nombre="alvarado" />
                        <ProductoComentario nombre="cristiano" />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
