import React, { useState, useEffect } from 'react'
import { Col, Image, Row, Button } from 'react-bootstrap'
import { MiCarritoResumenCard } from './MiCarritoResumenCard'
import { getProductoById } from '../../services/productos.service';
import { CompraCarritoModal } from '../Compra/CompraCarritoModal';

export const MiCarritoResumen = ({productos}) => {
    const [modalShow, setModalShow] = useState(false);
    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);

    const getProducto = async(productoId) =>{ 
        let prec = await getProductoById(productoId);
        return prec;
    }


    useEffect(() => {
        calcularTotal();
    }, [productos])


    const calcularTotal = async()=>{
        let total = 0;
        let prods = [];
        for(let i in productos){
            let c = productos[i].cantidad;
            let p = await getProducto(productos[i].id_producto);
            total+=c*(p[0].precio+p[0].costo_envio);
            
            let pr = {
                producto:p[0].nombre_producto, 
                id_producto:p[0].id_producto, 
                id_tienda:p[0].id_tienda, 
                cantidad: parseInt(c)
            };
            console.log(pr);
            prods.push(pr);
        }
        setProducts(prods);
        setTotal(total);
    }

    const getTotal = ()=>{
        calcularTotal().then(r=>{
            setTotal(r);
        });
    }
    
    

    return (
        <>
            <Row style={{borderLeft:"solid 1.5px #aaa"}}>
                <Col md={12} className="text-center mb-3">
                    <h4>Resumen</h4>
                </Col>
                {
                    productos.map(p=>(
                        <Col key={p.id_producto} md={12} >
                            <MiCarritoResumenCard key={p.id_producto} productoCarrito={p} productoId={p.id_producto} />
                        </Col>
                    ))
                }
            </Row>
            <Row className="mt-3">
                <Col md={12}>
                    <p><strong>Total Pagar: ${total}</strong></p>
                </Col>
                <Col md={12}>
                    <Button onClick={() => setModalShow(true)} variant="info" block>
                        Pagar
                    </Button>
                </Col>
            </Row>
            <CompraCarritoModal show={modalShow} productos={productos} total={total} onHide={() => {setModalShow(false)}} />
        </>
    )
}
