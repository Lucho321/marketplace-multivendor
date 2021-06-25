from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_facturas_productos/')
def get_facturas_productos():
    try:
        cur = mysql.connect().cursor()
        cur.execute("SELECT * from tbl_factura_producto")
        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_factura':result[0], 'id_producto':result[1] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_facturas_productos', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_facturas_productos():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_factura = _json['id_factura']
        _id_producto = _json['id_producto']
        _cantidad = _json['cantidad_producto']

        query = "INSERT INTO tbl_factura_producto(id_factura, id_producto, cantidad_producto) VALUES(%s, %s, %s)"
        data = (_id_factura, _id_producto, _cantidad)
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

@app.route('/update_facturas_productos', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_facturas_productos():
    try:
        _json = request.get_json(force=True)
        _id_factura = _json['id_factura']
        _id_producto = _json['id_producto']
        _new_id_factura = _json['new_id_factura']
        _new_id_producto = _json['new_id_producto']

        query = "UPDATE tbl_factura_producto SET id_factura=%s, id_producto=%s WHERE id_factura=%s AND id_producto=%s"
        data = (_new_id_factura, _new_id_producto, _id_factura, _id_producto)
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

@app.route('/delete_facturas_productos/<int:id_factura>/<int:id_producto>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_facturas_productos(id_factura, id_producto):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_factura_producto WHERE id_factura=%s AND id_producto=%s", (id_factura, id_producto))
        conn.commit()
        res = jsonify('Registro eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()