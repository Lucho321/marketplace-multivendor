import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { MiCarrito } from '../../MiCarrito/MiCarrito'

export const MiCarritoPerfil = () => {
    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-3">
                    <Col md={12}>
                        <h5>Mi Carrito</h5>
                    </Col>
                </Row>
                <MiCarrito />
            </Col>
        </Row>
    )
}
