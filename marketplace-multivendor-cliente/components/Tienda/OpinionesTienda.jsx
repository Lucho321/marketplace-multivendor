import React from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";
import { OpinionCalificar } from '../Opiniones/OpinionCalificar';
import { OpinionComentar } from '../Opiniones/OpinionComentar';
import { OpinionComentario } from '../Opiniones/OpinionComentario';

export const OpinionesTienda = () => {
    return (
        <Row className="" >
            <Col md={12}>
                <Row className="p-4">
                    <Col md={3} className="pr-5">
                        <Row className="mb-2">
                            <Col className="text-center"> 
                                <h5>¿Qué te pareció esta tienda?</h5>
                            </Col>
                        </Row>
                        
                        <OpinionCalificar modalidad="tienda" />
                    </Col> 
                    <Col md={9} className="pl-5" style={{borderLeft:"1px solid #343a40"}}>
                        <Row className="mb-2">
                            <Col> 
                                <h5>¡Escribe un comentario de esta tienda!</h5>
                            </Col>
                        </Row>
                        <OpinionComentar modalidad="tienda" />
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
                    <OpinionComentario modalidad="tienda" nombre="alvarado" />
                    <OpinionComentario modalidad="tienda" nombre="cristiano" />
                </Row>
            </Col>
        </Row>
    )
}
