import React from 'react'

export const DeseoComponent = ({idProducto, altura}) => {
    console.log(idProducto);
    return (
        <>
            <img style={{cursor:"pointer"}}  className="d-inline-block align-top" src="/images/misdeseos.png" title="Mi lista de deseos" alt="logo" height={altura}/>
        </>
    )
}
