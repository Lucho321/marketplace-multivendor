import React, { useState, useEffect } from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'
import Image from 'next/image'
import { ProductCard } from './Productos/ProductCard'
import { ProductosTienda } from './Productos/ProductosTienda';
import { getTiendas } from '../services/tiendas.service';
import { TiendaCard } from './Tiendas/TiendaCard';
import { useForm } from '../context/hooks/useForm';

export const HomeComponent = () => {
    const [ tipoUsuario, setTipoUsuario ] = useState();
    const [ tiendas, setTiendas ] = useState([]);

    let usuarioLogeado;

    const [ formValues, handleInputChange ] = useForm({
        buscador: ''
    });
    const { buscador } = formValues;

    const getTiendasFilter = (tienda)=>{
        getTiendas(tienda).then(t=>setTiendas(t));
    }
    
    const handleBuscar = (e)=>{
        getTiendasFilter(buscador);
    };

    useEffect(() => {
            if (typeof window !== 'undefined') {
                usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
                console.log(usuarioLogeado.tipo_usuario)
                if(usuarioLogeado != undefined){
                    setTipoUsuario(usuarioLogeado.tipo_usuario);
                    
                }
            }
            getTiendasFilter("");
    }, [])



    return (
        <>
        {
            tipoUsuario===1 && (
                                <>
                                    <Row 
                                        id="row_portada" 
                                        style={{
                                            height:"300px",
                                            background:"url('/images/home.png')",
                                            backgroundSize:"cover",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    >
                                        <Col md={4}></Col>
                                        <Col md={4}></Col>
                                        <Col md={4} style={{margin:"auto"}} className="text-center">
                                            <Button id="btn_comprar_home" variant="outline-info" style={{color:"white", fontSize:"1.5rem", marginRight:"20%"}}>COMIENZA A COMPRAR</Button>
                                        </Col>
                                    </Row>
                                    <Row className="p-4 mt-4 mr-2 ml-2">
                                        <Col md={12} >
                                        </Col>
                                    </Row>
                                    <Row className="pr-4 pl-4 pb-4 mr-2 ml-2">
                                        
                                        <Col md={4} className="text-center">
                                            <img src="/images/image1.png" width="80%" />
                                        </Col>
                                        <Col md={8}>
                                            <Button style={{height:"100px", marginTop:"5rem"}} className="pt-4" href="/productos" size="lg" variant="outline-info" block>Ver Productos</Button>
                                        </Col>
                                    </Row>

                                    <Row className="mr-2 ml-2 mt-4 mb-4">
                                        <Col md={12}className="text-left mt-4 mb-3">
                                            <h4>Explora y aprovecha las grandes promociones de nuestras tiendas!!!</h4>
                                        </Col>
                                        <Col md={12} className="text-center">
                                            <InputGroup className="" style={{width:"100%", margin:"auto"}}>
                                                <FormControl
                                                    placeholder="Escribe aquí el nombre de tu tienda favorita"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={buscador}
                                                    name="buscador"
                                                    onChange={ handleInputChange }
                                                />
                                                <InputGroup.Append>
                                                    <Button onClick={handleBuscar} variant="outline-secondary">Buscar</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="p-4 mr-2 ml-2 mb-5 d-flex justify-content-center">
                                        <Col md={12} className="p-2" style={{justifyContent:"center"}}>
                                        {tiendas.map( tienda => (
                                            <Col  md={12} className="mb-3">
                                                <TiendaCard key={tienda.id_tienda} tienda={tienda}/>
                                            </Col>
                                        ))}
                                        </Col>
                                        
                                    </Row>
                                </>
            )
        }
        {
            tipoUsuario===0 && <ProductosTienda />
        }
        </>
        

    )
}
