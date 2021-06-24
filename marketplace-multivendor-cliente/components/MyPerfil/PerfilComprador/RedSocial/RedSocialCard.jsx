import React, { useState } from 'react'
import { Col, Row, Form, Button, InputGroup } from 'react-bootstrap'
import { updateRedSocial } from '../../../../services/usuarios.service';
import Swal from 'sweetalert2'

export const RedSocialCard = ({redsocial}) => {

    const [ redSocial, setRedSocial ] = useState(redsocial);
    const [ socialRed, setSocialRed ] = useState(redsocial.nombre_usuario);
    const [ isSocialRedChanged, setSocialRedChanged ] = useState(false);
    const socialInputChange = (e)=>{
        setSocialRed(e.target.value);
        algoCambio(e.target.value);
    }

    const getPrepend = ()=>{
        let rs = redsocial.nombre;
        if(rs==="tiktok"){
            return 'tiktok.com/@';
        }else if(rs==="twitch"){
            return 'twitch.tv/';
        }else{
            return `${rs}.com/`;
        }
    }

    const algoCambio = (rs)=>{
        if(rs != redSocial.nombre_usuario && rs !=""){
            setSocialRedChanged(true);
        }else{
            setSocialRedChanged(false);
        }
    }

  

    const handleUpdateRS = (e)=>{
        redsocial.nombre_usuario = socialRed;
        updateRedSocial(redsocial)
            .then(res=>{
                if(res==="Red social actualizada exitosamente."){
                    
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Red social actualizada exitosamente`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    setRedSocial(redsocial);
                    setSocialRedChanged(false);
                }
            });
    }

    return (
        <Row>
            <Col md={1} className="">
                <img className="mr-2" src={`/images/${redsocial.nombre}.png`} alt="logo" width="36"/>
            </Col>
            <Col md={9}>
                <Form.Group >
                    <InputGroup hasValidation>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">{getPrepend()}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            aria-describedby="inputGroupPrepend"
                            value= { socialRed }
                            onChange = {socialInputChange}
                        />
                    </InputGroup>
                </Form.Group>
            </Col>
            <Col md={1} className="pt-1">
                {
                    isSocialRedChanged &&
                                            <img style={{cursor:"pointer", marginRight:"10px"}} onClick={handleUpdateRS} src="/images/save.png" alt="logo" width="20"/>
                }               
            </Col>
        </Row>
    )
}
