import React, { useState, useEffect } from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import { ProductoCard } from './ProductoCard'
import Select from 'react-select'
import { getAllProductos, getProductosByNombreOrTienda, getAllCategorias, getProductosByCategoria } from '../../services/productos.service';
import { useForm } from '../../context/hooks/useForm';

export const ProductosComprador = () => {

    const [ productos, setProductos ] = useState([]);
    const [ categorias, setCategorias ] = useState([]);
    const [ formValues, handleInputChange ] = useForm({
        buscador: ''
    });

    const { buscador } = formValues;


    
    const getCategorias = ()=>{
        getAllCategorias().then(c=>{
            let categories = c.map(ca=>{
                let op = {
                    value: ca.id_categoria,
                    label: ca.nombre,
                };
                return op;
            });
            setCategorias(categories);
        });
    }

    const getProductos = ()=>{
        getAllProductos().then(p=>setProductos(p));
    }
    
    const getProductosBy_Categoria = (cId)=>{
        getProductosByCategoria(cId).then(p=>setProductos(p));
    }

    useEffect(() => {
        getProductos();
        getCategorias();
    }, [])

    const handleBuscar = (e)=>{
        getProductosByNombreOrTienda(buscador).then(p=>setProductos(p));
    };


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
                        <Col md={6}>
                            Busca por producto o tienda
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Escribe el nombre del producto o de la tienda"
                                    aria-label="Escribe el nombre del producto o de la tienda"
                                    aria-describedby="basic-addon2"
                                    value={buscador}
                                    name="buscador"
                                    onChange={ handleInputChange }
                                />
                                <InputGroup.Append>
                                    <Button onClick={handleBuscar} variant="outline-secondary">Buscar</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            Busca por categoría
                            <Select
                                isClearable={true}
                                name="categorias"
                                options={categorias}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                isSearchable={false}
                                onChange = {(e)=>{
                                    if(e){
                                        getProductosBy_Categoria(e.value);
                                    }else{
                                        getProductos();
                                    }
                                }}
                            />
                        </Col>
                        <Col md={2} className="mt-4">
                            <Button onClick={(e)=>{ getProductos(); }} variant="info" block>Ver todos</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-5 pt-4">
                {productos.map( producto => (
                    <Col key={producto.id_producto} md={3} className="d-flex justify-content-center">
                        <ProductoCard key={producto.id_producto} producto={producto}/>
                    </Col>
                ))}
                
            </Row>
        </>
    )
}
