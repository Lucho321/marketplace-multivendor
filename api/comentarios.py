from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_comentarios/')
@app.route('/get_comentarios/<int:id>')
def get_comentarios(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_comentarios")
        else:
            cur.execute("SELECT * from tbl_comentarios WHERE id_comentario=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_comentario':result[0], 'comentario':result[1], 'nivel':result[2], 'id_producto':result[3], 'padre':result[4] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_comentariosByProducto/')
@app.route('/get_comentariosByProducto/<int:id>')
def get_comentariosByProducto(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_comentarios")
        else:
            cur.execute("SELECT * from tbl_comentarios WHERE id_producto=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_comentario':result[0], 'comentario':result[1], 'padre':result[2], 'nivel':result[3], 'id_producto':result[4], 'id_usuario':result[5]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_comentarios', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_comentarios():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _comentario = _json['comentario']
        _padre = _json['padre']
        _nivel = _json['nivel']
        _id_producto = _json['id_producto']
        _id_usuario = _json['id_usuario']

        query = "INSERT INTO tbl_comentarios(comentario, padre, nivel, id_producto, id_usuario) VALUES(%s, %s, %s, %s, %s)"
        data = (_comentario, _padre, _nivel, _id_producto, _id_usuario)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Comentario agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_comentarios', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_comentarios():
    try:
        _json = request.get_json(force=True)
        _id_comentario = _json['id_comentario']
        _comentario = _json['comentario']
        _padre = _json['padre']
        _nivel = _json['nivel']
        _id_producto = _json['id_producto']
        _id_usuario = _json['id_usuario']

        query = "UPDATE tbl_comentarios SET comentario=%s, padre=%s, nivel=%s, id_producto=%s, id_usuario=%s WHERE id_comentario=%s"
        data = (_comentario, _padre, _nivel, _id_producto, _id_comentario, _id_usuario)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Comentario actualizado exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_comentarios/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_comentarios(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_comentarios WHERE id_comentario=%s", (id,))
        conn.commit()
        res = jsonify('Comentario eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()