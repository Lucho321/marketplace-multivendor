import React, { useState } from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'

export const Ejemplo = () => {

    const [ cantidad, setCantidad ] = useState(0);

    //sdfsdfsdfsldfslfksfsdf
    //sfsdfsfsfsfsd
    //sdfsdfsdfsdfsd

    const producto = {
        nombre: "pablo",
        precio:"$1000000000"
    }

    const handleSumar = (e) =>{
        setCantidad(cantidad+1);
    }

    return (
        <div>
            <Row>
                <Col className="bg-primary p-3 text-center" style={{color:"white"}}>
                    <h1>Producto más valioso</h1>
                </Col>
            </Row>
            <Row className="p-5">
                <Col>
                    <h3><strong>Nombre: </strong>{producto.nombre}</h3>
                </Col>
                <Col>
                    <h3><strong>Precio: </strong>{producto.precio}</h3>
                </Col>
            </Row>
            <Row className="p-5">
                <Col>
                    <h3><strong>Cantidad: </strong>{cantidad}</h3>
                </Col>
                <Col className="text-center">
                    <Button onClick={handleSumar}>Sumar</Button>
                </Col>
            </Row>
        </div>
    )
}
