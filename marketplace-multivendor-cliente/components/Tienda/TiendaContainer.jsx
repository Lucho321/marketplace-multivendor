import React, { useState } from 'react'
import { Button, Col, Row, Image, Tabs, Tab } from 'react-bootstrap'
import Link from 'next/link'
import ReactStars from "react-rating-stars-component";
import { ProductosTienda } from './ProductosTienda';
import { OpinionesTienda } from './OpinionesTienda';

export const TiendaContainer = ({tiendaId}) => {
    const [key, setKey] = useState('productos');

    return (
        <>
            <Row className="p-5 bg-light">
                <Col md={3}>
                    <Image style={{border:"0.8px solid #aaa"}} src="/images/files/NIKE.jpg" height="150" width="100%" />
                </Col>
                <Col md={9}>
                    <Row>
                        <Col md={10} style={{fontSize:"0.8rem"}}>
                            <Link href="/tienda/1">
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
                        <Col md="8" className="mt-3" style={{fontSize:"0.7rem"}}>
                            Productos: 34
                        </Col>
                        <Col md="4" className="mt-1 mp-2 text-center">
                            <Button className="mr-2" variant="outline-info" size="sm">Suscribirme</Button>
                            <Button variant="outline-info" size="sm">Reportar abuso</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={12} style={{color:"#212529"}}>
                    <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        style={{color:"#212529!important"}}
                    >
                        <Tab eventKey="productos" title="Productos">
                            <ProductosTienda tienda={tiendaId} />
                        </Tab>
                        <Tab eventKey="opiniones" title="Comentarios y más">
                            <OpinionesTienda />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </>
    )
}
