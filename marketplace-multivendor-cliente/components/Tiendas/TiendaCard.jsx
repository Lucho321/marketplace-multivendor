import React from 'react'
import { Button, Col, Row, Image, InputGroup, FormControl, Card } from 'react-bootstrap'
import Link from 'next/link'
import ReactStars from "react-rating-stars-component";

export const TiendaCard = () => {
    return (
        <div  style={{marginBottom:"1.5rem"}}>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={3}>
                            <Image style={{border:"0.8px solid #aaa"}} src="/images/files/NIKE.jpg" height="150" width="100%" />
                        </Col>
                        <Col md={9}>
                            <Row>
                                <Col md={10} style={{fontSize:"0.8rem"}}>
                                    <Link href="/producto/1">
                                        <a className="a_productocard">
                                            <h4><strong>Nike</strong></h4>
                                        </a>
                                    </Link>
                                </Col>
                                <Col md={2} className="text-right">
                                    <ReactStars
                                        value={4.5}
                                        count={5}
                                        edit={false}
                                        size={20}
                                        activeColor="#ffd700"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-1">
                                    NIKE, llamada así por la diosa griega de la victoria, es una empresa de calzado y ropa. Diseña, desarrolla y vende una variedad de productos para ayudar en la práctica del baloncesto y el fútbol (fútbol), así como en la carrera, el entrenamiento de hombres y mujeres y otros deportes de acción.
                                </Col>
                            </Row>
                            <Row>
                                <Col md="10" className="mt-3" style={{fontSize:"0.7rem"}}>
                                    Productos: 34
                                </Col>
                                <Col md="2" className="mt-1 mp-2">
                                    <Button variant="outline-info" size="sm">Suscribirme</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

