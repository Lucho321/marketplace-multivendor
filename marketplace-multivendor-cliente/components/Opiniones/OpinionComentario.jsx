import React, { useState, useEffect } from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card, Form, Image } from 'react-bootstrap'
import { getUsuarioById } from '../../services/usuarios.service';


export const OpinionComentario = ({idUsuario, comentario}) => { 
    const [usuario, setUsuario] = useState([]);

    let usuarioLogeado;
    useEffect(() => {
        getUsuario();
                
    }, [])

    const getUsuario = () =>{
        console.log(idUsuario)
        getUsuarioById(idUsuario).then(r => {
            console.log(r);
            setUsuario(r[0]);
            
        })

    }

    return (
        <Col md={12} className="mb-1">
            <Row>
                <Col md={1} className="text-center">
                    <Image src={`/images/files/${usuario.fotografia}`} style={{width:"68px", height:"59px"}} roundedCircle />
                </Col>
                <Col md={11}>
                    <Row className="mb-1">
                        <Col style={{fontSize:"0.7rem"}}>
                            @{usuario.nombre_usuario}
                        </Col>
                        <Col className="text-right" style={{fontSize:"0.7rem"}}>
                            02/06/2021
                        </Col>
                    </Row>
                    <Form.Group >
                        {
                            usuario.nombre_usuario && <Form.Control readOnly value={comentario.comentario}/>
                        }
                    </Form.Group>
                </Col>
            </Row>
            
        </Col>
    )
}
