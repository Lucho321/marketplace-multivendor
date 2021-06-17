import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { ListaDeseosCard } from '../../ListaDeseos/ListaDeseosCard'

export const ListaDeseos = () => {
    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-3">
                    <Col md={12}>
                        <h5>Lista de deseos</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mb-3">
                        <ListaDeseosCard modalidad="lista_deseos"/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
