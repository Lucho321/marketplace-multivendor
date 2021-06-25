import fetch from 'node-fetch';

const API_URL = "http://127.0.0.1:5000";

export const getTiendas = async(tienda) => {
    const response = await fetch(`${API_URL}/get_tiendasByNombre/${tienda}`)
        .then(response => response.json());

    return response;
}


export const getTiendaById = async(idTienda) => {
    const response = await fetch(`${API_URL}/get_tiendas/${idTienda}`)
        .then(response => response.json());

    return response;
}


export const getSuscripcionByTiendaComprador = async(idTienda, idComprador) => {
    try {
        const response = await fetch(`${API_URL}/get_compradores_tiendasByCompradorAndTienda/${idTienda}/${idComprador}`)
            .then(response => response.json());

        return response;
    } catch (e) {
        return [];
    }

}

export const insertSuscripcion = async(idTienda, idComprador) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_comprador: idComprador,
            id_tienda: idTienda,
        })
    };
    const res = await fetch(`${API_URL}/insert_compradores_tiendas`, requestOptions)
        .then(response => response.json())

    return res;
}


export const deleteSuscripcion = async(idTienda, idComprador) => {
    const response = await fetch(`${API_URL}/delete_compradores_tiendas/${idComprador}/${idTienda}`, { method: 'DELETE' })
        .then(response => response.json());

    return response;
}