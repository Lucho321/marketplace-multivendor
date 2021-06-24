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

export const getProductosByTienda = async(tiendaId) => {
    const response = await fetch(`${API_URL}/get_productosByTienda/${tiendaId}`)
        .then(response => response.json());

    return response;
}

export const getProductosByNombreOrTienda = async(cadena) => {
    const response = await fetch(`${API_URL}/get_productosByTiendaOrNombre/${cadena}`)
        .then(response => response.json());

    return response;
}


export const getProductosByNombreAndTienda = async(cadena, tiendaId) => {
    const response = await fetch(`${API_URL}/get_productosByTiendaAndNombre/${cadena}/${tiendaId}`)
        .then(response => response.json());

    return response;
}

export const getProductosByCategoria = async(categoriaId) => {
    const response = await fetch(`${API_URL}/get_productosByCategoria/${categoriaId}`)
        .then(response => response.json());

    return response;
}

export const getAllCategorias = async() => {
    const response = await fetch(`${API_URL}/get_categorias`)
        .then(response => response.json());

    return response;
}

export const getCategoriaByProductos = async(productoId) => {
    const response = await fetch(`${API_URL}/get_categoriasByProducto/${productoId}`)
        .then(response => response.json());

    return response;
}


export const insertarCompra = async(compra) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            productos: compra.productos,
            precio_total: compra.precio_total,
            id_tarjeta: compra.id_tarjeta,
            id_comprador: compra.id_comprador,
        })
    };
    const res = await fetch(`${API_URL}/realizar_compra`, requestOptions)
        .then(response => response.json())

    return res;
}