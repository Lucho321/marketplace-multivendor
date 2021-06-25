import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Image } from 'react-bootstrap'
import { MiCarritoCard } from './MiCarritoCard'
import { MiCarritoResumen } from './MiCarritoResumen'
import { getProductosCarritoByCarrito, deleteDeseoCarrito } from '../../services/productos.service'
import Swal from 'sweetalert2'

export const MiCarrito = () => {

    const [ deseoCarritoId, setDeseoCarritoId ] = useState();

    const [ productos, setProductos ] = useState([]);
    let usuarioLogeado;


    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.deseos){
                    setDeseoCarritoId(usuarioLogeado.carrito);
                    getProductos(usuarioLogeado.carrito);
                }
            }
        }
    }, [])


    const getProductos = (idDeseoCarrito) =>{ 
        getProductosCarritoByCarrito(idDeseoCarrito).then(res=>{
            setProductos(res);
        })
    }

    const handleDeseo = (pid)=>{
        deleteDeseoCarrito(deseoCarritoId, pid).then(res=>{
            if(res === "Registro eliminado exitosamente."){
                Swal.fire({
                    icon: 'success',
                    title: `Excelente`,
                    text: `Se ha quitado el producto de tu carrito`,
                    showConfirmButton: false,
                    timer: 2500
                });
                getProductos(deseoCarritoId);
            }
        })
        
    }

    return (
        <Row>
            <Col md={9}>
                <Row>
                    {
                        productos.map(p=>(
                            <>
                                <Col key={p.id_producto} md={10} className="mb-3">
                                    <MiCarritoCard key={p.id_producto} productoCarrito={p} productoId={p.id_producto} />
                                </Col>
                                <Col md={2} className="pt-4 pb-4">
                                    <Button onClick={(e)=>{handleDeseo(p.id_producto)}} variant="outline-danger">
                                        Eliminar
                                    </Button>
                                </Col>
                            </>
                        ))
                    }
                </Row>
            </Col>
            <Col md={3}>
                <MiCarritoResumen productos={productos} />
            </Col>
        </Row>
    )
}
