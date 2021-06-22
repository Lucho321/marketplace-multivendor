import fetch from 'node-fetch';

export const login = async(username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_usuario: username, contrasena: password })
    };
    const loginRes = await fetch('http://127.0.0.1:5000/login', requestOptions)
        .then(response => response.json())

    if (loginRes[0].id_usuario) {
        localStorage.setItem("_user", JSON.stringify(loginRes[0]));
        return true;
    } else {
        try {
            localStorage.removeItem("_user");
        } catch (e) {}
        return false;
    }
}