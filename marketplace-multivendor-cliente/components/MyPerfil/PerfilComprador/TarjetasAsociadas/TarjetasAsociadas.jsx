import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { TarjetasAsociadasCard } from './TarjetasAsociadasCard'
import { TarjetasAsociadasModal } from './TarjetasAsociadasModal';

export const TarjetasAsociadas = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-5">
                    <Col md={9}>
                        <h5>Tarjetas Asociadas</h5>
                    </Col>
                    <Col md={3} className="text-right">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Agregar tarjeta
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mb-3">
                        <TarjetasAsociadasCard />
                    </Col>
                    <Col md={12} className="mb-3">
                        <TarjetasAsociadasCard />
                    </Col>
                </Row>
            </Col>
            <TarjetasAsociadasModal modalidad="Agregar" show={modalShow} onHide={() => setModalShow(false)}/>
        </Row>
    )
}
