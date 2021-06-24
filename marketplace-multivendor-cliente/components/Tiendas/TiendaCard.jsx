import React from 'react'
import { Button, Col, Row, Image, InputGroup, FormControl, Card } from 'react-bootstrap'
import Link from 'next/link'
import ReactStars from "react-rating-stars-component";

export const TiendaCard = ({tienda}) => {
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
                                    <Link href={`/tienda/${tienda.id_tienda}`}>
                                        <a className="a_productocard">
                                            <h4><strong>{tienda.nombre_tienda}</strong></h4>
                                        </a>
                                    </Link>
                                </Col>
                                <Col md={2} className="text-right">
                                    <ReactStars
                                        value={tienda.calificacion}
                                        count={5}
                                        edit={false}
                                        size={20}
                                        activeColor="#ffd700"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-1">
                                    {tienda.descripcion}
                                </Col>
                            </Row>
                            <Row>
                                <Col md="10" className="mt-3" style={{fontSize:"0.7rem"}}>
                                    {`Productos: ${tienda.cant_productos}`}
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

