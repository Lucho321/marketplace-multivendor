from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_compradores_tiendas/')
def get_compradores_tiendas():
    try:
        cur = mysql.connect().cursor()
        cur.execute("SELECT * from tbl_compradores_tiendas")

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_comprador':result[0], 'id_tienda':result[1] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_compradores_tiendas', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_compradores_tiendas():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_producto = _json['id_comprador']
        _id_categoria = _json['id_tienda']

        query = "INSERT INTO tbl_compradores_tiendas(id_comprador, id_tienda) VALUES(%s, %s)"
        data = (_id_producto, _id_categoria)
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

@app.route('/update_compradores_tiendas', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_compradores_tiendas():
    try:
        _json = request.get_json(force=True)
        _id_comprador = _json['id_comprador']
        _id_tienda = _json['id_tienda']
        _new_id_comprador = _json['new_id_comprador']
        _new_id_tienda = _json['new_id_tienda']

        query = "UPDATE tbl_compradores_tiendas SET id_comprador=%s, id_tienda=%s WHERE id_comprador=%s AND id_tienda=%s"
        data = (_new_id_comprador, _new_id_tienda, _id_comprador, _id_tienda)
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

@app.route('/delete_compradores_tiendas/<int:id_comprador>/<int:id_tienda>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_compradores_tiendas(id_comprador, id_tienda):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_compradores_tiendas WHERE id_comprador=%s AND id_tienda=%s", (id_comprador, id_tienda))
        conn.commit()
        res = jsonify('Registro eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()