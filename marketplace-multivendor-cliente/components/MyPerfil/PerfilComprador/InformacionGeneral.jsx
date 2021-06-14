import React, { useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from '../../../context/hooks/useForm'
import { RedSocialCard } from './RedSocial/RedSocialCard'
import { RedSocialModal } from './RedSocial/RedSocialModal'

export const InformacionGeneral = () => {
    const [modalShow, setModalShow] = useState(false);
    var nombreBD;

    const [ isChanged, setIsChanged ] = useState(false);
    const [ formValues, handleInputChange ] = useForm({
        nombre: '',
        username: '',
        email:'',
        pais: '',
        direccion: ''
    });

    const { nombre, username, email, pais, direccion } = formValues;

    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-2">
                    <Col>
                        <h5>Información Personal</h5>
                    </Col>
                </Row>
                <Row >
                    <Col className="mb-3">
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Nombre real</Form.Label>
                                        <Form.Control name="nombre" value={ nombre } onChange={ (e)=>{handleInputChange(e); setIsChanged(true);}} type="text" placeholder="Este es tu nombre real" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control name="username" value={ username } onChange={ (e)=>{handleInputChange(e); setIsChanged(true);}} type="text" placeholder="Este es tu nombre de usuario" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control name="email" value={ email } onChange={ (e)=>{handleInputChange(e); setIsChanged(true);}} type="email" placeholder="Aquí va tu email" />
                                            <Form.Text className="text-muted"></Form.Text>
                                        </Form.Group>
                                    </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Form.Group >
                                        <Form.Label>País</Form.Label>
                                        <Form.Control name="pais" value={ pais } onChange={ (e)=>{handleInputChange(e); setIsChanged(true);}} type="text" placeholder="País donde vives" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={9}>
                                    <Form.Group >
                                            <Form.Label>Dirección</Form.Label>
                                            <Form.Control name="direccion" value={ direccion } onChange={ (e)=>{handleInputChange(e); setIsChanged(true);}} type="text" placeholder="Esta es tu dirección" />
                                            <Form.Text className="text-muted"></Form.Text>
                                        </Form.Group>
                                    </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2 text-right">
                                    <Button variant="primary" type="submit" disabled={!isChanged}>
                                        Guardar cambios
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form>
                    </Col>
                </Row>
                <hr/>
                <Row className="mb-3 pt-3">
                    <Col md={9}>
                        <h5>Redes Sociales</h5>
                    </Col>
                    <Col md={3} className="text-right">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Agregar red social
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <RedSocialCard />
                                </Col>
                            </Row>
                            <RedSocialModal show={modalShow} onHide={() => setModalShow(false)} />
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
