from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_tiendas/')#para obtener todos los tiendas
@app.route('/get_tiendas/<int:id>') #por id
def get_tiendas(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_tiendas t ORDER BY t.id_tienda DESC")
        else:
            cur.execute("SELECT * FROM tbl_tiendas t WHERE id=%s ORDER BY t.id_tienda DESC",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_tienda':result[0], 'calificacion':result[1], 'descripcion':result[2], 'id_usuario':result[3] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()
        

@app.route('/insert_tiendas', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_tiendas():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _calificacion = _json['calificacion']
        _descripcion = _json['descripcion']
        _id_usuario = _json['id_usuario']
        query = "INSERT INTO tbl_tiendas(calificacion, descripcion, id_usuario) VALUES(%s, %s, %s)"
        data = (_calificacion, _descripcion, _id_usuario,)
        print(data)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Tienda agregada exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_tiendas', methods=['PUT']) #Sólo podrá ser accedida vía PUT
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

@app.route('/delete_tiendas/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
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

