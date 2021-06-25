import fetch from 'node-fetch';

const API_URL = "http://127.0.0.1:5000";

export const getUsuarioById = async(idUsuario) => {
    const response = await fetch(`${API_URL}/get_usuarios/${idUsuario}`)
        .then(response => response.json());

    return response;
}


export const updateUsuario = async(usuario) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            abuso: usuario.abuso,
            cedula: usuario.cedula,
            contrasena: usuario.contrasena,
            direccion: usuario.direccion,
            email: usuario.email,
            estado: usuario.estado,
            fotografia: usuario.fotografia,
            id_usuario: usuario.id_usuario,
            nombre_real: usuario.nombre_real,
            nombre_usuario: usuario.nombre_usuario,
            pais: usuario.pais,
            telefono: usuario.telefono,
            tipo_usuario: usuario.tipo_usuario
        })
    };
    const res = await fetch(`${API_URL}/update_usuarios`, requestOptions)
        .then(response => response.json())

    return res;
}


export const getRedesSocialesByUsuario = async(idUsuario) => {
    const response = await fetch(`${API_URL}/get_redesByUsuario/${idUsuario}`)
        .then(response => response.json());

    return response;
}


export const updateRedSocial = async(redsocial) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_red_social: redsocial.id_red_social,
            tipo: redsocial.nombre,
            valor: redsocial.nombre_usuario,
            url_perfil: redsocial.url_perfil,
            id_usuario: redsocial.id_usuario
        })
    };
    const res = await fetch(`${API_URL}/update_redes`, requestOptions)
        .then(response => response.json())

    return res;
}


export const insertRedSocial = async(redsocial) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tipo: redsocial.tipo,
            valor: redsocial.valor,
            url_perfil: redsocial.url_perfil,
            id_usuario: redsocial.id_usuario
        })
    };
    const res = await fetch(`${API_URL}/insert_redes`, requestOptions)
        .then(response => response.json())

    return res;
}


export const getTarjetasByUsuario = async(idUsuario) => {
    const response = await fetch(`${API_URL}/get_tarjetasByComprador/${idUsuario}`)
        .then(response => response.json());

    return response;
}

export const insertTarjeta = async(tarjeta) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre_propietario: tarjeta.nombre_propietario,
            numero_tarjeta: tarjeta.numero_tarjeta,
            codigo_cvv: tarjeta.codigo_cvv,
            fecha_vence: tarjeta.fecha_vence,
            saldo: tarjeta.saldo,
            id_comprador: tarjeta.id_comprador
        })
    };
    const res = await fetch(`${API_URL}/insert_tarjetas`, requestOptions)
        .then(response => response.json())

    return res;
}


export const deleteTarjeta = async(idTarjeta) => {
    const response = await fetch(`${API_URL}/delete_tarjetas/${idTarjeta}`, { method: 'DELETE' })
        .then(response => response.json());

    return response;
}


export const validarTarjeta = async(tarjeta) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre_propietario: tarjeta.nombre_propietario,
            numero_tarjeta: tarjeta.numero_tarjeta,
            codigo_cvv: tarjeta.codigo_cvv,
            fecha_vence: tarjeta.fecha_vence,
            id_comprador: tarjeta.id_comprador,
            precio: tarjeta.precio
        })
    };
    const res = await fetch(`${API_URL}/consulta_tarjeta`, requestOptions)
        .then(response => response.json())

    return res;
}

export const crearUsuario = async(usuario) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cedula: usuario.cedula,
            nombre_usuario: usuario.nombre_usuario,
            contrasena: usuario.contrasena,
            nombre_real: usuario.nombre_real,
            pais: usuario.pais,
            direccion: usuario.direccion,
            fotografia: usuario.fotografia,
            telefono: usuario.telefono,
            email: usuario.email,
            tipo_usuario: usuario.tipo_usuario,
            abuso: usuario.abuso,
            estado: usuario.estado,
            descripcion: usuario.descripcion
        })
    };
    const res = await fetch(`${API_URL}/insert_usuarios`, requestOptions)
        .then(response => response.json())

    return res;
}