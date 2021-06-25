import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Image, Form } from 'react-bootstrap'
import { getProductoById, getImageByProducto, deleteDeseoCarrito, updateDeseosOCarrito } from '../../services/productos.service';
import Link from 'next/link'


export const MiCarritoCard = ({productoId, productoCarrito}) => {
    const [ producto, setProducto ] = useState({});
    const [ images, setImages ] = useState([]);
    const [ deseoCarritoId, setDeseoCarritoId ] = useState();
    const [ cantidad, setCantidad ] = useState(productoCarrito.cantidad)
    
    let usuarioLogeado;
    useEffect(() => {
        getProducto();
        getImages();
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.deseos){
                    setDeseoCarritoId(usuarioLogeado.carrito);
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
                    <Col md={2} className="text-left pt-1 mr-2">
                        <Image src={`/images/files/${getImageToShow()}`} style={{width:"50px", height:"41px"}} roundedCircle />
                    </Col>
                    <Col md={6} className="text-left pl-0 ml-0">
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col className="mr-0 pr-0" style={{fontSize:"0.9rem"}}>
                                        <p  className="mb-0 pb-0 mr-0 pr-0"><strong>{producto.nombre_producto}</strong></p>
                                    </Col>
                                </Row>
                                
                            </Col>
                        </Row>
                        <Row className="mt-0">
                            <Col md={12} style={{fontSize:"0.65rem"}}>
                                <Row>
                                    <Col>
                                        <Link href={`/tienda/${producto.id_tienda}`}>
                                            <a className="a_listadeseos_card">
                                                <p className="mb-0 pb-0">Tienda: {producto.nombre_tienda}</p>
                                            </a>
                                        </Link>
                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-0">
                            <Col md={12} style={{fontSize:"0.65rem"}}>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0">Disponibles en tienda: {producto.cantidad_disponible
                                        } unidades</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3} >
                        <Row>
                            <Col className="pt-1 mr-0 pr-0" style={{fontSize:"0.8rem"}}>
                                <strong>Precio: ${producto.precio}</strong> + envío ${producto.costo_envio}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pt-1 mr-0 pr-0" style={{fontSize:"0.8rem"}}>
                                Cantidad: {productoCarrito.cantidad}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
