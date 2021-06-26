import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, Modal, Image } from 'react-bootstrap'
import { getSuscripcionByTienda } from '../services/tiendas.service'
import { SuscriptorCard } from './Suscriptores/SuscriptorCard';

export const Suscripciones = () => {
    const [ suscripciones, setSuscripciones ] = useState([]);
    const [ idUsuario, setIdUsuario ] = useState();

    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setIdUsuario(usuarioLogeado.id_tienda);
                    getSuscripciones(usuarioLogeado.id_tienda);
                }
            }
        }
    }, [])


    const getSuscripciones = (id)=>{
        getSuscripcionByTienda(parseInt(id))
        .then(t=>{
            setSuscripciones(t);
        });
    
    };


    const suscripcioness = [
        {
            nombre_usuario: "pablove",
            pais:"Costa Rica",
            fotografia:"usr-4-2130.jpg",
            email:"pablo@gmail.com",
            id_usuario:4
        },
        {
            nombre_usuario: "pablove",
            pais:"Costa Rica",
            fotografia:"usr-4-2130.jpg",
            email:"pablo@gmail.com",
            id_usuario:4
        },
        {
            nombre_usuario: "pablove",
            pais:"Costa Rica",
            fotografia:"usr-4-2130.jpg",
            email:"pablo@gmail.com",
            id_usuario:4
        },
        {
            nombre_usuario: "pablove",
            pais:"Costa Rica",
            fotografia:"usr-4-2130.jpg",
            email:"pablo@gmail.com",
            id_usuario:4
        }
    ]

    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="pt-1 mb-3">
                    <Col>
                        <h4  style={{color:"#1abc9c"}}>Suscriptores</h4>
                    </Col>
                </Row>
                <Row className="pt-1 mb-3">
                    <Col md={6} style={{borderRight:"solid 2px #b3e7df"}}>
                        <Row>
                            {
                                suscripcioness.map(s=>(
                                    <Col md={12} className="mb-4">
                                        <Row>
                                            <Col md={2} className="text-center">
                                                <Image src={`/images/files/${s.fotografia}`} style={{width:"68px", height:"59px"}} roundedCircle />
                                            </Col>
                                            <Col md={10}>
                                                <Row>
                                                    <Col>
                                                        <h5>@{s.nombre_usuario}<small> - {s.pais}</small></h5>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <small>{s.email}</small>
                                                    </Col>
                                                </Row>
                                                
                                            </Col>
                                        </Row>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                    <Col md={6}>

                    </Col>
                    
                </Row>
            </Col>
        </Row>
    )
}
