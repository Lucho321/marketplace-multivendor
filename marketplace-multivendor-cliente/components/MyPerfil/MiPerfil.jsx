import React, { useState } from 'react'
import { PerfilComprador } from './PerfilComprador';
import { PerfilTienda } from './PerfilTienda/PerfilTienda';

export const MiPerfil = () => {

    const tipoUsuario = "comprador";

    if(tipoUsuario === "comprador"){
        return <PerfilComprador numComponent={1} />
    }

    return (
        <PerfilTienda />
    )
}
