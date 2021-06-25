from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_tarjetas/')
@app.route('/get_tarjetas/<int:id>')
def get_tarjetas(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_tarjetas")
        else:
            cur.execute("SELECT * from tbl_tarjetas WHERE id_tarjeta=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_tarjeta':result[0], 'nombre_propietario':result[1], 'numero_tarjeta':result[2], 'codigo_cvv':result[3], 'fecha_vence':result[4], 'saldo': result[5], 'id_comprador': [6]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_tarjetasByComprador/')
@app.route('/get_tarjetasByComprador/<int:id>')
def get_tarjetasByComprador(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_tarjetas")
        else:
            cur.execute("SELECT * from tbl_tarjetas t JOIN tbl_compradores c ON t.id_comprador = c.id_comprador JOIN tbl_usuarios u ON u.id_usuario = c.id_usuario WHERE u.id_usuario=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_tarjeta':result[0], 'nombre_propietario':result[1], 'numero_tarjeta':result[2], 'codigo_cvv':result[3], 'fecha_vence':result[4], 'saldo': result[5], 'id_comprador': result[6]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_tarjetas', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_tarjetas():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _nombre_propietario = _json['nombre_propietario']
        _numero_tarjeta = _json['numero_tarjeta']
        _codigo_cvv = _json['codigo_cvv']
        _fecha_vence = _json['fecha_vence']
        _saldo = _json['saldo']
        _id_comprador = _json['id_comprador']

        query = "INSERT INTO tbl_tarjetas(nombre_propietario, numero_tarjeta, codigo_cvv, fecha_vence, saldo, id_comprador) VALUES(%s, %s, %s, %s, %s, %s)"
        data = (_nombre_propietario, _numero_tarjeta, _codigo_cvv, _fecha_vence, _saldo, _id_comprador)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Tarjeta agregada exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/consulta_tarjeta', methods=['POST']) #Sólo podrá ser accedida vía POST
def consulta_tarjeta():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _nombre_propietario = _json['nombre_propietario']
        _numero_tarjeta = _json['numero_tarjeta']
        _codigo_cvv = _json['codigo_cvv']
        _fecha_vence = _json['fecha_vence']
        _id_comprador = _json['id_comprador']
        _precio = _json['precio']
        _saldo = 0
        cur = mysql.connect().cursor()
        cur.execute("SELECT t.* FROM `tbl_tarjetas` t WHERE t.nombre_propietario=%s AND t.numero_tarjeta=%s AND t.codigo_cvv=%s AND t.fecha_vence=%s AND t.id_comprador=%s",(_nombre_propietario, _numero_tarjeta,_codigo_cvv,_fecha_vence,_id_comprador,))
        
        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            _saldo=result[5]
            content = { 'id_tarjeta':result[0], 
            'nombre_propietario':result[1], 
            'numero_tarjeta':result[2], 
            'codigo_cvv':result[3], 
            'fecha_vence':result[4], 
            'saldo': result[5], 
            'id_comprador': result[6]}
            json_items.append(content)
            content = {}
        
        if(json_items != []):
            if(int(_saldo) >= int(_precio)):
                return jsonify(json_items)
            else:    
                return jsonify("Lo sentimos, no tienes los fondos suficientes para realizar la compra")  
        else:
            return jsonify("Lo sentimos, la tarjeta no se encuentra registrada")     
        

    except Exception as e:
        print(e)
    finally:
        cur.close()


@app.route('/update_tarjetas', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_tarjetas():
    try:
        _json = request.get_json(force=True)
        _id_tarjeta = _json['id_tarjeta']
        _nombre_propietario = _json['nombre_propietario']
        _numero_tarjeta = _json['numero_tarjeta']
        _codigo_cvv = _json['codigo_cvv']
        _fecha_vence = _json['fecha_vence']
        _saldo = _json['saldo']
        _id_comprador = _json['id_comprador']

        query = "UPDATE tbl_tarjetas SET nombre_propietario=%s, numero_tarjeta=%s, codigo_cvv=%s, fecha_vence=%s, saldo=%s, id_comprador=%s WHERE id_tarjeta=%s"
        data = (_nombre_propietario, _numero_tarjeta, _codigo_cvv, _fecha_vence, _saldo, _id_comprador, _id_tarjeta)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Tarjeta actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_tarjetas/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_tarjetas(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_tarjetas WHERE id_tarjeta=%s", (id,))
        conn.commit()
        res = jsonify('Tarjeta eliminada exitosamente')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()