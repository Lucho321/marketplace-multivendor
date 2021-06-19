import React from 'react'
import { Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap'
import { TiendaCard } from './TiendaCard'

export const TiendasComprador = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col md={2} className="pl-4 mt-3">
                    <img src="/images/tiendas.png" width="200rem" alt="productos"/>
                </Col>
                <Col md={10} className="mt-1 pl-5 pr-5">
                    <Row>
                        <Col className="text-center">
                            <h1 style={{color:"#1abc9c"}}>TIENDAS</h1>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={12}>
                            Busca tu tienda favorita
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Escribe el nombre de la tienda"
                                    aria-label="Escribe el nombre de la tienda"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary">Buscar</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-5 pt-4 d-flex justify-content-center">
                <Col md={10} className="mb-3">
                    <TiendaCard />
                </Col>
                <Col md={10} className="mb-3">
                    <TiendaCard />
                </Col>
                <Col md={10} className="mb-3">
                    <TiendaCard />
                </Col>
                <Col md={10} className="mb-3">
                    <TiendaCard />
                </Col>
                <Col md={10} className="mb-3">
                    <TiendaCard />
                </Col>
            </Row>
        </>
    )
}
