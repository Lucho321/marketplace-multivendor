from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_productos_fotos/')
@app.route('/get_productos_fotos/<int:id>')
def get_productos_fotos(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_productos_fotos")
        else:
            cur.execute("SELECT * from tbl_productos_fotos WHERE id_foto=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_foto':result[0], 'nombre':result[1], 'url_foto':result[2], 'id_producto':result[3] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_fotosByProducto/')
@app.route('/get_fotosByProducto/<int:id>')
def get_fotosByProducto(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_productos_fotos")
        else:
            cur.execute("SELECT * from tbl_productos_fotos WHERE id_producto=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_foto':result[0], 'nombre':result[1], 'url_foto':result[2], 'id_producto':result[3] }    
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_productos_fotos', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_productos_fotos():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _nombre = _json['nombre']
        _url_foto = _json['url_foto']
        _id_producto = _json['id_producto']

        query = "INSERT INTO tbl_productos_fotos(nombre, url_foto, id_producto) VALUES(%s, %s, %s)"
        data = (_nombre, _url_foto, _id_producto)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()

        
        cur.execute("SELECT p.id_foto FROM tbl_productos_fotos p WHERE p.nombre=%s AND p.url_foto=%s AND p.id_producto=%s",(_nombre,_url_foto,_id_producto,))
        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_foto':result[0]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_productos_fotos', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_productos_fotos():
    try:
        _json = request.get_json(force=True)
        _id_foto = _json['id_foto']
        _nombre = _json['nombre']
        _url_foto = _json['url_foto']
        _id_producto = _json['id_producto']

        query = "UPDATE tbl_productos_fotos SET nombre=%s, url_foto=%s, id_producto=%s WHERE id_foto=%s"
        data = (_nombre, _url_foto, _id_producto, _id_foto)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Foto actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_productos_fotos/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_productos_fotos(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_productos_fotos WHERE id_foto=%s", (id,))
        conn.commit()
        res = jsonify('Foto eliminada exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()