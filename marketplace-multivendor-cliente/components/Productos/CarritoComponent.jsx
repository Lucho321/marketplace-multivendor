import React, { useState, useEffect } from 'react'
import { deleteDeseoCarrito, getDeseoCarrito, insertarDeseosOCarrito } from '../../services/productos.service';
import Swal from 'sweetalert2'

export const CarritoComponent = ({altura, idProducto}) => {
    const [ existe, setExiste ] = useState(false);
    const [ deseoCarritoId, setDeseoCarritoId ] = useState();
    let usuarioLogeado;


    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.deseos){
                    setDeseoCarritoId(usuarioLogeado.carrito);
                    existeDeseoCarrito(usuarioLogeado.carrito);
                }
            }
        }
    }, [])


    const existeDeseoCarrito = (idDeseoCarrito) =>{ 
        console.log(`Deseo: ${idDeseoCarrito}`);
        console.log(`Producto: ${idProducto}`);
        getDeseoCarrito(idProducto, idDeseoCarrito).then(res=>{
            console.log(res);
            if(res[0]){
                setExiste(true);
            }else{
                setExiste(false);
            }
        })
    }

    const handleDeseo = (e)=>{
        
        if(existe){
            deleteDeseoCarrito(deseoCarritoId, idProducto).then(res=>{
                if(res === "Registro eliminado exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Se ha quitado el producto de tu carrito`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    existeDeseoCarrito(deseoCarritoId);
                }
            })
        }else{
            let carrito_deseo = {
                id_carrito_deseo: deseoCarritoId,
                id_producto: idProducto,
                cantidad: 1
            }
            insertarDeseosOCarrito(carrito_deseo).then(res=>{
                if(res === "Registro agregado exitosamente."){
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Producto agregado al carrito`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    existeDeseoCarrito(deseoCarritoId);
                }
            })
        }
    }

    return (
        <>
            { !existe && <img style={{cursor:"pointer"}} onClick={handleDeseo} className="ml-2 d-inline-block align-top" src="/images/micarrito2.png" title="Mi carrito de compras" alt="logo" height={altura+3}/>}
            { existe && <img style={{cursor:"pointer"}} onClick={handleDeseo} className="ml-2 d-inline-block align-top" src="/images/micarrito.png" title="Mi carrito de compras" alt="logo" height={altura}/>}
        </>
    )
}
