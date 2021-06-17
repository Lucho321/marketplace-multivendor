import React from 'react'
import { Col, Row } from 'react-bootstrap'

export const Footer = () => {
    return (
        <Row className="bg-dark p-4" style={{color:"white"}}>
            <Col md={4} className="" style={{display:"flex", alignItems:"center"}}>
                <img className="d-inline-block align-top" src="/images/markets.png" alt="logo" width="50"/>{' '}
                <h2 className="pt-2">LUJEPA Market</h2>
            </Col>
            
            <Col md={8} className="text-right pt-2">
                <img className="mr-2" style={{cursor:"pointer"}} src="/images/instagram.png" alt="logo" width="30"/>
                <img className="mr-2" style={{cursor:"pointer"}} src="/images/facebook.png" alt="logo" width="30"/>
                <img className="" style={{cursor:"pointer"}} src="/images/twitter.png" alt="logo" width="30"/>

            </Col>
            <Col md={12} className="mt-4 text-center">
                <h10>Disclaimer</h10>
                <p style={{fontSize:"0.7rem", paddingTop:"5px"}}>
                    lujepamarket.com es solo una herramienta que prentender mejorar el comercio nacional 
                    dándole herramientas a pequeñas y medianas empresas (PYMES) de ofrecer sus productos 
                    en un sitio web de acceso gratuito para cualquier persona en todo el mundo con el fin 
                    de hacer crecer su negocio mediante publicidad gratuita y la opción de incrementar sus 
                    ingresos mediantes ventas electrónicas, así mismo, le damos la oportunidad a las personas
                    de hacer la compra de productos que necesitan o quieren sin la necesidad de salir de ir 
                    a las tiendas físicas o un centro comercial. Por lo tanto lujepamarket.com no se hace
                    responsable de ningún producto dañado, garantía, entrega del producto tardía, pérdida del
                    producto, entre otras. Leer términos y condiciones.
                </p>
            </Col>
            <Col md={12} className="text-center mt-4">
                <p>lujepamarket.com &copy;2021</p>
            </Col>
        </Row>
    )
}
