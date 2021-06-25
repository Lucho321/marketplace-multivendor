import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Image } from 'react-bootstrap'
import { getProductoById } from '../../services/productos.service';

export const MiCarritoResumenCard = ({productoId, productoCarrito}) => {
    const [ producto, setProducto ] = useState({});

    useEffect(() => {
        getProducto();
    }, [])

    const getProducto = () =>{ 
        getProductoById(productoId).then(res=>{
            if(res[0]){
                setProducto(res[0]);
            }
            
        })
    }
    return (
        <div style={{backgroundColor:"#fafafa", borderRadius:"6px", padding:"5px", paddingBottom:"0", marginBottom:"5px"}}>
            <Row>
                <Col> 
                    <p style={{paddingBottom:"0", fontSize:"0.8rem"}}>{producto.nombre_producto}</p>
                </Col>
                <Col>
                    <p style={{paddingBottom:"0", fontSize:"0.8rem"}}>Total: ${(productoCarrito.cantidad *(producto.precio+producto.costo_envio))}</p>
                    
                </Col>
            </Row>
        </div>
    )
}
