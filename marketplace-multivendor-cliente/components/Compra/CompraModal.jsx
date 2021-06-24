import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Form, InputGroup, Button, Tabs, Tab } from 'react-bootstrap'
import { insertarCompra } from '../../services/productos.service';
import { validarTarjeta } from '../../services/usuarios.service';
import Swal from 'sweetalert2'

export const CompraModal = (props) => {
    const [key, setKey] = useState('Paso 1');
    const [ numberCard, setNumberCard ] = useState('');
    const [ expiritionNumber, setExpiritionNumber ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ codigoSeguridad, setCodigoSeguridad ] = useState('');
    const { producto } = props;
    const [ cantidad, setCantidad ] = useState(1);
    const [ total, setTotal ] = useState(producto.precio + producto.costo_envio)

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

    const handleCantidad = (e)=>{
        setCantidad(e.target.value);
        setTotal((e.target.value*producto.precio)+producto.costo_envio);
    }

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
        if(numberCard.length === 19 && expiritionNumber.length === 5 && nombre.length > 0 && codigoSeguridad.length === 3 ){
            return true;
        }
        return false;
    }

    const handleComprar = (e)=>{
        let num = numberCard.replaceAll("-", "");
        let tarjetaG = {
            nombre_propietario: nombre,
            numero_tarjeta: num,
            codigo_cvv: codigoSeguridad,
            fecha_vence: expiritionNumber,
            id_comprador: idUsuario,
            precio:total
        }

        validarTarjeta(tarjetaG)
            .then(res=>{
                
                 if(res[0].id_tarjeta){
                    let objetoGuardar = {
                        productos:[{producto:producto.nombre_producto, id_producto:producto.id_producto, id_tienda:producto.id_tienda, cantidad: parseInt(cantidad)}],
                        precio_total: total,
                        id_comprador: idUsuario,
                        id_tarjeta: res[0].id_tarjeta,
                    }
                    insertarCompra(objetoGuardar).then(
                        r =>{
                            if(r==="Compra realizada exitosamente."){
                                Swal.fire({
                                    icon: 'success',
                                    title: `Excelente`,
                                    text: `Compra realizada exitosamente`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                                setNumberCard('');
                                setExpiritionNumber('');
                                setNombre('');
                                setCodigoSeguridad('');
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: `Opps`,
                                    text: `Algo salió mal, intenta luego`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            }
                        }
                    );   
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: `Opps`,
                        text: `${res}`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            });
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{`Compra de producto`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    style={{color:"#212529!important"}}
                >
                    <Tab eventKey="Paso 1" title="Paso 1">
                        <Row className="mt-3 mb-3">
                            <Col md={5}>
                                <strong>Datos de producto</strong>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                Producto:{` ${producto.nombre_producto}`}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                Precio:{` $${producto.precio}`}
                            </Col>
                            <Col md={6}>
                                Envío:{` $${producto.costo_envio}`}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form inline>
                                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                        Cantidad:
                                    </Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        className=""
                                        id="inlineFormCustomSelectPref"
                                        style={{width:"50%"}}
                                        min={1}
                                        defaultValue={1}
                                        max={producto.cantidad_disponible}
                                        value={cantidad}
                                        onChange={handleCantidad}
                                    ></Form.Control>
                                </Form>
                            </Col>
                        </Row>
                        <hr/>
                        <Row className="mt-3">
                            <Col md={6}>
                                <strong>Total:</strong>{` $${total}`}
                            </Col>
                            <Col md={6} className="text-right">
                                <Button onClick={()=>setKey('Paso 2')} variant="info">Siguiente</Button>
                            </Col>
                        </Row>      
                    </Tab>
                    <Tab eventKey="Paso 2" title="Paso 2" disabled>
                        <Row className="mt-3 mb-3">
                            <Col md={5}>
                                <strong>Datos de tarjeta</strong>
                            </Col>
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
                        <Row className="mt-3">
                            <Col md={12} className="text-right">
                                <Button onClick={handleComprar} disabled={!validarCamposVacios()} variant="info" block>Comprar</Button>
                            </Col>
                        </Row>  
                    </Tab>
                </Tabs>
            </Modal.Body>

        </Modal>
    )
}

// onClick={} disabled={}