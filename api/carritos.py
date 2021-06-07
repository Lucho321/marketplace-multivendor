from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_carritos/')
@app.route('/get_carritos/<int:id>')
def get_carritos(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_carrito_deseos")
        else:
            cur.execute("SELECT * from tbl_carrito_deseos WHERE id_carrito=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_carrito_deseo':result[0], 'es_deseo':result[1], 'id_comprador':result[2]}
            json_items.append(content)
            content = {}
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_carritosByComprador/')
@app.route('/get_carritosByComprador/<int:id>')
def get_carritosByComprador(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_carrito_deseos")
        else:
            cur.execute("SELECT * from tbl_carrito_deseos WHERE id_comprador=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_carrito_deseo':result[0], 'es_deseo':result[1], 'id_comprador':result[2]}
            json_items.append(content)
            content = {}
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_carritos', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_carritos():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _es_deseo = _json['es_deseo']
        _id_comprador = _json['id_comprador']

        query = "INSERT INTO tbl_carrito_deseos(es_deseo, id_comprador) VALUES(%s, %s)"
        data = (_es_deseo, _id_comprador)
        
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Carrito agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_carritos', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_carritos():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_carrito = _json['id_carrito_deseo']
        _es_deseo = _json['es_deseo']
        _id_comprador = _json['id_comprador']

        query = "UPDATE tbl_carrito_deseos SET es_deseo=%s, id_comprador=%s WHERE id_carrito_deseo=%s"
        data = (_es_deseo, _id_comprador, _id_carrito)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Carrito actualizado exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_carritos/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_carritos(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_carrito_deseos WHERE id_carrito_deseo=%s", (id,))
        conn.commit()
        res = jsonify('Carrito eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()