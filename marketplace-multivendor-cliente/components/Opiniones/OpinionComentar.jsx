import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Form,  } from 'react-bootstrap'
import { insertComentario } from '../../services/comentarios.service'
import Swal from 'sweetalert2' 

export const OpinionComentar = ({idProducto}) => {

    const[ id_usuario, setIdUsuario ] = useState('');
    const[ comentario, setComentario ] = useState('');
    const[ nivel, setNivel ] = useState('');
    const[ id_producto, setProducto ] = useState('');
    const[ padre, setPadre ] = useState('');


    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setIdUsuario(usuarioLogeado.id_usuario);
                }
            }
        }
    }, [])


    const handleComentar = (e)=>{
        let comentarioG = {
            id_usuario: id_usuario,
            comentario: comentario,
            nivel: null,
            id_producto: idProducto,
            padre: null
        }
        console.log(comentarioG);
        insertComentario(comentarioG)
            .then(res=>{
                if(res==="Comentario agregado exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Comentario agregado exitosamente`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    
                    setIdUsuario('');
                    setComentario('');
                    setNivel('');
                    setProducto('');
                    setPadre('');
                }
            });
            
    }

    return (
        <Row>
            <Col md={12}>
                <Form>
                    <Form.Row className="align-items-center">
                        <Col md="10">
                            <Form.Group style={{width:"100%"}}>
                                <Form.Label htmlFor="inlineFormInput" srOnly>
                                    Escribe aquí tu comentario
                                </Form.Label>
                                <Form.Control
                                    onChange={(e)=>{setComentario(e.target.value)}}
                                    value={comentario}
                                    name="comentario"
                                    className="mb-2"
                                    id="inlineFormInput"
                                    placeholder="Escribe aquí tu comentario"
                                />
                            </Form.Group>
                        </Col>
                        <Col md="2">
                            <Button variant="outline-info" onClick={handleComentar} className="mb-3" block>
                                Comentar
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>
            
        </Row>
    )
}
