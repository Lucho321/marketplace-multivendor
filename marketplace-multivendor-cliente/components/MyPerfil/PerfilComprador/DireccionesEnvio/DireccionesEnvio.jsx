import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { DireccionesEnvioCard } from './DireccionesEnvioCard';
import { DireccionesEnvioModal } from './DireccionesEnvioModal';
import { getDireccionesByUsuario } from '../../../../services/usuarios.service';

export const DireccionesEnvio = () => {
    const [modalShow, setModalShow] = useState(false);
    const [ usuarioId, setUsuarioId ] = useState();
    const [ direcciones, setDirecciones ] = useState([]);

    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setUsuarioId(usuarioLogeado.id_usuario);
                    getDirecciones(usuarioLogeado.id_usuario);
                }
            }
        }
    }, [])

    const getDirecciones = (usr)=>{
        getDireccionesByUsuario(usr).then(r=>{
            setDirecciones(r);
            console.log(r);
        })
    };

    const getDirecciones2 = ()=>{
        getDirecciones(usuarioId);
    }

    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-5">
                    <Col md={9}>
                        <h5>Direcciones de envío</h5>
                    </Col>
                    <Col md={3} className="text-right">
                        <Button variant="info" onClick={() => setModalShow(true)}>
                            Agregar dirección
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {direcciones.map(t => (
                        <Col md={12} className="mb-3">
                            <DireccionesEnvioCard key={t.id_direccion} direccion={t} onDelete={getDirecciones2}/>
                        </Col>
                    ))}
                </Row>
            </Col>
            <DireccionesEnvioModal modalidad="Agregar" alGuardar={getDirecciones2} show={modalShow} onHide={() => {setModalShow(false);}}/>
        </Row>
    )
}
