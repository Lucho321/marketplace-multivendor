import fetch from 'node-fetch';

const API_URL = "http://127.0.0.1:5000";

export const getComentariosByProducto = async(id_producto) => {
    const response = await fetch(`${API_URL}/get_comentariosByProducto/${id_producto}`)
        .then(response => response.json());
    return response;
}

export const insertComentario = async(comentario) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_usuario: comentario.id_usuario,
            comentario: comentario.comentario,
            nivel: comentario.nivel,
            id_producto: comentario.id_producto,
            padre: comentario.padre
        })
    };
    const res = await fetch(`${API_URL}/insert_comentarios`, requestOptions)
        .then(response => response.json())

    return res;

}