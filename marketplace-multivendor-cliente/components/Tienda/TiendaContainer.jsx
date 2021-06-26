import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Image, Tabs, Tab, Spinner } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";
import { ProductosTienda } from './ProductosTienda';
import { OpinionesTienda } from './OpinionesTienda';
import { getTiendaById, getSuscripcionByTiendaComprador, insertSuscripcion, deleteSuscripcion } from '../../services/tiendas.service';
import Swal from 'sweetalert2'

export const TiendaContainer = ({tiendaId}) => {
    const [key, setKey] = useState('productos');
    const [ tienda, setTienda ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ suscripcion, setSuscripcion ] = useState('');
    const [ idUsuario, setIdUsuario ] = useState();
    const getTienda = async()=>{
        getTiendaById(tiendaId).then(t=>{setTienda(t[0]); setLoading(false);});
    }

    const getSuscripcion = async(id)=>{
        getSuscripcionByTiendaComprador(parseInt(tiendaId), parseInt(id))
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
            insertSuscripcion(parseInt(tiendaId), parseInt(idUsuario))
                .then(t=>{
                    if(t==="Registro agregado exitosamente."){
                        Swal.fire({
                            icon: 'success',
                            title: `Excelente`,
                            text: `Te has suscrito correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                        getTienda();
                        getSuscripcion(idUsuario);
                    }
                });
        }else{
            deleteSuscripcion(parseInt(tiendaId), parseInt(idUsuario))
            .then(t=>{
                if(t==="Registro eliminado exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Ya no estás suscrito a la tienda`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    getTienda();
                    getSuscripcion(idUsuario);
                }
            });
        }
        
    };


    let usuarioLogeado;
    useEffect(() => {
        
        getTienda();

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



    if(loading){
        return  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
    }


    return (
        <>
            <Row className="p-5 bg-light">
                <Col md={3}>
                    <Image style={{border:"0.8px solid #aaa"}} src={`/images/files/${tienda.fotografia}`} height="150" width="100%" />
                </Col>
                <Col md={9}>
                    <Row>
                        <Col md={10} style={{fontSize:"0.8rem"}}>
                            <h4><strong>{tienda.nombre_tienda}</strong></h4>
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
                            {tienda.nombre_tienda}
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8" className="mt-3" style={{fontSize:"0.7rem"}}>
                            {`Productos: ${tienda.cant_productos}`}
                        </Col>
                        <Col md="4" className="mt-1 mp-2 text-center">
                            <Button onClick={handleSuscripcion} className="mr-2" variant="outline-info" size="sm">{suscripcion}</Button>
                            <Button variant="outline-info" size="sm">Reportar abuso</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={12} style={{color:"#212529"}}>
                    <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        style={{color:"#212529!important"}}
                    >
                        <Tab eventKey="productos" title="Productos">
                            <ProductosTienda tienda={tiendaId} />
                        </Tab>
                        <Tab eventKey="opiniones" title="Comentarios y más">
                            <OpinionesTienda tiendaId={tiendaId}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </>
    )
}
