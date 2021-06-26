import fetch from 'node-fetch';
const API_URL = "http://127.0.0.1:5000";

export const getAbusosByCompradorAndTienda = async(idComprador, idTienda) => {
    try{
        const response = await fetch(`${API_URL}/get_reportesAbusosByCompradorAndTienda//${idComprador}/${idTienda}`)
        .then(response => response.json());
        return response;
    }catch(e){
        return [];
    }
    
}

export const insertAbuso = async(idComprador, idTienda) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_comprador: idComprador,
            id_tienda: idTienda
        })
        
    };
    console.log(requestOptions)
    const res = await fetch(`${API_URL}/insert_reportes_abusos`, requestOptions)
        .then(response => response.json())

    return res;
}

export const deleteAbuso = async(idComprador, idTienda) =>{
    const response = await fetch(`${API_URL}/delete_reportes_abusos/${idComprador}/${idTienda}`, { method: 'DELETE' })
        .then(response => response.json());

    return response;
}