import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Image, Button } from 'react-bootstrap'
import { getRedesSocialesByUsuario } from '../../services/usuarios.service';

export const SuscriptorCard = (props) => {
    const { s } = props;
    const [ redesSociales, setRedesSociales ] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const getRedesSociales = ()=>{
        getRedesSocialesByUsuario(s.id_usuario).then(r=>{
            setRedesSociales(r);
        })
    };

    useEffect(() => {
        getRedesSociales();
    }, [])

    const getPrepend = (redsocial)=>{
        let rs = redsocial.nombre;
        if(rs==="tiktok"){
            return 'tiktok.com/@';
        }else if(rs==="twitch"){
            return 'twitch.tv/';
        }else{
            return `${rs}.com/`;
        }
    }

    return (
        <>
        <Col md={6} className="mb-4" style={{borderRight:"solid 2px #b3e7df", borderLeft:"solid 2px #b3e7df"}}>
            <Row>
                <Col md={2} className="text-center">
                    <Image src={`/images/files/${s.fotografia}`} style={{width:"68px", height:"59px"}} roundedCircle />
                </Col>
                <Col md={6}>
                    <Row>
                        <Col>
                            <h5>@{s.nombre_usuario}<small> - {s.pais}</small></h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>{s.email}</small>
                        </Col>
                    </Row>
                    
                </Col>
                <Col md={3} className="pt-2">
                    <Button onClick={(e) => {setModalShow(true)}} size="sm" variant="outline-info" block>Ver redes sociales</Button>
                </Col>
            </Row>
            
        </Col>
        <Modal show={modalShow} onHide={() => {setModalShow(false)}} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Redes Sociales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    redesSociales.map(redsocial=>(
                        <>
                            <a style={{color:"#212529"}} href={`https://www.${getPrepend(redsocial)}${redsocial.nombre_usuario}`} target="_blank">
                                <Row key={redsocial.id_red_social}>
                                    <Col md={1} className="">
                                        <img className="mr-2" src={`/images/${redsocial.nombre}.png`} alt="logo" width="36"/>
                                    </Col>
                                    <Col className="pt-1">
                                        {getPrepend(redsocial)}{redsocial.nombre_usuario}
                                    </Col>
                                </Row>
                            </a>
                            

                            
                        </>
                    ))
                }
            </Modal.Body>
        </Modal>
        </>
    )
}
