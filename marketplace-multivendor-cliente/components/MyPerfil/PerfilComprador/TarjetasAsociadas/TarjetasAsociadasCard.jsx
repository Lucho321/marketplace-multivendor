import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { deleteTarjeta } from '../../../../services/usuarios.service'
import { TarjetasAsociadasModal } from './TarjetasAsociadasModal'
import Swal from 'sweetalert2'

export const TarjetasAsociadasCard = ({tarjeta, onDelete}) => {


    const handleEliminarTarjeta = (e)=>{
        deleteTarjeta(tarjeta.id_tarjeta)
            .then(res=>{
                if(res==="Tarjeta eliminada exitosamente"){
                    onDelete();
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Tarjeta eliminada exitosamente`,
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
                        <img className="mr-2" src="/images/payment.png" alt="logo" width="40rem"/>
                    </Col>
                    <Col md={3} className="text-left pl-0 ml-0">
                        <Row>
                            <Col>
                                <p  className="mb-0 pb-0"><strong>{tarjeta.numero_tarjeta}</strong></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="mb-0 pb-0">{tarjeta.nombre_propietario}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Row>
                            <Col>
                                <p  className="mb-0 pb-0">{`Vence: ${tarjeta.fecha_vence}`}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="mb-0 pb-0">CVV: ***</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <Row>
                            <Col className="pt-2">
                                <p  className="mb-0 pb-0">Saldo:<strong>{` $${tarjeta.saldo}`}</strong></p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={2} className="text-right pt-1">
                        <Row>
                            <Col className="ml-0 pl-0">
                                <Button onClick={handleEliminarTarjeta} variant="outline-danger">
                                    <small>Eliminar</small>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
