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