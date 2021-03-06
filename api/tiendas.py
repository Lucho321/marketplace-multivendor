from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_tiendas/')#para obtener todos los tiendas
@app.route('/get_tiendas/<int:id>') #por id
def get_tiendas(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT DISTINCT t.*, u.nombre_real, u.fotografia, (SELECT count(p.id_producto) FROM tbl_productos p WHERE p.id_tienda = t.id_tienda) AS cant_productos FROM tbl_tiendas t JOIN tbl_usuarios u ON t.id_usuario = u.id_usuario JOIN tbl_productos p ON p.id_tienda = t.id_tienda")
        else:
            cur.execute("SELECT DISTINCT t.*, u.nombre_real, u.fotografia, (SELECT count(p.id_producto) FROM tbl_productos p WHERE p.id_tienda = t.id_tienda) AS cant_productos FROM tbl_tiendas t JOIN tbl_usuarios u ON t.id_usuario = u.id_usuario JOIN tbl_productos p ON p.id_tienda = t.id_tienda WHERE t.id_tienda=%s",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_tienda':result[0], 'calificacion':result[1], 'descripcion':result[2], 'id_usuario':result[3] , 'abusos':result[4], 'nombre_tienda':result[5], 'fotografia':result[6], 'cant_productos':result[7] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()
        
@app.route('/get_tiendasByNombre/')#para obtener todos los tiendas
@app.route('/get_tiendasByNombre/<string:nombre>') #por id
def get_tiendasByNombre(nombre=None): #funcion que sera invoada por la ruta anterior
    try:
        
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if nombre == None:
            cur.execute("SELECT DISTINCT t.*, u.nombre_real, u.fotografia, (SELECT count(p.id_producto) FROM tbl_productos p WHERE p.id_tienda = t.id_tienda) AS cant_productos FROM tbl_tiendas t JOIN tbl_usuarios u ON t.id_usuario = u.id_usuario JOIN tbl_productos p ON p.id_tienda = t.id_tienda WHERE t.abusos<10")
        else:
            nom = '%' + nombre + '%'
            cur.execute("SELECT DISTINCT t.*, u.nombre_real, u.fotografia, (SELECT count(p.id_producto) FROM tbl_productos p WHERE p.id_tienda = t.id_tienda) AS cant_productos FROM tbl_tiendas t JOIN tbl_usuarios u ON t.id_usuario = u.id_usuario JOIN tbl_productos p ON p.id_tienda = t.id_tienda WHERE (u.nombre_real LIKE %s or u.nombre_usuario LIKE %s) AND t.abusos<10",(nom, nom))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_tienda':result[0], 'calificacion':result[1], 'descripcion':result[2], 'id_usuario':result[3] , 'abusos':result[4], 'nombre_tienda':result[5], 'fotografia':result[6], 'cant_productos':result[7] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_tiendasByComprador/<int:id>') #por id
def get_tiendasByComprador(id=None): #funcion que sera invoada por la ruta anterior
    try:
        
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        cur.execute("SELECT t.*, u.nombre_real FROM tbl_tiendas t JOIN tbl_compradores_tiendas ct ON t.id_tienda = ct.id_tienda JOIN tbl_usuarios u ON u.id_usuario = t.id_usuario WHERE ct.id_comprador =%s",(id))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_tienda':result[0], 'calificacion':result[1], 'descripcion':result[2], 'id_usuario':result[3] , 'abusos':result[4], 'nombre_tienda':result[5], 'fotografia':result[6], 'cant_productos':result[7] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_tiendaByUsuario/<int:id>') #por id
def get_tiendaByUsuario(id=None): #funcion que sera invoada por la ruta anterior
    try:
        
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        cur.execute("SELECT t.*, u.nombre_real FROM tbl_tiendas t JOIN tbl_compradores_tiendas ct ON t.id_tienda = ct.id_tienda JOIN tbl_usuarios u ON u.id_usuario = t.id_usuario WHERE u.id_usuario=%s",(id))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_tienda':result[0], 'calificacion':result[1], 'descripcion':result[2], 'id_usuario':result[3] , 'abusos':result[4], 'nombre_tienda':result[5], 'fotografia':result[6], 'cant_productos':result[7] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_tiendas', methods=['POST']) #S??lo podr?? ser accedida v??a POST
def insert_tiendas(id_usuario, descripcion):
    try:
        _calificacion = 0
        query = "INSERT INTO tbl_tiendas(calificacion, descripcion, id_usuario) VALUES(%s, %s, %s)"
        data = (_calificacion, descripcion, id_usuario,)
        print(data)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Tienda agregada exitosamente.') #Se retorna un mensaje de ??xito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_tiendas', methods=['PUT']) #S??lo podr?? ser accedida v??a PUT
def update_tiendas():
    try:
        _json = request.get_json(force=True)
        _id_tienda = _json['id_tienda']
        _calificacion = _json['calificacion']
        _descripcion = _json['descripcion']
        _id_usuario = _json['id_usuario']
        query = "UPDATE tbl_tiendas SET calificacion=%s, descripcion=%s, id_usuario=%s WHERE id_tienda=%s"
        data = (_calificacion, _descripcion, _id_usuario, _id_tienda,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Tienda actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_tiendas_calificaciones', methods=['PUT']) #S??lo podr?? ser accedida v??a PUT
def update_tiendas_calificaciones(newCalificacion, _id_tienda):
    try:
        query = "UPDATE tbl_tiendas SET calificacion=%s WHERE id_tienda=%s"
        data = (newCalificacion, _id_tienda,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        
        res = jsonify('Calificaci??n tienda actualizada exitosamente.')
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()        

@app.route('/delete_tiendas/<int:id>', methods=['DELETE']) #S??lo podr?? ser accedida v??a DELETE
def delete_tiendas(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_tiendas WHERE id_tienda=%s", (id,))
        conn.commit()
        res = jsonify('Tienda eliminado exitosamente.')
        res.status_code = 200
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

