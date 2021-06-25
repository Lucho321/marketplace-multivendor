import React, { useState, useEffect } from 'react'
import { Col, Row, Modal, Form, InputGroup, Button } from 'react-bootstrap'
import { deleteDeseoCarrito, getDeseoCarrito, insertarDeseosOCarrito } from '../../services/productos.service';
import Swal from 'sweetalert2'

export const CarritoComponent = ({altura, idProducto}) => {
    const [modalShow, setModalShow] = useState(false);
    const [ existe, setExiste ] = useState(false);
    const [ deseoCarritoId, setDeseoCarritoId ] = useState();
    let usuarioLogeado;
    const [ cantidad, setCantidad ] = useState(1);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.deseos){
                    setDeseoCarritoId(usuarioLogeado.carrito);
                    existeDeseoCarrito(usuarioLogeado.carrito);
                }
            }
        }
    }, [])


    const existeDeseoCarrito = (idDeseoCarrito) =>{ 
        getDeseoCarrito(idProducto, idDeseoCarrito).then(res=>{
            console.log(res);
            if(res[0]){
                setExiste(true);
            }else{
                setExiste(false);
            }
        })
    }

    const handleDeseo = (e)=>{
        setModalShow(false);
        if(existe){
            deleteDeseoCarrito(deseoCarritoId, idProducto).then(res=>{
                if(res === "Registro eliminado exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Se ha quitado el producto de tu carrito`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    existeDeseoCarrito(deseoCarritoId);
                }
            })
        }else{
            let carrito_deseo = {
                id_carrito_deseo: deseoCarritoId,
                id_producto: idProducto,
                cantidad: cantidad
            }
            insertarDeseosOCarrito(carrito_deseo).then(res=>{
                if(res === "Registro agregado exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Producto agregado al carrito`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    existeDeseoCarrito(deseoCarritoId);
                }
            })
        }
    }

    return (
        <>
            { !existe && <img style={{cursor:"pointer"}} onClick={(e)=>{setModalShow(true)}} className="ml-2 d-inline-block align-top" src="/images/micarrito2.png" title="Mi carrito de compras" alt="logo" height={altura+3}/>}
            { existe && <img style={{cursor:"pointer"}} onClick={handleDeseo} className="ml-2 d-inline-block align-top" src="/images/micarrito.png" title="Mi carrito de compras" alt="logo" height={altura}/>}
            <Modal show={modalShow} onHide={() => {setModalShow(false); setCantidad(1)}} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto a mi carrito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form inline>
                                <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                    Cantidad:
                                </Form.Label>
                                <Form.Control
                                    value={cantidad}
                                    onChange={(e)=>{setCantidad(e.target.value)}}
                                    min={1}
                                    size="sm"
                                    type="number"
                                    className=""
                                    id="inlineFormCustomSelectPref"
                                    style={{width:"60%"}}
                                ></Form.Control>
                            </Form>
                        </Col>
                        <Col>
                            <Button onClick={handleDeseo} variant="outline-info" block>Agregar</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
