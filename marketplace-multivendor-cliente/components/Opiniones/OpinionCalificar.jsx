import { React, useState, useEffect } from 'react'
import ReactStars from "react-rating-stars-component"
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import { insertCalificacionTienda, updateCalificacionTienda, insertCalificacionProducto, updateCalificacionProducto, getTiendasCalificacionesByTiendaAndUsuario } from '../../services/tiendas.service';
import { getProductosCalificacionesByProductoAndUsuario } from '../../services/productos.service';
import Swal from 'sweetalert2'

export const OpinionCalificar = (params) => {
    const [ usuarioId, setUsuarioId ] = useState();
    const [ newRating , setRating ] = useState();

    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

    let usuarioLogeado;
    useEffect(() => {
        
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setUsuarioId(usuarioLogeado.id_usuario);
                }
            }
        }
    }, [])

    const handleCalificar = (e)=>{
        let res;
        if(params.modalidad == "tienda"){
            getTiendasCalificacionesByTiendaAndUsuario(params.tiendaId, usuarioId)
                .then(t=>{
                    console.log(t);
                    if(t.length == 0){
                        insertCalificacionTienda(parseInt(usuarioId), parseInt(params.tiendaId), newRating)
                        .then(t=>{
                            if(t==="Calificación tienda agregada exitosamente."){
                                Swal.fire({
                                    icon: 'success',
                                    title: `Excelente`,
                                    text: `Has calificado la tienda!`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            }
                        });
                    }else{
                        updateCalificacionTienda(t[0].id_tienda_calificacion, parseInt(params.tiendaId), newRating)
                        .then(t=>{
                            if(t==="Calificacion de la tienda actualizada exitosamente."){
                                Swal.fire({
                                    icon: 'success',
                                    title: `Excelente`,
                                    text: `Has cambiado tu calificación de la tienda!`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            }
                        })
                    }
                })
            
        }else{
            getProductosCalificacionesByProductoAndUsuario(params.idProducto, usuarioId)
                .then(t=>{
                    console.log(t);
                    if(t.length == 0){
                        insertCalificacionProducto(parseInt(usuarioId), parseInt(params.idProducto), newRating)
                        .then(t=>{
                            if(t==="Calificación producto agregada exitosamente."){
                                Swal.fire({
                                    icon: 'success',
                                    title: `Excelente`,
                                    text: `Has calificado el producto!`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            }
                        });
                    }else{
                        console.log(t)
                        updateCalificacionProducto(t[0].id_producto_calificacion, parseInt(params.idProducto), newRating)
                        .then(t=>{
                            if(t==="Calificacion del producto actualizada exitosamente."){
                                Swal.fire({
                                    icon: 'success',
                                    title: `Excelente`,
                                    text: `Has cambiado tu califición del producto!`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            }
                        })
                    }
                })
        }
    }
    return (
        <Row className="pl-4">
            <Col>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />
            </Col>
            <Col className="pt-1">
                <Button onClick={handleCalificar} variant="outline-info" size="sm">Calificar</Button>
            </Col>
        </Row>
    )
    
}
