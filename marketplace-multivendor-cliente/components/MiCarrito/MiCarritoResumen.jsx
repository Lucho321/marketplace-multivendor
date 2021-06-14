import React, { useState } from 'react'
import { Col, Image, Row, Button } from 'react-bootstrap'
import { MiCarritoResumenCard } from './MiCarritoResumenCard'

export const MiCarritoResumen = () => {
    return (
        <>
            <Row style={{borderLeft:"solid 1.5px #aaa"}}>
                <Col md={12} className="text-center mb-3">
                    <h4>Resumen</h4>
                </Col>
                <Col md={12}>
                    <MiCarritoResumenCard />
                </Col>
                <Col md={12}>
                    <MiCarritoResumenCard />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={12}>
                    <p><strong>Total Pagar: $41.94</strong></p>
                </Col>
                <Col md={12}>
                    <Button block>
                        Pagar
                    </Button>
                </Col>
            </Row>
            
        </>
    )
}
