from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_productos_categorias/')
@app.route('/get_productos_categorias/<int:id_producto>/<int:id_categoria>/')
def get_productos_categorias(id_producto=None, id_categoria=None):
    try:
        cur = mysql.connect().cursor()
        print("SELECT * from tbl_productos_categorias WHERE id_producto=%s")
        print("SELECT * from tbl_productos_categorias WHERE id_tienda=%s")
        print("SELECT * from tbl_productos_categorias WHERE id_producto=%s AND id_categoria=%s")
        print("SELECT * from tbl_productos_categorias")

        if id_producto != None and id_categoria == None:
            cur.execute("SELECT * from tbl_productos_categorias WHERE id_producto=%s")
        elif id_producto == None and id_categoria != None:
            cur.execute("SELECT * from tbl_productos_categorias WHERE id_categoria=%s")
        elif id_producto != None and id_categoria != None:
            cur.execute("SELECT * from tbl_productos_categorias WHERE id_producto=%s AND id_categoria=%s")
        elif id_producto == None and id_categoria == None:
            cur.execute("SELECT * from tbl_productos_categorias")

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_producto':result[0], 'id_categoria':result[1] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_comentarios', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_productos_categorias():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _comentario = _json['comentario']
        _padre = _json['padre']
        _nivel = _json['nivel']
        _id_producto = _json['id_producto']

        query = "INSERT INTO tbl_comentarios(comentario, padre, nivel, id_producto) VALUES(%s, %s, %s, %s)"
        data = (_comentario, _padre, _nivel, _id_producto)
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
def update_productos_categorias():
    try:
        _json = request.get_json(force=True)
        _id_comentario = _json['id_comentario']
        _comentario = _json['comentario']
        _padre = _json['padre']
        _nivel = _json['nivel']
        _id_producto = _json['id_producto']

        query = "UPDATE tbl_comentarios SET comentario=%s, padre=%s, nivel=%s, id_producto=%s WHERE id_comentario=%s"
        data = (_comentario, _padre, _nivel, _id_producto, _id_comentario)
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
def delete_productos_categorias(id):
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