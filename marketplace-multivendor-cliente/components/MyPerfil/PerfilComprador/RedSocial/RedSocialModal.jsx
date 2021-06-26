import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Form, InputGroup, Button } from 'react-bootstrap'
import Select from 'react-select';
import { insertRedSocial } from '../../../../services/usuarios.service';
import Swal from 'sweetalert2'

export const RedSocialModal = (props) => {

    const [ socialRed, setSocialRed ] = useState('facebook');
    const [ socialRedPrepend, setSocialRedPrepend ] = useState('facebook.com/');
    const [ isSocialRedChanged, setSocialRedChanged ] = useState(false);
    const [ socialRedInput, setSocialRedInput ] = useState('');
    const [ idUsuario, setIdUsuario ] = useState();
    const socialInputChange = (e)=>{
        setSocialRedInput(e.target.value);
        setSocialRedChanged(true);
    }

    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setIdUsuario(usuarioLogeado.id_usuario);
                    
                }
            }
        }
    }, [])



    const getDefaultValue = ()=>{
        return redSocialOptions.find(op=>op.value===socialRed);
    }

    const handleSocialRed = (e)=>{
        let rs = e.value;
        setSocialRed(rs);
        if(rs==="tiktok"){
            setSocialRedPrepend('tiktok.com/@');
        }else if(rs==="twitch"){
            setSocialRedPrepend('twitch.tv/');
        }else{
            setSocialRedPrepend(`${rs}.com/`);
        }

    }

    const handleSaveRedSocial=(e)=>{
        let redsocial = {
            id_usuario: idUsuario,
            tipo: socialRed,
            valor: socialRedInput,
            url_perfil:`${socialRedPrepend}${socialRedInput}`
        }

        console.log(redsocial);
        insertRedSocial(redsocial)
            .then(res=>{
                if(res==="Red social agregada exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Red social registrada exitosamente`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    setSocialRedInput('');
                }
            });

    }

    const redSocialOptions = [
        { value: 'facebook', label: 'Facebook'},
        { value: 'instagram', label: 'Instagram'},
        { value: 'twitter', label: 'Twitter'},
        { value: 'reddit', label: 'Reddit'},
        { value: 'tiktok', label: 'Tiktok'},
        { value: 'youtube', label: 'Youtube'},
        { value: 'twitch', label: 'Twitch'},
    ]

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Red Social</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={getDefaultValue()}
                            isSearchable={false}
                            name="color"
                            options={redSocialOptions}
                            onChange={handleSocialRed}
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={1} className="text-right">
                        <img className="mr-2" src={`/images/${socialRed}.png`} alt="logo" width="36"/>
                    </Col>
                    <Col md={11} >
                        <Form.Group >
                            <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">{socialRedPrepend}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    onChange = { socialInputChange }
                                    value = { socialRedInput }
                                    placeholder="Escribe aquí tu usuario"
                                    autoComplete="off"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleSaveRedSocial} variant="info" disabled={!socialRedInput || /^\s*$/.test(socialRedInput)}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}
