import React from 'react'

export const CarritoComponent = ({altura}) => {
    return (
        <>
            <img style={{cursor:"pointer"}} className="ml-2 d-inline-block align-top" src="/images/micarrito.png" title="Mi carrito de compras" alt="logo" height={altura}/>
        </>
    )
}
