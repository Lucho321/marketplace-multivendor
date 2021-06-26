import React from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";
import { OpinionCalificar } from '../Opiniones/OpinionCalificar';

export const OpinionesTienda = ({tiendaId}) => {

    console.log(tiendaId)
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
                        
                        <OpinionCalificar modalidad="tienda" tiendaId={tiendaId}/>
                    </Col> 
                    
                </Row>
            </Col>
            
        </Row>
    )
}
