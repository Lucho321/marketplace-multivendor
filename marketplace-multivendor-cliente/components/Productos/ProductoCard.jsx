import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Image, InputGroup, FormControl, Card } from 'react-bootstrap'
import Link from 'next/link'
import { getImageByProducto } from '../../services/productos.service';
import { CompraModal } from '../Compra/CompraModal';
import { DeseoComponent } from './DeseoComponent';
import { CarritoComponent } from './CarritoComponent';

export const ProductoCard = ({producto}) => {
    const [modalShow, setModalShow] = useState(false);
    const [ images, setImages ] = useState([]);


    const getImages = async(productoID)=>{
        let imgs = await getImageByProducto(productoID);
        return imgs;
    }
    useEffect(() => {
        let imgs = getImages(producto.id_producto).then(i=>setImages(i));
    }, [])

    const getImageToShow = ()=>{
        if(images.length > 0){
            return images[0].url_foto;
        }else{
            return 'no-disponible.jpg';
        }
    }

    return (
        <div  style={{width:"80%", paddingBottom:"1.5rem", marginBottom:"1.5rem"}}>
            <Row>
                <Col>
                    <Image src={`/images/files/${getImageToShow()}`} height="180" width="100%" />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mt-2 ml-1">
                    <Link href={`/producto/${producto.id_producto}`}>
                        <a className="a_productocard">
                            <strong>{producto.nombre_producto}</strong>
                        </a>
                    </Link>
                    
                </Col>
                <Col md={12} className="ml-1" style={{fontSize:"0.8rem"}}>
                    {producto.descripcion}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col className="ml-1" style={{color:"#247d6d"}}>
                    {`$${producto.precio}`}
                </Col>
                <Col className="mr-2 mt-1 text-right">
                    <DeseoComponent idProducto={producto.id_producto} altura={15} />
                    <CarritoComponent altura={15} />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={12}>
                    <Button variant="outline-info" onClick={() => setModalShow(true)} block>Comprar</Button>
                </Col>
            </Row>
            <CompraModal show={modalShow} producto={producto} onHide={() => {setModalShow(false)}}/>
        </div>
    )
}


{/* <Card style={{ width: '60%', margin:"auto", border:"0px"}} >
            <Card.Img variant="top" src="/images/yo.jpg" style={{height:"150px"}}/>
            <Card.Body>
                <Card.Title>Nombre tienda</Card.Title>
                <Card.Text>
                    Descripcion de la tienda .adasdasdkadklakdlakdlakdakdlkaldk
                </Card.Text>
                <Button variant="outline-info" block>Ver tienda</Button>
            </Card.Body>
        </Card> */}