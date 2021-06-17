import React, { useState } from 'react'
import { Button, Card, Col, Row, Image } from 'react-bootstrap'


export const MiCarritoResumenCard = () => {
    return (
        <div style={{backgroundColor:"#fafafa", borderRadius:"6px", padding:"5px", paddingBottom:"0", marginBottom:"5px"}}>
            <Row>
                <Col> 
                    <p style={{paddingBottom:"0", fontSize:"0.8rem"}}>Botella Capitán América</p>
                </Col>
                <Col>
                    <p style={{paddingBottom:"0", fontSize:"0.8rem"}}>Total: $20.97</p>
                    
                </Col>
            </Row>
        </div>
    )
}
