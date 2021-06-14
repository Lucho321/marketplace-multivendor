import React, { useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { DireccionesEnvio } from './PerfilComprador/DireccionesEnvio/DireccionesEnvio';
import { InformacionGeneral } from './PerfilComprador/InformacionGeneral';
import { ListaDeseos } from './PerfilComprador/ListaDeseos';
import { MiCarritoPerfil } from './PerfilComprador/MiCarritoPerfil';
import { TarjetasAsociadas } from './PerfilComprador/TarjetasAsociadas/TarjetasAsociadas';

export const PerfilComprador = ({numComponent}) => {
    //1-Informacion General / 2-Tarjetas Asociadas / 3-Direcciones de envío / 4-Lista de deseos / 5-Carrito
    if(numComponent === undefined){
        numComponent = 1;
    }
    const [ componentToShow, setComponentToShow ] = useState(numComponent);

    const getClassName = (imhere)=>{
        let classname = "pt-3 pb-3 btn_perfil_comprador";
        if(componentToShow === imhere){
            return `${classname} btn_perfil_comprador-active`;
        }
        return classname;
    }

    const nombreUsuario = "Pablo Venegas Elizondo";

    return (
        <Row>
            <Col md={2} className="pt-4 pb-5" style={{background:"#dcf7f3"}}>
                <Row>
                    <Col className="text-center">
                        <Image src="/images/perfil.jpg" style={{width:"180px", height:"171px"}} roundedCircle />
                    </Col>
                </Row>
                <Row className="mt-1 mb-3">
                    <Col className="text-center">
                        <p><strong>{nombreUsuario}</strong></p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className={getClassName(1)} onClick={()=>{setComponentToShow(1)}}>
                        <a>
                            <img className="d-inline-block" src="/images/information.png" title="Mi lista de deseos" alt="logo" height="20"/>
                            {" "}Información general
                        </a>
                    </Col>
                    <Col md={12} className={getClassName(2)} onClick={()=>{setComponentToShow(2)}}>
                        <a>
                            <img className="d-inline-block" src="/images/card.png" title="Mi lista de deseos" alt="logo" height="20"/>
                            {" "}Tarjetas asociadas
                        </a>
                    </Col>
                    <Col md={12} className={getClassName(3)} onClick={()=>{setComponentToShow(3)}}>
                        <a>
                            <img className="d-inline-block" src="/images/address.png" title="Mi lista de deseos" alt="logo" height="20"/>
                            {" "}Direcciones de envío
                        </a>
                    </Col>
                    <Col md={12} className={getClassName(4)} onClick={()=>{setComponentToShow(4)}}>
                        <a>
                            <img className="d-inline-block" src="/images/misdeseos.png" title="Mi lista de deseos" alt="logo" height="20"/>
                            {" "}Lista de deseos
                        </a>
                    </Col>
                    <Col md={12} className={getClassName(5)} onClick={()=>{setComponentToShow(5)}}>
                        <a>
                            <img className="d-inline-block" src="/images/micarrito.png" title="Mi lista de deseos" alt="logo" height="20"/>
                            {" "}Carrito de compras
                        </a>
                    </Col>

                </Row>
                
            </Col>
            <Col md={10}>
                {componentToShow === 1 && <InformacionGeneral />}
                {componentToShow === 2 && <TarjetasAsociadas />}
                {componentToShow === 3 && <DireccionesEnvio />}
                {componentToShow === 4 && <ListaDeseos />}
                {componentToShow === 5 && <MiCarritoPerfil />}
            </Col>
        </Row>
    )
}
