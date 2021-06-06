from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_facturas/')#para obtener todos los facturas
@app.route('/get_facturas/<int:id>') #por id
def get_facturas(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_facturas t ORDER BY t.id_factura DESC")
        else:
            cur.execute("SELECT * FROM tbl_facturas t WHERE id=%s ORDER BY t.id_factura DESC",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_factura':result[0], 'descripcion':result[1], 'direccion_url':result[2], 'fecha_generada':result[3], 'id_tienda':result[4] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()
        

@app.route('/insert_facturas', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_facturas():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _descripcion = _json['descripcion']
        _direccion_url = _json['direccion_url']
        _fecha_generada = _json['fecha_generada']
        _id_tienda = _json['id_tienda']
        query = "INSERT INTO tbl_facturas(descripcion, direccion_url, fecha_generada, id_tienda) VALUES(%s, %s, %s, %s)"
        data = (_descripcion, _direccion_url, _direccion_url, _id_tienda,)
        print(data)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('factura agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_facturas', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_facturas():
    try:
        _json = request.get_json(force=True)
        _id_factura = _json['id_factura']
        _descripcion = _json['descripcion']
        _direccion_url = _json['direccion_url']
        _fecha_generada = _json['fecha_generada']
        _id_tienda = _json['id_tienda']
        query = "UPDATE tbl_facturas SET descripcion=%s, direccion_url=%s, fecha_generada=%s, id_tienda=%s WHERE id_factura=%s"
        data = (_calificacion, _descripcion, _id_usuario, _id_factura,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('factura actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_facturas/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_facturas(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_facturas WHERE id_factura=%s", (id,))
        conn.commit()
        res = jsonify('factura eliminado exitosamente.')
        res.status_code = 200
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

