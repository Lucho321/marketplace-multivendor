from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_productos_reportes/')
def get_productos_reportes():
    try:
        cur = mysql.connect().cursor()
        cur.execute("SELECT * from tbl_productos_reportes")
        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_reportes_compras':result[0], 'id_producto':result[1] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_productos_reportes', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_productos_reportes():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_reportes_compras = _json['id_reportes_compras']
        _id_producto = _json['id_producto']

        query = "INSERT INTO tbl_productos_reportes(id_reportes_compras, id_producto) VALUES(%s, %s)"
        data = (_id_reportes_compras, _id_producto)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Registro agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_productos_reportes', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_productos_reportes():
    try:
        _json = request.get_json(force=True)
        _id_reportes_compras = _json['id_reportes_compras']
        _id_producto = _json['id_producto']
        _new_id_reportes_compras = _json['new_id_reportes_compras']
        _new_id_producto = _json['new_id_producto']

        query = "UPDATE tbl_productos_reportes SET id_reportes_compras=%s, id_producto=%s WHERE id_reportes_compras=%s AND id_producto=%s"
        data = (_new_id_reportes_compras, _new_id_producto, _id_reportes_compras, _id_producto)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Registro actualizado exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_productos_reportes/<int:id_reportes_compras>/<int:id_producto>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_productos_reportes(id_reportes_compras, id_producto):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_productos_reportes WHERE id_reportes_compras=%s AND id_producto=%s", (id_reportes_compras, id_producto))
        conn.commit()
        res = jsonify('Registro eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()