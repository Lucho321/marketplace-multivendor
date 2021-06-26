import React from 'react'
import { Button, Col, Row, Form,  } from 'react-bootstrap'

export const OpinionComentar = () => {

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
