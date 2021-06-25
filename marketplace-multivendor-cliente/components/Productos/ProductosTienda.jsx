import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { getAllProductos, getProductosByTienda, getProductosByNombreAndTienda } from '../../services/productos.service';
import { useForm } from '../../context/hooks/useForm';

export const ProductosTienda = () => {
    
    const [ productos, setProductos ] = useState([]);

    const [ formValues, handleInputChange ] = useForm({
        buscador: ''
    });

    const { buscador } = formValues;

    const getProductos = ()=>{
        getProductosByTienda(1).then(p=>setProductos(p));
    }
    useEffect(() => {
        getProductos();
    }, [])

    const handleBuscar = (e)=>{
        getProductosByNombreAndTienda(buscador, 1).then(p=>setProductos(p));
    };

    return (
        <>
        <Row className="mb-2 mt-4">
            <Col md={1}></Col>
            <Col md={8}>
                <h2 style={{color:"#1abc9c"}}>Mis productos</h2>
            </Col>
            <Col md={2} className="text-right">
                <Button variant="info">Agregar producto</Button>
            </Col>
        </Row>
        <Row>
            <Col md={1}></Col>
            <Col md={10}>
                <InputGroup className="mb-3 mt-3">
                    <FormControl
                        placeholder="Escribe el nombre del tu producto"
                        aria-label="Escribe el nombre del tu producto"
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
            <Col md={2}></Col>
        </Row>
        <Row>
            <Col md={1}></Col>
            <Col md={10} className='pt-3' style={{color:'yellow'}}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Costo Envio</th>
                            <th>Tiempo Envio</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map(p => (
                                <tr>
                                    <td>{p.nombre_producto}</td>
                                    <td>{p.cantidad_disponible}</td>
                                    <td>{p.costo_envio}</td>
                                    <td>{p.tiempo_envio}</td>
                                    <td>{p.precio}</td>
                                    <td>
                                        <Button className='pl-4 pr-4' variant="outline-info">Editar</Button>{' '}
                                        <Button variant="outline-danger">Eliminar</Button>{' '}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
            <Col md={2}></Col>
        </Row>
            
        </>
    )
}
