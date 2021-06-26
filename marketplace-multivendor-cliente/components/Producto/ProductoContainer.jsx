
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
import { getComentariosByProducto } from '../../services/comentarios.service';
import { getUsuarioById } from '../../services/usuarios.service';
import { insertComentario } from '../../services/comentarios.service';
import { CompraModal } from '../Compra/CompraModal';
import Swal from 'sweetalert2'

export const ProductoContainer = ({productoId}) => {

    const [ producto, setProducto ] = useState({});
    const [ categorias, setCategorias ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ comentarios, setComentarios ] = useState([]);
    const [ usuario, setUsuario ] = useState([]);
    const[ id_usuario, setIdUsuario ] = useState();
    const[ comentario, setComentario ] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const getProducto = async()=>{
        let pro = await getProductoById(productoId);
        return pro;
    }

    const getCategorias = async(producto)=>{
        getCategoriaByProductos(producto).then(c=>{setCategorias(c)});
    }

    const getComentarios = (producto) => {
        getComentariosByProducto(producto).then(r=>{
            setComentarios(r);
        })
    }

    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    console.log(productoId)
                    getComentarios(productoId);
                    console.log(usuarioLogeado.id_usuario);
                    setIdUsuario(usuarioLogeado.id_usuario);
                }
            }
        }

        getCategorias(productoId);
        let pro = getProducto().then(p=>{setProducto(p[0]); setLoading(false);});
    }, [])

    if(loading){
        return  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
    }

    const handleComentar = (e)=>{
        let comentarioG = {
            id_usuario: id_usuario,
            comentario: comentario,
            nivel: null,
            id_producto: productoId,
            padre: null
        }

        insertComentario(comentarioG)
            .then(res=>{
                if(res==="Comentario agregado exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Comentario agregado exitosamente`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    getComentarios(productoId);
                    setComentario('');
                    setProducto('');
                }
            });
            
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
                            
                            <OpinionCalificar modalidad="producto" idProducto={productoId}/>
                        </Col> 
                        <Col md={9} className="pl-5" style={{borderLeft:"1px solid #343a40"}}>
                            <Row className="mb-2">
                                <Col> 
                                    <h5>¡Escribe un comentario de este producto!</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form>
                                        <Form.Row className="align-items-center">
                                            <Col md="10">
                                                <Form.Group style={{width:"100%"}}>
                                                    <Form.Label htmlFor="inlineFormInput" srOnly>
                                                        Escribe aquí tu comentario
                                                    </Form.Label>
                                                    <Form.Control
                                                        onChange={(e)=>{setComentario(e.target.value)}}
                                                        value={comentario}
                                                        name="comentario"
                                                        className="mb-2"
                                                        id="inlineFormInput"
                                                        placeholder="Escribe aquí tu comentario"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md="2">
                                                <Button variant="outline-info" onClick={handleComentar} className="mb-3" block>
                                                    Comentar
                                                </Button>
                                            </Col>
                                        </Form.Row>
                                    </Form>
                                </Col>
                            </Row>
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
                        {comentarios.map(t => (
                            <OpinionComentario modalidad="producto" idUsuario={t.id_usuario} comentario={t}/> 
                        ))}
                    </Row>
                </Col>
            </Row>
            <CompraModal show={modalShow} producto={producto} onHide={() => {setModalShow(false)}}/>
        </>
        
    )
}
