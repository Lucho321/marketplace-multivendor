import React from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import Image from 'next/image'

export const HomeComponent = () => {
    return (
        <>
            <Row 
                id="row_portada" 
                style={{
                    height:"300px",
                    background:"url('/images/home.png')",
                    backgroundSize:"cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <Col md={4}></Col>
                <Col md={4}></Col>
                <Col md={4} style={{margin:"auto"}} className="text-center">
                    <Button id="btn_comprar_home" variant="outline-info" style={{color:"white", fontSize:"1.5rem", marginRight:"15%"}}>Comienza a comprar</Button>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="text-center">
                    <InputGroup className="mb-4 mt-4" style={{width:"70%", margin:"auto"}}>
                        <FormControl
                            placeholder="Escribe aquí el nombre de tu tienda favorita"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                        <Button variant="outline-secondary">Buscar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Nombre tienda</Card.Title>
                            <Card.Text>
                                Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        </>

    )
}
