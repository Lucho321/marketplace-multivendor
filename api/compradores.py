from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_compradores/')
@app.route('/get_compradores/<int:id>')
def get_compradores(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_usuarios u JOIN tbl_compradores c on c.id_usuario = u.id_usuario")
        else:
            cur.execute("SELECT * from tbl_usuarios u JOIN tbl_compradores c on c.id_usuario = u.id_usuario WHERE id_comprador=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_usuario':result[0], 'cedula':result[1], 'nombre_usuario':result[2], 'contrasena':result[3], 'nombre_real':result[4], 'pais': result[5], 'direccion': result[6],
            'fotografia':result[7], 'telefono':result[8], 'email':result[9], 'tipo_usuario':result[10], 'abuso':result[11], 'estado':result[12], 'id_comprador':result[13]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_compradoresByNombre/')
@app.route('/get_compradoresByNombre/<string:nombre>')
def get_compradoresbyNombre(nombre=None):
    try:
        cur = mysql.connect().cursor()
        if nombre == None:
            cur.execute("SELECT * from tbl_usuarios u JOIN tbl_compradores c on c.id_usuario = u.id_usuario")
        else:
            nom = '%'+nombre+'%'
            cur.execute("SELECT * from tbl_usuarios u JOIN tbl_compradores c on c.id_usuario = u.id_usuario WHERE u.nombre_usuario LIKE %s OR u.nombre_real LIKE %s",(nom, nom))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_usuario':result[0], 'cedula':result[1], 'nombre_usuario':result[2], 'contrasena':result[3], 'nombre_real':result[4], 'pais': result[5], 'direccion': result[6],
            'fotografia':result[7], 'telefono':result[8], 'email':result[9], 'tipo_usuario':result[10], 'abuso':result[11], 'estado':result[12], 'id_comprador':result[13]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_compradoresByTienda/')
@app.route('/get_compradoresByTienda/<int:id>')
def get_compradoresbyTienda(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_usuarios u JOIN tbl_compradores c on c.id_usuario = u.id_usuario")
        else:
            cur.execute("SELECT * from tbl_usuarios u JOIN tbl_compradores c ON c.id_usuario = u.id_usuario JOIN tbl_compradores_tiendas ct ON c.id_comprador = ct.id_comprador WHERE ct.id_tienda=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_usuario':result[0], 'cedula':result[1], 'nombre_usuario':result[2], 'contrasena':result[3], 'nombre_real':result[4], 'pais': result[5], 'direccion': result[6],
            'fotografia':result[7], 'telefono':result[8], 'email':result[9], 'tipo_usuario':result[10], 'abuso':result[11], 'estado':result[12], 'id_comprador':result[13]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_compradores', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_compradores():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_usuario = _json['id_usuario']
        query = "INSERT INTO tbl_compradores(id_usuario) VALUES(%s)"
        data = (_id_usuario)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)

        cur.execute("SELECT id_comprador from tbl_compradores WHERE id_usuario=%s", (_id_usuario,))
        json_items = []
        content = {}
        rows = cur.fetchall() 
        for result in rows: 
            comprador = {'id_comprador':result[0]}

        query2 = "INSERT INTO tbl_carrito_deseos(es_deseo, id_comprador) VALUES(%s, %s)";
        data2 = (1, comprador["id_comprador"])
        cur.execute(query2, data2)

        query3 = "INSERT INTO tbl_carrito_deseos(es_deseo, id_comprador) VALUES(%s, %s)";
        data3 = (0, comprador["id_comprador"])
        cur.execute(query3, data3)

        conn.commit()
        res = jsonify('Comprador agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_compradores', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_compradores():
    try:
        _json = request.get_json(force=True)
        _id_usuario = _json['id_usuario']
        _id_comprador = _json['id_comprador']

        query = "UPDATE tbl_compradores SET id_usuario=%s WHERE id_comprador=%s"
        data = (_id_usuario, _id_comprador)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Comprador actualizado exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_compradores/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_compradores(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_compradores WHERE id_comprador=%s", (id,))
        conn.commit()
        res = jsonify('Comprador eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()