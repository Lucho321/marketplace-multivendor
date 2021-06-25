import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab, Image } from 'react-bootstrap';
import { useForm } from '../../context/hooks/useForm';
import Swal from 'sweetalert2'
import Link from 'next/link';
import { crearUsuario, updateUsuario } from '../../services/usuarios.service';
import { useRouter } from 'next/router';

export const Registro = () => {
    const router = useRouter();

    const [ modalidad, setModalidad ] = useState(0);
    const [key, setKey] = useState('Paso 1');
    const [ cedula, setCedula ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ pais, setPais ] = useState('');
    const [ direccion, setDireccion ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password2, setPassword2 ] = useState('');
    const [ image, setImage ] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState();


    const clean = ()=>{
        setCedula('');
        setDescripcion('');
        setNombre('');
        setUsername('');
        setEmail('');
        setPais('');
        setDireccion('');
        setTelefono('');
        setPassword('');
        setPassword2('');
        setImage(null);
        setCreateObjectURL(null);
    }

    const uploadToClient = (event) => {
        console.log(event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
    
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadToServer = async (_name) => {
        const body = new FormData();
        body.append("file", image);
        body.append("_name", _name);
        const response = await fetch("/api/file", {
          method: "POST",
          body
        });
    };
    


    const getValidarPaso1 = ()=>{
        if(username.length > 0 && image != null){
            return false;
        }
        return true;
    }

    const getValidarPaso2 = ()=>{
        if(nombre.length > 0 && email.length > 0  && pais.length > 0  && cedula.length > 0  && telefono.length > 0  && direccion.length > 0){
            return false;
        }
        return true;
    }

    const getValidarPaso1T = ()=>{
        if(nombre.length > 0 && descripcion.length > 0 && image != null){
            return false;
        }
        return true;
    }

    const getValidarPaso2T = ()=>{
        if(username.length > 0 && email.length > 0  && pais.length > 0  && cedula.length > 0  && telefono.length > 0  && direccion.length > 0){
            return false;
        }
        return true;
    }

    const getValidarPaso3 = ()=>{
        if(password.length > 0 && password2.length > 0){
            return false;
        }
        return true;
    }

    const handleCrearUsuario = (e)=>{
        if(password === password2){
            let tipo;
            let des;
            if(modalidad===2){
                tipo=0;
                des = descripcion;
            }else{
                tipo=1;
                des="";
            }
            let user={
                cedula: cedula,
                nombre_usuario: username,
                contrasena: password,
                nombre_real: nombre,
                pais: pais,
                direccion: direccion,
                fotografia: "",
                telefono: telefono,
                email: email,
                tipo_usuario: tipo,
                abuso: 0,
                estado: 1,
                descripcion: des
            }
            console.log(user);
            crearUsuario(user)
                .then(res=>{
                    if(res > 0){
                        uploadToServer(`usr-${res}-${image.name}`).then(r=>{});
                        let usr2 = {
                            ...user,
                            id_usuario: res
                        };
                        usr2.fotografia = `usr-${res}-${image.name}`;
                        updateUsuario(usr2).then(rex=>{
                            if(rex==="Usuario actualizado exitosamente."){
                                Swal.fire({
                                    icon: 'success',
                                    title: `Excelente`,
                                    text: `Usuario registrado exitosamente`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                                setTimeout(() => {
                                    router.push('/auth/login');
                                }, 2500);
                            }
                        });
                    }
                });
        }else{
            Swal.fire({
                icon: 'error',
                title: `Opps!`,
                text: `Las contraseñas no coinciden`,
                showConfirmButton: false,
                timer: 2500
              });
        }
        
    }

    const handleCrearUsuarioTienda = (e)=>{

    }


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
                        <Col md={8} className="text-center mt-4">
                            <h3>Registro de usuario</h3>
                        </Col>
                        <Col md={8} className="text-center pt-2">
                            <small>Ya casi eres parte de Lujepa Market, la tienda online más grande del mundo</small>
                        </Col>
                    </Row>
                    {modalidad===0 &&  <> <Row className="d-flex justify-content-center pb-5 mb-5 pt-5 mt-5">
                                            <Col md={12} className="text-center mt-4 pt-5 mb-3">
                                                <h3>¿Para qué quieres ser parte de Lujepa Market?</h3>
                                            </Col>

                                            <Col md={3}>
                                                <Button onClick={(e)=>{setModalidad(1)}} variant="info" block>Comprar productos</Button>
                                            </Col>
                                            <Col md={3}>
                                                <Button onClick={(e)=>{setModalidad(2)}} variant="info" block>Vender Productos</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center mt-5 p-5" style={{fontSize:"0.75rem"}}>
                                                <Link href="/auth/login">
                                                    <a style={{color:"white"}}>Ya tengo una cuenta</a>
                                                </Link>
                                            </Col>
                                        </Row> </>
                    }
                    {modalidad===1 &&   <Row className="d-flex justify-content-center mt-5">
                                            <Col sm={12}  md={6} className="pr-5 pl-5">
                                                <Tabs
                                                    activeKey={key}
                                                    onSelect={(k) => setKey(k)}
                                                    style={{color:"#212529!important"}}
                                                    
                                                >
                                                    <Tab className="pt-3" eventKey="Paso 1" title="Paso 1: Usuario" disabled>   
                                                        <Form >
                                                            <Row>
                                                                <Col md={12} className="pt-2">
                                                                    Elija una imagen de su ordenador
                                                                    <Form.Group className="mt-2">
                                                                        <Form.File id="exampleFormControlFile1" onChange={(e)=>{uploadToClient(e)}}/>
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
                                                            </Row>
                                                            <Row>
                                                                <Col md={6} className="mt-2 text-left">
                                                                    <Button onClick={(e)=>{setModalidad(0);clean();}} variant="outline-info">
                                                                        Anterior
                                                                    </Button>
                                                                </Col>
                                                                <Col md={6} className="mt-2 text-right">
                                                                    <Button disabled={getValidarPaso1()} onClick={(e)=>{e.preventDefault();setKey('Paso 2');}} variant="info">
                                                                        Siguiente
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Tab>
                                                    <Tab className="pt-3" eventKey="Paso 2" title="Paso 2: Datos Personales" disabled>
                                                        <Form >
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Nombre real</Form.Label>
                                                                        <Form.Control name="nombre" value={ nombre } onChange={ (e)=>{setNombre(e.target.value);}} type="text" placeholder="Este es tu nombre real" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
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
                                                                        <Form.Label>Cédula</Form.Label>
                                                                        <Form.Control name="cedula" value={ cedula } onChange={ (e)=>{setCedula(e.target.value);}} type="text" placeholder="Indentificación" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Teléfono</Form.Label>
                                                                        <Form.Control name="telefono" value={ telefono } onChange={ (e)=>{setTelefono(e.target.value);}} type="text" placeholder="Número de teléfono" />
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
                                                                <Col md={6} className="mt-2 text-left">
                                                                    <Button onClick={(e)=>{e.preventDefault();setKey('Paso 1');}} variant="outline-info">
                                                                        Anterior
                                                                    </Button>
                                                                </Col>
                                                                <Col md={6} className="mt-2 text-right">
                                                                    <Button disabled={getValidarPaso2()} onClick={(e)=>{e.preventDefault();setKey('Paso 3');}} variant="info">
                                                                        Siguiente
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Tab>
                                                    <Tab className="pt-3" eventKey="Paso 3" title="Paso 3: Seguridad" disabled>
                                                        <Form >
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Contraseña</Form.Label>
                                                                        <Form.Control name="password" type="password" value={ password } onChange={ (e)=>{setPassword(e.target.value);}} placeholder="Contraseña" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Confirmar contraseña</Form.Label>
                                                                        <Form.Control name="password2" type="password" value={ password2 } onChange={ (e)=>{setPassword2(e.target.value);}}  placeholder="Confirma tu contraseña" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={3} className="mt-2 text-left">
                                                                    <Button onClick={(e)=>{e.preventDefault();setKey('Paso 2');}} variant="outline-info">
                                                                        Anterior
                                                                    </Button>
                                                                </Col>
                                                                <Col md={3} className="mt-2 text-left">
                                                                </Col>
                                                                <Col md={6} className="mt-2 text-right">
                                                                    <Button disabled={getValidarPaso3()} onClick={handleCrearUsuario} variant="info" block>
                                                                        Guardar
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Tab>
                                                </Tabs>
                                                
                                            </Col>

                                        </Row>
                    }
                    {modalidad===2 &&   <Row className="d-flex justify-content-center mt-5">
                                            <Col sm={12}  md={6} className="pr-5 pl-5">
                                                <Tabs
                                                    activeKey={key}
                                                    onSelect={(k) => setKey(k)}
                                                    style={{color:"#212529!important"}}
                                                    
                                                >
                                                    <Tab className="pt-3" eventKey="Paso 1" title="Paso 1: Tienda" disabled>   
                                                        <Form >
                                                            <Row>
                                                                <Col md={12} className="pt-2">
                                                                    Elija una imagen de su ordenador para su tienda
                                                                    <Form.Group className="mt-2">
                                                                        <Form.File id="exampleFormControlFile1" onChange={(e)=>{uploadToClient(e)}}/>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Nombre de la tienda</Form.Label>
                                                                        <Form.Control name="nombre" value={ nombre } onChange={ (e)=>{setNombre(e.target.value);}} type="text" placeholder="Este es tu nombre real" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group >
                                                                            <Form.Label>Descripción</Form.Label>
                                                                            <Form.Control name="descripcion" value={ descripcion } onChange={ (e)=>{setDescripcion(e.target.value);}} placeholder="Descripción" />
                                                                            <Form.Text className="text-muted"></Form.Text>
                                                                        </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={6} className="mt-2 text-left">
                                                                    <Button onClick={(e)=>{setModalidad(0);clean();}} variant="outline-info">
                                                                        Anterior
                                                                    </Button>
                                                                </Col>
                                                                <Col md={6} className="mt-2 text-right">
                                                                    <Button disabled={getValidarPaso1T()} onClick={(e)=>{e.preventDefault();setKey('Paso 2');}} variant="info">
                                                                        Siguiente
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Tab>
                                                    <Tab className="pt-3" eventKey="Paso 2" title="Paso 2: Datos personales" disabled>
                                                        <Form >
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Nombre de usuario</Form.Label>
                                                                        <Form.Control name="username" value={ username } onChange={ (e)=>{setUsername(e.target.value);}} type="text" placeholder="Este es tu nombre de usuario" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
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
                                                                        <Form.Label>Cédula jurídica</Form.Label>
                                                                        <Form.Control name="cedula" value={ cedula } onChange={ (e)=>{setCedula(e.target.value);}} type="text" placeholder="Indentificación" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Teléfono</Form.Label>
                                                                        <Form.Control name="telefono" value={ telefono } onChange={ (e)=>{setTelefono(e.target.value);}} type="text" placeholder="Número de teléfono" />
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
                                                                <Col md={6} className="mt-2 text-left">
                                                                    <Button onClick={(e)=>{e.preventDefault();setKey('Paso 1');}} variant="outline-info">
                                                                        Anterior
                                                                    </Button>
                                                                </Col>
                                                                <Col md={6} className="mt-2 text-right">
                                                                    <Button disabled={getValidarPaso2T()} onClick={(e)=>{e.preventDefault();setKey('Paso 3');}} variant="info">
                                                                        Siguiente
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Tab>
                                                    <Tab className="pt-3" eventKey="Paso 3" title="Paso 3: Seguridad" disabled>
                                                        <Form >
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Contraseña</Form.Label>
                                                                        <Form.Control name="password" type="password" value={ password } onChange={ (e)=>{setPassword(e.target.value);}} placeholder="Contraseña" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group >
                                                                        <Form.Label>Confirmar contraseña</Form.Label>
                                                                        <Form.Control name="password2" type="password" value={ password2 } onChange={ (e)=>{setPassword2(e.target.value);}}  placeholder="Confirma tu contraseña" />
                                                                        <Form.Text className="text-muted"></Form.Text>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={3} className="mt-2 text-left">
                                                                    <Button onClick={(e)=>{e.preventDefault();setKey('Paso 2');}} variant="outline-info">
                                                                        Anterior
                                                                    </Button>
                                                                </Col>
                                                                <Col md={3} className="mt-2 text-left">
                                                                </Col>
                                                                <Col md={6} className="mt-2 text-right">
                                                                    <Button disabled={getValidarPaso3()} onClick={handleCrearUsuario} variant="info" block>
                                                                        Guardar
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Tab>
                                                </Tabs>
                                                
                                            </Col>

                                        </Row>
                    }
                    
                </Col>
            </Row>
        </Container>
    )
}
