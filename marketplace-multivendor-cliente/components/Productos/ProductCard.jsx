import React from 'react'
import { Col, Image, Row, Card } from 'react-bootstrap'

export const ProductCard = ({producto}) => {
    return (
        <Card style={{border:"none"}} className="p-2">
            <Card.Text className="p-0 mb-2 mt-1">
                <strong>Chocolate blanco</strong>
            </Card.Text>
            <Card.Img variant="top" src="/images/yo.jpg" style={{maxHeight: "200px"}}/>
            <Card.Body className="p-0">
                <Row>
                    <Col md={8}>
                        <Card.Text className="p-0 mb-0 mt-1">
                            <strong>₡1500</strong>
                        </Card.Text>
                    </Col>
                    <Col md={4} className="pt-2 text-rigth">
                        <img className="d-inline-block align-top" src="/images/misdeseos.png" title="Mi lista de deseos" alt="logo" height="15"/>
                        <img className="d-inline-block align-top" src="/images/micarrito.png" title="Mi carrito de compras" alt="logo" height="15"/>
                    </Col>
                </Row>
                
            </Card.Body>
        </Card>
    )
}
