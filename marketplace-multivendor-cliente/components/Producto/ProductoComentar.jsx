import React from 'react'
import { Button, Col, Row, Form,  } from 'react-bootstrap'

export const ProductoComentar = () => {
    return (
        <Row>
            <Col md={12}>
                <Form>
                    <Form.Row className="align-items-center">
                        <Col md="10">
                            <Form.Group style={{width:"100%"}}>
                                <Form.Label htmlFor="inlineFormInput" srOnly>
                                    Escribe aquí tu comentario
                                </Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    id="inlineFormInput"
                                    placeholder="Escribe aquí tu comentario"
                                />
                            </Form.Group>
                        </Col>
                        <Col md="2">
                            <Button variant="outline-info" type="submit" className="mb-3" block>
                                Comentar
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>
            
        </Row>
    )
}
