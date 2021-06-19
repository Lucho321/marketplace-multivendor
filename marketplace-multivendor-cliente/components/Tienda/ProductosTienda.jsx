import React from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import { ProductoCard } from '../Productos/ProductoCard';

export const ProductosTienda = () => {
    return (
        <>
            <Row className="pr-4 pl-4 mt-5 d-flex justify-content-center">
                <Col md={12}>
                    Busca tu producto
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Escribe el nombre del producto"
                            aria-label="Escribe el nombre del producto"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary">Buscar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-5 pt-4">
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                    <ProductoCard />
                </Col>
            </Row>
        </>
    )
}
