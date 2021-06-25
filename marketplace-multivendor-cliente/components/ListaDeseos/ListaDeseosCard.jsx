import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Image } from 'react-bootstrap'
import { getProductoById, getImageByProducto, deleteDeseoCarrito } from '../../services/productos.service';
import {CarritoComponent} from '../Productos/CarritoComponent';
import Link from 'next/link'
import Swal from 'sweetalert2'

export const ListaDeseosCard = ({productoId, modalidad}) => {

    const [ producto, setProducto ] = useState({});
    const [ images, setImages ] = useState([]);
    const [ deseoCarritoId, setDeseoCarritoId ] = useState();
    
    let usuarioLogeado;
    useEffect(() => {
        getProducto();
        getImages();
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.deseos){
                    setDeseoCarritoId(usuarioLogeado.deseos);
                }
            }
        }
    }, [])


    const getProducto = () =>{ 
        getProductoById(productoId).then(res=>{
            if(res[0]){
                setProducto(res[0]);
            }
            
        })
    }


    const handleDeseo = (e)=>{
        deleteDeseoCarrito(deseoCarritoId, productoId).then(res=>{
            if(res === "Registro eliminado exitosamente."){
                Swal.fire({
                    icon: 'success',
                    title: `Excelente`,
                    text: `Se ha quitado el producto de tu lista de deseos`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
        
    }


    const getImages = ()=>{
        getImageByProducto(productoId).then(i=>setImages(i));
    }
  

    const getImageToShow = ()=>{
        if(images.length > 0){
            return images[0].url_foto;
        }else{
            return 'no-disponible.jpg';
        }
    }

    return (
        <Card className="bg-light">
            <Card.Body>
                <Row>
                    <Col md={2} className="text-left pt-1 mr-0">
                        <Image src={`/images/files/${getImageToShow()}`} style={{width:"120px", height:"111px"}} roundedCircle />
                    </Col>
                    <Col md={8} className="text-left pl-0 ml-0">
                        <Row>
                            <Col md={8}>
                                
                                <Row>
                                    <Col className="mr-0 pr-0">
                                        <Link href={`/producto/${producto.id_producto}`}>
                                            <a className="a_productocard">
                                                <strong>{producto.nombre_producto}</strong>
                                            </a>
                                        </Link>
                                    </Col>
                                </Row>
                                
                            </Col>
                            <Col md={4} className="text-right" style={{color:"#1ABC9C"}}>
                                <p  className="mb-0 pb-0"><strong>Precio: ${producto.precio}</strong></p>
                            </Col>
                        </Row>
                        <Row className="mt-0">
                            <Col md={12} style={{fontSize:"0.8rem"}}>
                                <Row>
                                    <Col>
                                        <Link href={`/tienda/${producto.id_tienda}`}>
                                            <a className="a_listadeseos_card">
                                                <p className="mb-0 pb-0">Tienda: {producto.nombre_tienda}</p>
                                            </a>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="mt-2 mb-0 pb-0">Descripción: {producto.descripcion}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={12} style={{fontSize:"0.8rem"}}>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0">Disponibles en tienda: {producto.cantidad_disponible
                                        } unidades</p>
                                    </Col>
                                    <Col className="text-right">
                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2} className="text-right pt-1">
                        <Row>
                            <Col className="ml-0 pl-0">
                                <Button onClick={handleDeseo} variant="outline-danger">
                                    <small>Eliminar</small>
                                </Button>
                            </Col>
                        </Row>
                        {
                            modalidad==="lista_deseos" &&
                                                            <Row>
                                                                <Col className="text-right mt-5 mb-0 pb-0">
                                                                    <CarritoComponent idProducto={productoId} altura={18}/>
                                                                </Col>
                                                            </Row>
                        }
                        
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
