import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { getUsuarioById, updateUsuario, getRedesSocialesByUsuario } from '../../../services/usuarios.service'
import { RedSocialCard } from './RedSocial/RedSocialCard'
import { RedSocialModal } from './RedSocial/RedSocialModal'
import Swal from 'sweetalert2'

export const InformacionGeneral = () => {
    const [modalShow, setModalShow] = useState(false);
    const [ nombre, setNombre ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ pais, setPais ] = useState('');
    const [ direccion, setDireccion ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [ usuario, setUsuario ] = useState({});
    const [ usuarioId, setUsuarioId ] = useState();
    const [ redesSociales, setRedesSociales ] = useState([]);

    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    getUsuario(usuarioLogeado.id_usuario);
                    setUsuarioId(usuarioLogeado.id_usuario);
                    getRedesSociales(usuarioLogeado.id_usuario);
                }
            }
        }
    }, [])

    const validarAlgoCambio=()=>{
        if(nombre != usuario.nombre_real || username != usuario.nombre_usuario || email != usuario.email || pais != usuario.pais || telefono != usuario.telefono || direccion != usuario.direccion){
            return true;
        }
        return false;
    };

    const getUsuario = async(id)=>{
        getUsuarioById(id).then(u=>{
            setNombre(u[0].nombre_real);
            setUsername(u[0].nombre_usuario);
            setEmail(u[0].email);
            setPais(u[0].pais);
            setDireccion(u[0].direccion);
            setTelefono(u[0].telefono);
            setUsuario(u[0]);
        })
    };


    const getRedesSociales = (usr)=>{
        getRedesSocialesByUsuario(usr).then(r=>{
            setRedesSociales(r);
        })
    };

    const handleUpdateUser = (e)=>{
        e.preventDefault();
        usuario.nombre_real = nombre;
        usuario.nombre_usuario = username;
        usuario.email = email; 
        usuario.pais = pais;
        usuario.telefono = telefono;
        usuario.direccion = direccion;

        updateUsuario(usuario)
            .then(res=>{
                if(res==="Usuario actualizado exitosamente."){
                    
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Tu usuario ha sido editado correctamente`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    getUsuario(usuarioId);
                }
            });
    }

    



    return (
        <Row className="p-4 mb-3">
            <Col md={12}>
                <Row className="mb-2">
                    <Col>
                        <h5>Información Personal</h5>
                    </Col>
                </Row>
                <Row >
                    <Col className="mb-3">
                        <Form onSubmit={handleUpdateUser}>
                            <Row>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Nombre real</Form.Label>
                                        <Form.Control name="nombre" value={ nombre } onChange={ (e)=>{setNombre(e.target.value);}} type="text" placeholder="Este es tu nombre real" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control name="email" value={ email } onChange={ (e)=>{setEmail(e.target.value);}} type="email" placeholder="Aquí va tu email" />
                                            <Form.Text className="text-muted"></Form.Text>
                                        </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Nombre de usuario</Form.Label>
                                        <Form.Control name="username" value={ username } onChange={ (e)=>{setUsername(e.target.value);}} type="text" placeholder="Este es tu nombre de usuario" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control name="telefono" value={ telefono } onChange={ (e)=>{setTelefono(e.target.value);}} type="text" placeholder="Este es tu número de teléfono" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>País</Form.Label>
                                        <Form.Control name="pais" value={ pais } onChange={ (e)=>{setPais(e.target.value);}} type="text" placeholder="País donde vives" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group >
                                            <Form.Label>Dirección</Form.Label>
                                            <Form.Control name="direccion" value={ direccion } onChange={ (e)=>{setDireccion(e.target.value);}} type="text" placeholder="Esta es tu dirección" />
                                            <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2 text-right">
                                    <Button variant="info" type="submit" disabled={!validarAlgoCambio()}>
                                        Guardar cambios
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form>
                    </Col>
                </Row>
                <hr/>
                <Row className="mb-4 pt-3">
                    <Col md={9}>
                        <h5>Redes Sociales</h5>
                    </Col>
                    <Col md={3} className="text-right">
                        <Button variant="info" onClick={() => setModalShow(true)}>
                            Agregar red social
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Row>
                                {redesSociales.map( rs => (
                                    <Col md={6}>
                                        <RedSocialCard key={rs.id_red_social} redsocial={rs}/>
                                    </Col>
                                ))}
                                
                            </Row>
                            <RedSocialModal show={modalShow} onHide={() => {setModalShow(false); getRedesSociales(usuarioId);}} />
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
