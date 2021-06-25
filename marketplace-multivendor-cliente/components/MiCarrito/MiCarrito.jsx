import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Image } from 'react-bootstrap'
import { MiCarritoCard } from './MiCarritoCard'
import { MiCarritoResumen } from './MiCarritoResumen'
import { getProductosCarritoByCarrito } from '../../services/productos.service'

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

    return (
        <Row>
            <Col md={9}>
                <Row>
                    {
                        productos.map(p=>(
                            <Col key={p.id_producto} md={12} className="mb-3">
                                <MiCarritoCard key={p.id_producto} productoCarrito={p} productoId={p.id_producto} />
                            </Col>
                        ))
                    }
                </Row>
            </Col>
            <Col md={3}>
                <MiCarritoResumen />
            </Col>
        </Row>
    )
}
