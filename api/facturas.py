from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_facturas/')#para obtener todos los facturas
@app.route('/get_facturas/<int:id>') #por id
def get_facturas(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_facturas")
        else:
            cur.execute("SELECT * FROM tbl_facturas t WHERE id_factura=%s ",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = content = { 'id_factura':result[0], 'descripcion':result[1], 'direccion_url':result[2], 'fecha_generada':result[3], 'id_tienda':result[4], 'id_comprador':result[5], 'id_tarjeta':result[6] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()
        
@app.route('/get_facturasByTienda/')#para obtener todos los facturas
@app.route('/get_facturasByTienda/<int:id>') #por id
def get_facturasByTienda(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_facturas")
        else:
            cur.execute("SELECT * FROM tbl_facturas t WHERE id_tienda=%s ",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_factura':result[0], 'descripcion':result[1], 'direccion_url':result[2], 'fecha_generada':result[3], 'id_tienda':result[4], 'id_comprador':result[5], 'id_tarjeta':result[6] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_facturasByProducto/')#para obtener todos los facturas
@app.route('/get_facturasByProducto/<int:id>') #por id
def get_facturasByProducto(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_facturas")
        else:
            cur.execute("SELECT * FROM tbl_facturas f JOIN tbl_factura_producto fp ON fp.id_factura = f.id_factura WHERE fp.id_producto=%s ",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_factura':result[0], 'descripcion':result[1], 'direccion_url':result[2], 'fecha_generada':result[3], 'id_tienda':result[4], 'id_comprador':result[5], 'id_tarjeta':result[6] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_facturas', methods=['POST']) #S??lo podr?? ser accedida v??a POST
def insert_facturas():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _descripcion = _json['descripcion']
        _direccion_url = _json['direccion_url']
        _fecha_generada = _json['fecha_generada']
        _id_tienda = _json['id_tienda']
        _id_comprador = _json['id_comprador']
        _id_tarjeta = _json['id_tarjeta']
        query = "INSERT INTO tbl_facturas(descripcion, direccion_url, fecha_generada, id_tienda, id_comprador, id_tarjeta) VALUES(%s, %s, %s, %s, %s, %s)"
        data = (_descripcion, _direccion_url, _fecha_generada, _id_tienda, _id_comprador, _id_tarjeta)
        print(data)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Factura agregada exitosamente.') #Se retorna un mensaje de ??xito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_facturas', methods=['PUT']) #S??lo podr?? ser accedida v??a PUT
def update_facturas():
    try:
        _json = request.get_json(force=True)
        _id_factura = _json['id_factura']
        _descripcion = _json['descripcion']
        _direccion_url = _json['direccion_url']
        _fecha_generada = _json['fecha_generada']
        _id_tienda = _json['id_tienda']
        _id_comprador = _json['id_comprador']
        _id_tarjeta = _json['id_tarjeta']
        query = "UPDATE tbl_facturas SET descripcion=%s, direccion_url=%s, fecha_generada=%s, id_tienda=%s, id_comprador=%s, id_tarjeta=%s WHERE id_factura=%s"
        data = (_descripcion, _direccion_url, _fecha_generada, _id_tienda, _id_comprador, _id_tarjeta, _id_factura,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Factura actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_facturas/<int:id>', methods=['DELETE']) #S??lo podr?? ser accedida v??a DELETE
def delete_facturas(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_facturas WHERE id_factura=%s", (id,))
        conn.commit()
        res = jsonify('Factura eliminada exitosamente.')
        res.status_code = 200
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

