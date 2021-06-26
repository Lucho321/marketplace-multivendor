import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { getTarjetasByUsuario } from '../../../../services/usuarios.service';
import { TarjetasAsociadasCard } from './TarjetasAsociadasCard'
import { TarjetasAsociadasModal } from './TarjetasAsociadasModal';

export const TarjetasAsociadas = () => {
    const [modalShow, setModalShow] = useState(false);
    const [ usuarioId, setUsuarioId ] = useState();
    const [ tarjetas, setTarjetas ] = useState([]);

    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setUsuarioId(usuarioLogeado.id_usuario);
                    getTarjetas(usuarioLogeado.id_usuario);
                }
            }
        }
    }, [])

    const getTarjetas = (usr)=>{
        getTarjetasByUsuario(usr).then(r=>{
            setTarjetas(r);
        })
    };

    const getTarjetas2 = ()=>{
        getTarjetas(usuarioId);
    };


    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-5">
                    <Col md={9}>
                        <h5>Tarjetas Asociadas</h5>
                    </Col>
                    <Col md={3} className="text-right">
                        <Button variant="info" onClick={() => setModalShow(true)}>
                            Agregar tarjeta
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {tarjetas.map( t => (
                        <Col md={12} className="mb-3">
                            <TarjetasAsociadasCard key={t.id_tarjeta} tarjeta={t} onDelete={getTarjetas2}/>
                        </Col>
                    ))}
                </Row>
            </Col>
            <TarjetasAsociadasModal modalidad="Agregar" alGuardar={getTarjetas2} show={modalShow} onHide={() => {setModalShow(false);}}/>
        </Row>
    )
}
