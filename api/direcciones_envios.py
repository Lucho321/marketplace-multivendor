from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_direcciones/')
@app.route('/get_direcciones/<int:id>')
def get_direcciones(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_direcciones_envios")
        else:
            cur.execute("SELECT * from tbl_direcciones_envios WHERE id_direccion=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_direccion':result[0], 'pais':result[1], 'provincia':result[2], 'numero_casillero':result[3], 'codigo_postal':result[4], 'observaciones':result[5], 'id_comprador': result[6]}
            json_items.append(content)
            content = {}
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_direcciones', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_direcciones():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _pais = _json['pais']
        _provincia = _json['provincia']
        _numero_casillero = _json['numero_casillero']
        _codigo_postal = _json['codigo_postal']
        _observaciones = _json['observaciones']
        _id_comprador = _json['id_comprador']

        query = "INSERT INTO tbl_direcciones_envios(pais, provincia, numero_casillero, codigo_postal, observaciones, id_comprador) VALUES(%s, %s, %s, %s, %s)"
        data = (_pais, _provincia, _numero_casillero, _codigo_postal, _observaciones, _id_comprador)
        
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Dirección agregada exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_direcciones', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_direcciones():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_direccion = _json['id_direccion']
        _pais = _json['pais']
        _provincia = _json['provincia']
        _numero_casillero = _json['numero_casillero']
        _codigo_postal = _json['codigo_postal']
        _observaciones = _json['observaciones']
        _id_comprador = _json['id_comprador']

        query = "UPDATE tbl_direcciones_envios SET pais=%s, provincia=%s, numero_casillero=%s, codigo_postal=%s, observaciones=%s, id_comprador=%s WHERE id_direccion=%s"
        data = (_pais, _provincia, _numero_casillero, _codigo_postal, _observaciones, _id_comprador, _id_direccion)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Dirección actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_direcciones/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_direcciones(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_direcciones_envios WHERE id_direccion=%s", (id,))
        conn.commit()
        res = jsonify('Tarjeta eliminada exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()