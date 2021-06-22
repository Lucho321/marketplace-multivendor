import React, { useState, useEffect } from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import { ProductoCard } from './ProductoCard'
import Select from 'react-select'
import { getAllProductos } from '../../services/productos.service';

export const ProductosComprador = () => {

    const categoriasOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const [ productos, setProductos ] = useState([]);


    const getProductos = async()=>{
        let prods = await getAllProductos();
        return prods;
    }
    useEffect(() => {
        let prods = getProductos().then(p=>setProductos(p));
    }, [])


    return (
        <>
            <Row className="mt-4 mb-4">
                <Col md={2} className="pl-4 mt-3">
                    <img src="/images/products.png" width="200rem" alt="productos"/>
                </Col>
                <Col md={10} className="mt-1 pl-5 pr-5">
                    <Row>
                        <Col className="text-center">
                            <h1 style={{color:"#1abc9c"}}>PRODUCTOS</h1>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={8}>
                            Busca por producto o tienda
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Escribe el nombre del producto o de la tienda"
                                    aria-label="Escribe el nombre del producto o de la tienda"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary">Buscar</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            Busca por categoría
                            <Select
                                isMulti
                                name="categorias"
                                options={categoriasOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                isSearchable={false}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-5 pt-4">
                {productos.map( producto => (
                    <Col md={3} className="d-flex justify-content-center">
                        <ProductoCard key={producto.id_producto} producto={producto}/>
                    </Col>
                ))}
                
            </Row>
        </>
    )
}
