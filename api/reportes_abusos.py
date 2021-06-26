from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_reportes_abusos/')
def get_reportes_abusos():
    try:
        cur = mysql.connect().cursor()
        cur.execute("SELECT * from tbl_reportes_abusos")

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_tienda':result[0], 'id_comprador':result[1] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_reportesAbusosByCompradorAndTienda/<int:id_tienda>/<int:id_comprador>')
def get_reportesAbusosByCompradorAndTienda(id_tienda, id_comprador):
    try:
        cur = mysql.connect().cursor()
        cur.execute("SELECT * from tbl_reportes_abusos WHERE id_tienda=%s AND id_comprador=%s", (id_tienda, id_comprador))

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

@app.route('/insert_reportes_abusos', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_reportes_abusos():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_producto = _json['id_comprador']
        _id_categoria = _json['id_tienda']

        query = "INSERT INTO tbl_reportes_abusos(id_comprador, id_tienda) VALUES(%s, %s)"
        data = (_id_producto, _id_categoria)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Reporte de abuso agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_reportes_abusos', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_reportes_abusos():
    try:
        _json = request.get_json(force=True)
        _id_comprador = _json['id_comprador']
        _id_tienda = _json['id_tienda']
        _new_id_comprador = _json['new_id_comprador']
        _new_id_tienda = _json['new_id_tienda']

        query = "UPDATE tbl_reportes_abusos SET id_comprador=%s, id_tienda=%s WHERE id_comprador=%s AND id_tienda=%s"
        data = (_new_id_comprador, _new_id_tienda, _id_comprador, _id_tienda)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Reporte de abuso actualizado exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()


@app.route('/delete_reportes_abusos/<int:id_comprador>/<int:id_tienda>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_reportes_abusos(id_comprador, id_tienda):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_compradores_tiendas WHERE id_comprador=%s AND id_tienda=%s", (id_comprador, id_tienda))
        conn.commit()
        res = jsonify('Reporte de abuso eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()