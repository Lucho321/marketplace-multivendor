import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Image, InputGroup, FormControl, Card } from 'react-bootstrap'
import Link from 'next/link'
import ReactStars from "react-rating-stars-component";
import { getSuscripcionByTiendaComprador, insertSuscripcion, deleteSuscripcion } from '../../services/tiendas.service';
import Swal from 'sweetalert2'

export const TiendaCard = ({tienda}) => {
    const [ suscripcion, setSuscripcion ] = useState('');
    const [ idUsuario, setIdUsuario ] = useState();

    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setIdUsuario(usuarioLogeado.id_comprador);
                    getSuscripcion(usuarioLogeado.id_comprador);
                }
            }
        }
    }, [])
  

    const getSuscripcion = async(id)=>{
        getSuscripcionByTiendaComprador(parseInt(tienda.id_tienda), parseInt(id))
        .then(t=>{
            if(t[0]){
                setSuscripcion('Quitar suscripción');
            }else{
                setSuscripcion('Suscribirme');
            }
        });
    
    };

    const handleSuscripcion = (e)=>{
        if(suscripcion==="Suscribirme"){
            insertSuscripcion(parseInt(tienda.id_tienda), parseInt(idUsuario))
                .then(t=>{
                    if(t==="Registro agregado exitosamente."){
                        Swal.fire({
                            icon: 'success',
                            title: `Excelente`,
                            text: `Te has suscrito correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                        getSuscripcion(idUsuario);
                    }
                });
        }else{
            deleteSuscripcion(parseInt(tienda.id_tienda), parseInt(idUsuario))
            .then(t=>{
                if(t==="Registro eliminado exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Ya no estás suscrito a la tienda`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    getSuscripcion(idUsuario);
                }
            });
        }
        
    };


    console.log(tienda);
    return (
        <div  style={{marginBottom:"1.5rem"}}>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={3}>
                            <Image style={{border:"0.8px solid #aaa"}} src={`/images/files/${tienda.fotografia}`} height="150" width="100%" />
                        </Col>
                        <Col md={9}>
                            <Row>
                                <Col md={10} style={{fontSize:"0.8rem"}}>
                                    <Link href={`/tienda/${tienda.id_tienda}`}>
                                        <a className="a_productocard">
                                            <h4><strong>{tienda.nombre_tienda}</strong></h4>
                                        </a>
                                    </Link>
                                </Col>
                                <Col md={2} className="text-right">
                                    <ReactStars
                                        value={tienda.calificacion}
                                        count={5}
                                        edit={false}
                                        size={20}
                                        activeColor="#ffd700"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-1">
                                    {tienda.descripcion}
                                </Col>
                            </Row>
                            <Row>
                                <Col md="10" className="mt-3" style={{fontSize:"0.7rem"}}>
                                    {`Productos: ${tienda.cant_productos}`}
                                </Col>
                                <Col md="2" className="mt-1 mp-2">
                                    <Button onClick={handleSuscripcion} variant="outline-info" size="sm" block>{suscripcion}</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

