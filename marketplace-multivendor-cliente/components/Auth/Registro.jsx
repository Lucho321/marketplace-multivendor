import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from '../../context/hooks/useForm';
import Swal from 'sweetalert2'
import Link from 'next/link';

export const Registro = () => {
    const [ cedula, setCedula ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ pais, setPais ] = useState('');
    const [ direccion, setDireccion ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password2, setPassword2 ] = useState('');


    return (
        <Container fluid >
            <Row>
                <Col sm={0} md={12} style= {{
                            backgroundImage: `url('/images/login.png')`,
                            width:"100%",
                            height:"39.05rem",
                            color:"white",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}>
                    <Row className="d-flex justify-content-center">
                        <Col md={8} className="text-center mt-2">
                            <h1>Registro de usuario</h1>
                        </Col>
                        <Col md={8} className="text-center pt-2">
                            <h3><small>Ya casi eres parte de Lujepa Market, la tienda online más grande del mundo</small></h3>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
