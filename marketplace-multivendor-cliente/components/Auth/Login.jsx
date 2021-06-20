import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from '../../context/hooks/useForm';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';


export const Login = () => {
    const router = useRouter();
    
    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_usuario: email, contrasena:password })
            };
            const loginRes = await fetch('http://127.0.0.1:5000/login', requestOptions)
                .then(response => response.json())
                // .then(data => setPostId(data.id));

                console.log(loginRes);
                
            // const loginRes = await fetch(
            //     'https://jsonplaceholder.typicode.com/todos'
            //   ).then((response) => response.json());
            router.push('/');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container fluid >
            <Row>
                <Col sm={0} md={6} className="p-5" style= {{
                            backgroundImage: `url('/images/login.png')`,
                            width:"100%",
                            height:"39.05rem",
                            color:"white",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}>
                    <Row className="d-flex justify-content-center pt-5">
                        <Col md={8} className="text-center pt-5 mt-5">
                            <h1>Bienvenido</h1>
                        </Col>
                        <Col md={8} className="text-center pt-2">
                            <h3><small>A Lujepa Market, la tienda online más grande del mundo</small></h3>
                        </Col>
                        <Col md={12} className="text-center pt-3">
                            <h5><small>¡Compra ya, sin la necesidad de salir de tu casa!</small></h5>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <Row>
                        <Col className="text-center mt-4 pt-5">
                            <img src="/images/markets.png" alt="imglogin" height="30" style={{display: "inline-block", paddingBottom:"5px"}}/>
                            <h6 style={{display: "inline-block", paddingLeft:"3px"}}>Lujepa Market</h6>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col md={8} className="mt-3 mb-5 pb-5 pl-5 pr-5 pt-3 bg-light" style={{borderRadius:"10px"}}>
                            <Row>
                                <Col className="pt-3 pb-3 text-center">
                                    <h2>Login</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form onSubmit={ handleLogin }>
                                        <Row>
                                            <Col md={12}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control value={ email } onChange={ handleInputChange } name="email" placeholder="Enter email" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Contraseña</Form.Label>
                                                    <Form.Control value={ password } onChange={ handleInputChange } name="password" type="password" placeholder="Password" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} className="text-center mt-3">
                                                <Button  variant="info" type="submit" style={{margin:"auto", width:"100%"}}>
                                                    Iniciar Sesión
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center mt-5" style={{fontSize:"0.75rem"}}>
                            &copy; 2021 lujepamarket.com - Todos los derechos reservados.
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
