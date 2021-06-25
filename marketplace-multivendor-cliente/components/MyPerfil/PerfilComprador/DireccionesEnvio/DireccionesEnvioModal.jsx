import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Form, InputGroup, Button } from 'react-bootstrap'
import { getPaisesOptions } from '../../../../context/data/paises';
import { insertDireccion } from '../../../../services/usuarios.service';
import Swal from 'sweetalert2'
import Select from 'react-select';


export const DireccionesEnvioModal = (props) => {
    const { modalidad } = props;
    const [ codigo_postal, setCodigo ] = useState('');
    const [ numero_casillero, setCasillero ] = useState('');
    const [ observaciones, setObservaciones ] = useState('');
    const [ provincia, setProvincia ] = useState('');
    const [ pais, setPais ] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const optionsPaises = getPaisesOptions();

    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setIdUsuario(usuarioLogeado.id_comprador);
                }
            }
        }
    }, [])

    const validarCamposVacios = ()=>{
        if(pais.length > 0 && provincia.length > 0 && numero_casillero.length > 0 && codigo_postal.length > 0 && provincia.length > 0){
            return true;
        }
        return false;
    }

    const handlePais = (e)=>{
        let rs = e.value;
        setPais(rs);
    }

    const handleGuardarDireccion = (e)=>{
        let direccionG = {
            codigo_postal: codigo_postal,
            id_comprador: idUsuario,
            observaciones: observaciones,
            pais: pais,
            provincia: provincia,
            numero_casillero: numero_casillero
        }
        console.log(direccionG);
        insertDireccion(direccionG)
            .then(res=>{
                if(res==="Dirección agregada exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Dirección registrada exitosamente`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    
                    setCodigo('');
                    setObservaciones('');
                    setProvincia('');
                    setPais('');
                    setCasillero('');
                    props.alGuardar();
                }
            });
    }


    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{`${modalidad} dirección de envío`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="mt-1">
                        <Form.Group >
                            <Form.Label>Dirección detallada</Form.Label>
                            <Form.Control as="textarea" onChange={(e)=>setObservaciones(e.target.value)} value={observaciones} name="observaciones" placeholder="Escribe la dirección aquí" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col md={6}>
                        País
                        <Select
                            onChange={handlePais}
                            value={pais}
                            name="pais"
                            className="mt-2 basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="color"
                            options={optionsPaises}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control onChange={(e)=>setProvincia(e.target.value)} value={provincia} name="provincia" placeholder="Nombre de la provincia" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Código postal</Form.Label>
                            <Form.Control onChange={(e)=>setCodigo(e.target.value)} value={codigo_postal} name="codigo_postal" placeholder="Código postal de tu ciudad" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Número de casillero</Form.Label>
                            <Form.Control onChange={(e)=>setCasillero(e.target.value)} value={numero_casillero} name="numero_casillero" placeholder="Número de casillero" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row  className="mt-0">
                    <Col>
                        <p  className="mb-0 pb-0" style={{fontSize:"0.6rem"}}>
                            La información aquí proporcionada será utilizada con el fin de compras y ventas en la página, 
                            no se utilizará ni compartirán los datos con herramientas o sitios externos.
                        </p>
                    </Col>
                </Row>

                
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleGuardarDireccion} disabled={!validarCamposVacios()} variant="primary">Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}
