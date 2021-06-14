import React, { useState } from 'react'
import { Button, Card, Col, Row, Image } from 'react-bootstrap'
import { MiCarritoCard } from './MiCarritoCard'
import { MiCarritoResumen } from './MiCarritoResumen'

export const MiCarrito = () => {
    return (
        <Row>
            <Col md={9}>
                <Row>
                    <Col md={12}>
                        <MiCarritoCard />
                    </Col>
                </Row>
            </Col>
            <Col md={3}>
                <MiCarritoResumen />
            </Col>
        </Row>
    )
}
