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


export const insertarDeseosOCarrito = async(carrito_deseo) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_carrito_deseo: carrito_deseo.id_carrito_deseo,
            id_producto: carrito_deseo.id_producto,
            cantidad: carrito_deseo.cantidad
        })
    };
    const res = await fetch(`${API_URL}/insert_productos_carritos`, requestOptions)
        .then(response => response.json())

    return res;
}

export const updateDeseosOCarrito = async(carrito_deseo) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_carrito_deseo: carrito_deseo.id_carrito_deseo,
            id_producto: carrito_deseo.id_producto,
            cantidad: carrito_deseo.cantidad
        })
    };
    const res = await fetch(`${API_URL}/update_productos_carritos`, requestOptions)
        .then(response => response.json())

    return res;
}


export const getDeseoCarrito = async(productoId, carritoId) => {
    try {
        const response = await fetch(`${API_URL}/get_productos_carritosByCarritoAndProducto/${carritoId}/${productoId}`)
            .then(response => response.json());

        return response;
    } catch (e) {
        return [];
    }
}

export const deleteDeseoCarrito = async(carritoId, productoId) => {
    const response = await fetch(`${API_URL}/delete_productos_carritos/${carritoId}/${productoId}`, { method: 'DELETE' })
        .then(response => response.json());

    return response;
}


export const getProductosCarritoByCarrito = async(carritoId) => {
    try {
        const response = await fetch(`${API_URL}/get_productos_carritosByCarrito/${carritoId}`)
            .then(response => response.json());

        return response;
    } catch (e) {
        return [];
    }
}

export const guardarProducto = async(producto) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre_producto: producto.nombre_producto,
            descripcion: producto.descripcion,
            cantidad_disponible: producto.cantidad_disponible,
            ubicacion: producto.ubicacion,
            precio: producto.precio,
            tiempo_envio: producto.tiempo_envio,
            costo_envio: producto.costo_envio,
            calificacion: 0,
            id_tienda: producto.id_tienda
        })
    };
    const res = await fetch(`${API_URL}/insert_productos`, requestOptions)
        .then(response => response.json())

    return res;
}

export const updateProducto = async(producto) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_producto: producto.id_producto,
            nombre_producto: producto.nombre_producto,
            descripcion: producto.descripcion,
            cantidad_disponible: producto.cantidad_disponible,
            ubicacion: producto.ubicacion,
            precio: producto.precio,
            tiempo_envio: producto.tiempo_envio,
            costo_envio: producto.costo_envio,
            calificacion: producto.calificacion,
            id_tienda: producto.id_tienda,
            fecha_publicacion: producto.fecha_publicacion
        })
    };
    const res = await fetch(`${API_URL}/update_productos`, requestOptions)
        .then(response => response.json())

    return res;
}


export const guardarImagenProducto = async(imagen) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: imagen.nombre,
            url_foto: imagen.url_foto,
            id_producto: imagen.id_producto,
        })
    };
    const res = await fetch(`${API_URL}/insert_productos_fotos`, requestOptions)
        .then(response => response.json())

    return res;
}


export const updateImagenProducto = async(imagen) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_foto: imagen.id_foto,
            nombre: imagen.nombre,
            url_foto: imagen.url_foto,
            id_producto: imagen.id_producto,
        })
    };
    const res = await fetch(`${API_URL}/update_productos_fotos`, requestOptions)
        .then(response => response.json())

    return res;
}


export const deleteImagenProducto = async(idFoto) => {
    const response = await fetch(`${API_URL}/delete_productos_fotos/${idFoto}`, { method: 'DELETE' })
        .then(response => response.json());

    return response;
}


export const agregarCategoria = async(categoria, producto) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: categoria,
            descripcion: "",
            id_producto: producto,

        })
    };
    const res = await fetch(`${API_URL}/insertar_categorias`, requestOptions)
        .then(response => response.json())

    return res;
}



export const agregarCategoriaProducto = async(categoria, producto) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_producto: producto,
            id_categoria: categoria
        })
    };
    const res = await fetch(`${API_URL}/insertar_productos_categorias`, requestOptions)
        .then(response => response.json())

    return res;
}


export const deleteCategoriaProducto = async(idproducto, idcategoria) => {
    const response = await fetch(`${API_URL}/delete_productos_categorias/${idproducto}/${idcategoria}`, { method: 'DELETE' })
        .then(response => response.json());

    return response;
}