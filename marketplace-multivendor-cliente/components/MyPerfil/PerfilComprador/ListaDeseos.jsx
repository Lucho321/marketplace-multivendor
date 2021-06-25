import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { getProductosCarritoByCarrito } from '../../../services/productos.service'
import { ListaDeseosCard } from '../../ListaDeseos/ListaDeseosCard'

export const ListaDeseos = () => {


    
    const [ deseoCarritoId, setDeseoCarritoId ] = useState();

    const [ productos, setProductos ] = useState([]);
    let usuarioLogeado;


    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.deseos){
                    setDeseoCarritoId(usuarioLogeado.deseos);
                    getProductos(usuarioLogeado.deseos);
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
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-3">
                    <Col md={12}>
                        <h5>Lista de deseos</h5>
                    </Col>
                </Row>
                <Row>
                    {
                        productos.map(p=>(
                            <Col key={p.id_producto} md={12} className="mb-3">
                                <ListaDeseosCard key={p.id_producto} productoId={p.id_producto} modalidad="lista_deseos"/>
                            </Col>
                        ))
                    }
                    
                </Row>
            </Col>
        </Row>
    )
}
