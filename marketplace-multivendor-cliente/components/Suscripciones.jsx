import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, Modal, Image } from 'react-bootstrap'
import { getSuscripcionByTienda } from '../services/tiendas.service'
import { getUsuarioByComprador } from '../services/usuarios.service';
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

    const getUsuario = async(idComprador)=>{
        let u = await getUsuarioByComprador(idComprador);
        return u[0];
    }

    const getSuscripciones = async(id)=>{
        let t = await getSuscripcionByTienda(parseInt(id));
        if(t.length > 0){
            let sus = [];
            for(let i in t){
                let usu = await getUsuario(t[i].id_comprador);
                sus.push(usu);
            }
            setSuscripciones(sus);
        }
    
    };



    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="pt-1 mb-3">
                    <Col>
                        <h4  style={{color:"#1abc9c"}}>Suscriptores</h4>
                    </Col>
                </Row>
                <Row className="pt-2 mb-5">
                    <Col md={12} >
                        <Row>
                            {
                                suscripciones.map(s=>(
                                    <SuscriptorCard s={s} key={s.id_usuario}/>
                                    
                                ))
                            }
                        </Row>
                    </Col>
                </Row>
            </Col>
            
        </Row>
    )
}

