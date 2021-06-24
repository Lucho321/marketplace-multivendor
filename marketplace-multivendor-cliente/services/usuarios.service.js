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
            id_red_social: redsocial.id_red_social,
            tipo: redsocial.nombre,
            valor: redsocial.nombre_usuario,
            url_perfil: redsocial.url_perfil,
            id_usuario: redsocial.id_usuario
        })
    };
    const res = await fetch(`${API_URL}/insert_redes`, requestOptions)
        .then(response => response.json())

    return res;
}