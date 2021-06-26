import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { getAllProductos, getProductosByTienda, getProductosByNombreAndTienda, deleteProducto, getCantidadProductoDeseo } from '../services/productos.service';
import { useForm } from '../context/hooks/useForm';
import Link from 'next/link';
import Swal from 'sweetalert2'
import ReactStars from "react-rating-stars-component";
import { getComentariosByProducto } from '../services/comentarios.service';
import { OpinionComentario } from './Opiniones/OpinionComentario';


export const ComunidadTienda = ({Producto}) => {
    const [ cantidadDeseos, setCantidadDeseos ] = useState(0);
    const [ comentarios, setComentarios ] = useState([]);
    useEffect(() => {
        getComentarios();
        getCantidadDeseos();
    }, [Producto])

    
    
    const getCantidadDeseos = ()=>{
        getCantidadProductoDeseo(Producto.id_producto).then(p=>setCantidadDeseos(p));
    }

    const getComentarios = () => {
        getComentariosByProducto(Producto.id_producto).then(r=>{
            setComentarios(r);
        })
    }


    return (
        <>
            <Row className="pb-4 pl-4 pr-4 pt-3 mb-3">
                <Col md={4} className="pt-4 text-center">
                    <h3 style={{color:"#1abc9c"}}>{Producto.nombre_producto}</h3>
                </Col>
                <Col md={3} className="pt-4 text-center">
                    <ReactStars
                        value={parseInt(Producto.calificacion)}
                        count={5}
                        edit={false}
                        size={35}
                        activeColor="#ffd700"
                    />
                </Col>
                <Col md={3} className="pt-1 text-center">
                    <h2>{cantidadDeseos}</h2>
                    Cantidad de usarios que tienen el producto en la lista de deseos
                </Col>
            </Row>
            <Row className="mt-2">
                {comentarios.map(t => (
                    <OpinionComentario modalidad="producto" idUsuario={t.id_usuario} comentario={t}/> 
                ))}
            </Row>
        </>
    )
}
