import React from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card, Form, Image } from 'react-bootstrap'


export const OpinionComentario = ({nombre}) => {
    return (
        <Col md={12} className="mb-1">
            <Row>
                <Col md={1} className="text-center">
                    <Image src={`/images/${nombre}.jpg`} style={{width:"68px", height:"59px"}} roundedCircle />
                </Col>
                <Col md={11}>
                    <Row className="mb-1">
                        <Col style={{fontSize:"0.7rem"}}>
                            {
                                nombre == "cristiano" && "@CristianoRonaldo"
                            }
                            {
                                nombre == "alvarado" && "@CarlosAlvarado"
                            }
                        </Col>
                        <Col className="text-right" style={{fontSize:"0.7rem"}}>
                            02/06/2021
                        </Col>
                    </Row>
                    <Form.Group >
                        {
                            nombre == "cristiano" && <Form.Control readOnly value="Las mejores tennis que me he podido comprar, SIUUUUUU!"/>
                        }
                        {
                            nombre == "alvarado" && <Form.Control readOnly value="Aayy mi madre el BICHOO!!!"/>
                        }
                    </Form.Group>
                </Col>
            </Row>
            
        </Col>
    )
}
