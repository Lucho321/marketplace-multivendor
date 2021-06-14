import React from 'react'
import { Button, Col, Row, Image, InputGroup, FormControl, Card } from 'react-bootstrap'

export const ProductoCard = () => {
    return (
        <div style={{width:"80%", borderBottom:"1px solid grey", paddingBottom:"1rem", marginBottom:"1.5rem"}}>
            <Row>
                <Col>
                    <Image src="/images/yo.jpg" height="180" width="100%" />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="ml-1">
                    <strong>Nombre producto</strong>
                </Col>
                <Col md={12} className="ml-1" style={{fontSize:"0.8rem"}}>
                    Descripcion del producto
                </Col>
            </Row>
            <Row className="mt-2">
                <Col className="ml-1" style={{color:"#247d6d"}}>
                    $1299.99
                </Col>
                <Col className="mr-2 mt-1 text-right">
                    <img className="d-inline-block align-top" src="/images/misdeseos.png" title="Mi lista de deseos" alt="logo" height="15"/>
                    <img className="ml-2 d-inline-block align-top" src="/images/micarrito.png" title="Mi carrito de compras" alt="logo" height="15"/>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={12}>
                    <Button variant="outline-info" block>Ver producto</Button>
                </Col>
            </Row>
        </div>
    )
}


{/* <Card style={{ width: '60%', margin:"auto", border:"0px"}} >
            <Card.Img variant="top" src="/images/yo.jpg" style={{height:"150px"}}/>
            <Card.Body>
                <Card.Title>Nombre tienda</Card.Title>
                <Card.Text>
                    Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                </Card.Text>
                <Button variant="outline-info" block>Ver tienda</Button>
            </Card.Body>
        </Card> */}