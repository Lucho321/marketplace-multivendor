import fetch from 'node-fetch';

const API_URL = "http://127.0.0.1:5000";

export const getAllProductos = async() => {
    const response = await fetch(`${API_URL}/get_productosByTiendaOrNombre/`)
        .then(response => response.json());

    return response;
}

export const getImageByProducto = async(productoId) => {
    const response = await fetch(`${API_URL}/get_fotosByProducto/${productoId}`)
        .then(response => response.json());

    return response;
}

export const getProductoById = async(productoId) => {
    const response = await fetch(`${API_URL}/get_productos/${productoId}`)
        .then(response => response.json());

    return response;
}