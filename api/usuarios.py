from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_usuarios/')#para obtener todos los usuarios
@app.route('/get_usuarios/<int:id>') #por id
def get_usuarios(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_usuarios u ORDER BY u.id_usuario DESC")
        else:
            cur.execute("SELECT * FROM tbl_usuarios u WHERE id_usuario=%s ORDER BY u.id_usuario DESC",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_usuario':result[0], 'cedula':result[1], 'nombre_usuario':result[2], 'contrasena':result[3], 'nombre_real':result[4], 'pais':result[5], 'direccion':result[6], 'fotografia':result[7], 'telefono':result[8], 'email':result[9], 'tipo_usuario':result[10], 'abuso':result[11], 'estado':result[12]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()