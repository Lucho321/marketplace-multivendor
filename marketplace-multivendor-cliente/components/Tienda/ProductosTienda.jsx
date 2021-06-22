import React, { useState, useEffect } from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import { ProductoCard } from '../Productos/ProductoCard';
import { getProductosByTienda } from '../../services/productos.service';

export const ProductosTienda = ({tienda}) => {
    const [ productos, setProductos ] = useState([]);


    const getProductos = async()=>{
        let prods = await getProductosByTienda(tienda);
        return prods;
    }
    useEffect(() => {
        let prods = getProductos().then(p=>setProductos(p));
    }, [])


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
                {productos.map( producto => (
                    <Col md={3} className="d-flex justify-content-center">
                        <ProductoCard key={producto.id_producto} producto={producto}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}
