import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Dropdown, Form, Spinner,  } from 'react-bootstrap'
import {ProductoCarousels} from './ProductoCarousels'
import ReactStars from "react-rating-stars-component";
import { OpinionCalificar } from '../Opiniones/OpinionCalificar';
import { OpinionComentar } from '../Opiniones/OpinionComentar';
import { OpinionComentario } from '../Opiniones/OpinionComentario';
import { getProductoById, getCategoriaByProductos } from '../../services/productos.service';
import Link from 'next/link'
import { DeseoComponent } from '../Productos/DeseoComponent';
import { CarritoComponent } from '../Productos/CarritoComponent';
import { CompraModal } from '../Compra/CompraModal';


export const ProductoContainer = ({productoId}) => {
    const [modalShow, setModalShow] = useState(false);
    const [ producto, setProducto ] = useState({});
    const [ categorias, setCategorias ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const getProducto = async()=>{
        let pro = await getProductoById(productoId);
        return pro;
    }

    const getCategorias = async()=>{
        getCategoriaByProductos(producto.id_producto).then(c=>{setCategorias(c)});
    }

    useEffect(() => {
        getCategorias();
        let pro = getProducto().then(p=>{setProducto(p[0]); setLoading(false);});
    }, [])

    if(loading){
        return  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
    }


    return (
        <>
            <Row className="mt-3 mb-5">
                <Col md={4} className="text-center">
                    <ProductoCarousels idProducto={producto.id_producto}/>
                </Col>
                <Col md={8}>
                    <Row>
                        <Col style={{fontSize:"0.75rem", color:"#212529"}}>
                            Publicación: 01/06/2021
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9}>
                            <h1>{producto.nombre_producto}</h1>
                            <span><h3 style={{color:"#247d6d"}}>{`$${producto.precio}`}<small style={{fontSize:"0.75rem", color:"#212529"}}>{` + envío: $${producto.costo_envio}`}</small></h3></span>
                            
                        </Col>
                        <Col md={3} className="pt-1 text-center">
                            <ReactStars
                                value={parseInt(producto.calificacion)}
                                count={5}
                                edit={false}
                                size={35}
                                activeColor="#ffd700"
                            />
                        </Col>
                    </Row>
                    <Row className="pt-3" style={{fontSize:"0.85rem"}}>
                        <Col>
                            <Row>
                                <Col>
                                    <Link href={`/tienda/${producto.id_tienda}`}>
                                        <a className="a_productocard">
                                            Visita la tienda <strong>{producto.nombre_tienda}</strong>
                                        </a>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {`Unidades disponibles: ${producto.cantidad_disponible}`}
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    {`Ubicación: ${producto.ubicacion}`}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {`Duración envío: ${producto.tiempo_envio} días`}
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{fontSize:"0.85rem"}}>
                            <Row>
                                <Col className="pl-4">
                                    {"    "}Categorías:
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Control readOnly  as="select" style={{width:"70%", backgroundColor:"transparent", border:"none", color:"#212529", fontSize:"0.85rem"}}>
                                            {
                                                categorias.map(c=>(
                                                    <option>{c.nombre}</option>
                                                ))
                                            }
                                            
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="pt-3">
                        <Col>
                            {producto.descripcion}
                        </Col>
                    </Row>
                    <Row className="pt-5">
                        <Col>
                            <DeseoComponent idProducto={productoId} altura={25} />
                            <CarritoComponent idProducto={productoId} altura={25} />
                        </Col>
                        <Col className="text-right">
                            <Button variant="info" onClick={() => setModalShow(true)}>Comprar</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="bg-light" >
                <Col md={12}>
                    <Row className="p-4">
                        <Col md={3} className="pr-5">
                            <Row className="mb-2">
                                <Col className="text-center"> 
                                    <h5>¿Qué te pareció el producto?</h5>
                                </Col>
                            </Row>
                            
                            <OpinionCalificar modalidad="producto" />
                        </Col> 
                        <Col md={9} className="pl-5" style={{borderLeft:"1px solid #343a40"}}>
                            <Row className="mb-2">
                                <Col> 
                                    <h5>¡Escribe un comentario de este producto!</h5>
                                </Col>
                            </Row>
                            <OpinionComentar modalidad="producto" />
                        </Col>
                    </Row>
                </Col>
                <Col md={12} className="mt-4">
                    <Row>
                        <Col className="mb-3">
                            <h6>Otras personas han comentado...</h6>
                        </Col>
                    </Row>
                    <Row>
                        <OpinionComentario modalidad="producto" nombre="alvarado" />
                        <OpinionComentario modalidad="producto" nombre="cristiano" />
                    </Row>
                </Col>
            </Row>
            <CompraModal show={modalShow} producto={producto} onHide={() => {setModalShow(false)}}/>
        </>
    )
}
