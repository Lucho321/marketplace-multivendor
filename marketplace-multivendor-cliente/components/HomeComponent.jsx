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
                    <Button id="btn_comprar_home" variant="outline-info" style={{color:"white", fontSize:"1.5rem", marginRight:"20%"}}>COMIENZA A COMPRAR</Button>
                </Col>
            </Row>
            <Row className="p-4 mt-4 mr-2 ml-2" style={{background:"#dcf7f3"}}>
                <Col md={12} >
                    <h4>Productos más vendidos<small>  top+4</small></h4>
                </Col>
            </Row>
            <Row className="pr-4 pl-4 pb-4 mr-2 ml-2" style={{background:"#dcf7f3"}}>
                <Col md={2} className="p-2">
                    <Card style={{border:"none"}}>
                        <Card.Img variant="top" src="/images/yo.jpg" style={{maxHeight: "200px"}}/>
                        <Card.Body>
                        <Card.Text>
                            <p><strong>Chocolate blanco</strong></p>
                            <p><strong>Precio: </strong>1500</p>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{border:"none"}}>
                        <Card.Img variant="top" src="/images/yo.jpg" style={{maxHeight: "200px"}}/>
                        <Card.Body>
                        <Card.Text>
                            <p><strong>Chocolate blanco</strong></p>
                            <p><strong>Precio: </strong>1500</p>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{border:"none"}}>
                        <Card.Img variant="top" src="/images/yo.jpg" style={{maxHeight: "200px"}}/>
                        <Card.Body>
                        <Card.Text>
                            <p><strong>Chocolate blanco</strong></p>
                            <p><strong>Precio: </strong>1500</p>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} className="p-2">
                    <Card style={{border:"none"}}>
                        <Card.Img variant="top" src="/images/yo.jpg" style={{maxHeight: "200px"}}/>
                        <Card.Body>
                        <Card.Text>
                            <p><strong>Chocolate blanco</strong></p>
                            <p><strong>Precio: </strong>1500</p>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="text-center">
                    <img src="/images/image1.png" width="80%" />
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
