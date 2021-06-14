import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Form, InputGroup, Button } from 'react-bootstrap'
import { getPaisesOptions } from '../../../../context/data/paises';
import Select from 'react-select';

export const DireccionesEnvioModal = (props) => {

    const optionsPaises = getPaisesOptions();

    const { modalidad } = props;
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{`${modalidad} dirección de envío`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="mt-1">
                        <Form.Group >
                            <Form.Label>Dirección detallada</Form.Label>
                            <Form.Control as="textarea" name="direccion" placeholder="Escribe la dirección aquí" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col md={6}>
                        País
                        <Select
                            className="mt-2 basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="color"
                            options={optionsPaises}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control placeholder="Nombre de la provincia" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Código postal</Form.Label>
                            <Form.Control placeholder="Código postal de tu ciudad" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Número de casillero</Form.Label>
                            <Form.Control placeholder="Número de casillero" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary">Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}
