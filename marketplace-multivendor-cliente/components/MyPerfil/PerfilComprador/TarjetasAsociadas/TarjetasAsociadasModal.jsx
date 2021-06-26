import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Form, InputGroup, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { insertTarjeta } from '../../../../services/usuarios.service';

export const TarjetasAsociadasModal = (props) => {
    const { modalidad } = props;
    const [ numberCard, setNumberCard ] = useState('');
    const [ expiritionNumber, setExpiritionNumber ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ codigoSeguridad, setCodigoSeguridad ] = useState('');
    const [ saldo, setSaldo ] = useState('');
    const [ idUsuario, setIdUsuario ] = useState();
   
 
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



    const handleNumberCardChange = (e)=>{
        let number = e.target.value.split('-').join("");
        if(number.length > 0){
            number = number.match(new RegExp('.{1,4}', 'g')).join("-");
        }
        setNumberCard(number);
    }
    const handleExpiritionChange = (e)=>{
        let number = e.target.value.split('/').join("");
        if(number.length > 0){
            number = number.match(new RegExp('.{1,2}', 'g')).join("/");
        }
        setExpiritionNumber(number);
    }


    const validarCamposVacios = ()=>{
        if(numberCard.length === 19 && expiritionNumber.length === 5 && nombre.length > 0 && codigoSeguridad.length === 3 && saldo.length > 0){
            return true;
        }
        return false;
    }

    const handleGuardarTarjeta = (e)=>{
        let num = numberCard.replaceAll("-", "");
        let tarjetaG = {
            nombre_propietario: nombre,
            numero_tarjeta: num,
            codigo_cvv: codigoSeguridad,
            fecha_vence: expiritionNumber,
            saldo: saldo,
            id_comprador: idUsuario
        }
        console.log(tarjetaG);
        insertTarjeta(tarjetaG)
            .then(res=>{
                if(res==="Tarjeta agregada exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Tarjeta registrada exitosamente`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    setNumberCard('');
                    setExpiritionNumber('');
                    setNombre('');
                    setCodigoSeguridad('');
                    setSaldo('');
                    props.alGuardar();
                }
            });
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{`${modalidad} tarjeta`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="">
                    <Col className="text-center">
                        <img className="mr-2" src={`/images/visa.png`} alt="logo" height="30"/>
                        <img className="mr-2" src={`/images/american.png`} alt="logo" height="25"/>
                        <img className="mr-2" src={`/images/mastercard.png`} alt="logo" height="25"/>
                        <img className="mr-2" src={`/images/jcn.png`} alt="logo" height="25"/>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-1">
                        <Form.Group >
                            <Form.Label>Nombre completo del titular</Form.Label>
                            <Form.Control autoComplete="off" value={nombre} onChange={(e)=>setNombre(e.target.value)} name="nombre" placeholder="Ej. Pablo Andrés Venegas Elizondo" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <Form.Group >
                            <Form.Label>Número de tarjeta (16 dígitos)</Form.Label>
                            <Form.Control autoComplete="off" value={numberCard} onChange={handleNumberCardChange} maxLength="19" name="num_tarjeta" placeholder="Ej. 5517-5401-3276-0815" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Fecha de vencimiento (me/añ)</Form.Label>
                            <Form.Control autoComplete="off" value={expiritionNumber} onChange={handleExpiritionChange} maxLength="5" name="fecha_vencimiento" placeholder="Ej. 03/22" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Código de seguridad</Form.Label>
                            <Form.Control autoComplete="off" value={codigoSeguridad} onChange={(e)=>setCodigoSeguridad(e.target.value)} type="password" maxLength="3" name="codigo_seguridad" placeholder="Ej. 613" />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                {
                    modalidad === "Agregar" &&  <Row className="mt-1">
                                                    <Col md={6}>
                                                        <Form.Group >
                                                            <Form.Label>Saldo</Form.Label>
                                                            <InputGroup hasValidation>
                                                                <InputGroup.Prepend>
                                                                    <InputGroup.Text>$</InputGroup.Text>
                                                                </InputGroup.Prepend>
                                                                <Form.Control autoComplete="off" value={saldo} onChange={(e)=>setSaldo(e.target.value)} maxLength="5" name="saldo" placeholder="Ej. 1000000" />
                                                            </InputGroup>
                                                            <Form.Text className="text-muted"></Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                }
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
                <Button onClick={handleGuardarTarjeta} disabled={!validarCamposVacios()} variant="info">Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}
