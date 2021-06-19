from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql
import bcrypt
from werkzeug.security import generate_password_hash, check_password_hash

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
            content = { 'id_usuario':result[0], 
            'cedula':result[1], 
            'nombre_usuario':result[2], 
            'contrasena':result[3], 
            'nombre_real':result[4], 
            'pais':result[5], 
            'direccion':result[6], 
            'fotografia':result[7], 
            'telefono':result[8], 
            'email':result[9], 
            'tipo_usuario':result[10], 
            'abuso':result[11], 
            'estado':result[12]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()


@app.route('/insert_usuarios', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_usuarios():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _cedula = _json['cedula']
        _nombre_usuario = _json['nombre_usuario']
        _contrasena = _json['contrasena'] 
        _contrasena = generate_password_hash(_contrasena)
        _nombre_real = _json['nombre_real']
        _pais = _json['pais']
        _direccion = _json['direccion']
        _fotografia = _json['fotografia']
        _telefono = _json['telefono']
        _email = _json['email']
        _tipo_usuario = _json['tipo_usuario']
        _abuso = _json['abuso']
        _estado = _json['estado']
        query = "INSERT INTO tbl_usuarios(cedula, nombre_usuario, contrasena, nombre_real, pais, direccion, fotografia, telefono, email, tipo_usuario, abuso, estado) VALUES(%s, %s, %s, %s, %s,%s, %s, %s, %s, %s, %s, %s)"
        data = (_cedula, _nombre_usuario, _contrasena, _nombre_real, _pais, _direccion, _fotografia, _telefono, _email, _tipo_usuario, _abuso, _estado)
        print(data)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Usuario agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_usuarios', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_usuarios():
    try:
        _json = request.get_json(force=True)
        _id_usuario = _json['id_usuario']
        _cedula = _json['cedula']
        _nombre_usuario = _json['nombre_usuario']
        _contrasena = _json['contrasena']
        _contrasena = generate_password_hash(_contrasena)
        _nombre_real = _json['nombre_real']
        _pais = _json['pais']
        _direccion = _json['direccion']
        _fotografia = _json['fotografia']
        _telefono = _json['telefono']
        _email = _json['email']
        _tipo_usuario = _json['tipo_usuario']
        _abuso = _json['abuso']
        _estado = _json['estado']
        query = "UPDATE tbl_usuarios SET cedula=%s, nombre_usuario=%s, contrasena=%s, nombre_real=%s, pais=%s, direccion=%s, fotografia=%s, telefono=%s, email=%s, tipo_usuario=%s,  abuso=%s,  estado=%s WHERE id_usuario=%s"
        data =(_cedula, _nombre_usuario, _contrasena, _nombre_real, _pais, _direccion, _fotografia, _telefono, _email, _tipo_usuario, _abuso, _estado, _id_usuario,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Usuario actualizado exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()        




@app.route('/delete_usuarios/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_usuarios(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_usuarios WHERE id_usuario=%s", (id,))
        conn.commit()
        res = jsonify('Usuario eliminado exitosamente.')
        res.status_code = 200
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()



@app.route('/login', methods=['POST'])
def login():
    try:
        _json = request.get_json(force=True) 
        _nombre_usuario = _json['nombre_usuario']
        _contrasena = _json['contrasena']  

        cur = mysql.connect().cursor() #Nos conectamos a mysql
        cur.execute("SELECT u.nombre_usuario, u.contrasena FROM tbl_usuarios u")
        bandera = False
        rows = cur.fetchall() 
        for result in rows: 
            if result[0]==_nombre_usuario:
                if check_password_hash(result[1], _contrasena):
                    print("Password correcta")
                    bandera=True
                else:
                    print("Password INCORRECTA")
            
        if bandera:
            res = jsonify('login successfully')
        else:
            res = jsonify('login error') 
        print('logeado como ' + _nombre_usuario)    
        res.status_code = 200
        return res
    
    except Exception as e:
        print(e)
        
    finally:
        cur.close()