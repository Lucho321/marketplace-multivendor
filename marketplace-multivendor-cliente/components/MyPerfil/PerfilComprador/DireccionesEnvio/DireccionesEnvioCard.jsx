import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { DireccionesEnvioModal } from './DireccionesEnvioModal';
import { deleteDireccion } from '../../../../services/usuarios.service';
import Swal from 'sweetalert2'

export const DireccionesEnvioCard = ({direccion, onDelete}) => {
    const [modalShow, setModalShow] = useState(false);

    const handleEliminarDireccion = (e)=>{
        deleteDireccion(direccion.id_direccion)
            .then(res=>{
                if(res==="Dirección eliminada exitosamente"){
                    onDelete();
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Dirección eliminada exitosamente`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            });
    }

    return (
        <Card className="bg-light">
            <Card.Body>
                <Row>
                    <Col md={1} className="text-left pt-1 mr-0">
                        <img className="mr-2" src="/images/gps.png" alt="logo" width="50rem"/>
                    </Col>
                    <Col md={9} className="text-left pl-0 ml-0">
                        <Row>
                            <Col>
                                <p  className="mb-0 pb-0"><strong>{`Detalle: `}</strong>{direccion.observaciones}</p>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6} style={{fontSize:"0.8rem"}}>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0"><strong>{`Provincia: `}</strong>{direccion.provincia}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0"><strong>{`País: `}</strong>{direccion.pais}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} style={{fontSize:"0.8rem"}}>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0"><strong>{`Código postal: `}</strong>{direccion.codigo_postal}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="mb-0 pb-0"><strong>{`Número casillero: `}</strong>{direccion.numero_casillero}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2} className="text-right pt-1">
                        <Row>
                            <Col className="ml-0 pl-0">
                                <Button onClick={handleEliminarDireccion} variant="outline-danger">
                                    <small>Eliminar</small>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
            <DireccionesEnvioModal modalidad="Editar" show={modalShow} onHide={() => setModalShow(false)}/>
        </Card>
    )
}
