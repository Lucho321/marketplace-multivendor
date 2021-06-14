import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { DireccionesEnvioCard } from './DireccionesEnvioCard';
import { DireccionesEnvioModal } from './DireccionesEnvioModal';

export const DireccionesEnvio = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-5">
                    <Col md={9}>
                        <h5>Direcciones de envío</h5>
                    </Col>
                    <Col md={3} className="text-right">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Agregar dirección
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mb-3">
                        <DireccionesEnvioCard />
                    </Col>
                    <Col md={12} className="mb-3">
                        <DireccionesEnvioCard />
                    </Col>
                </Row>
            </Col>
            <DireccionesEnvioModal modalidad="Agregar" show={modalShow} onHide={() => setModalShow(false)}/>
        </Row>
    )
}
