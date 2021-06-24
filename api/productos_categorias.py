from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_productos_categorias/')
@app.route('/get_productos_categoriasByProducto/<int:id>/')
def get_productos_categoriasByProducto(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT pc.*, p.nombre_producto, c.nombre from tbl_productos_categorias pc JOIN tbl_productos p ON pc.id_producto = p.id_producto JOIN tbl_categorias c ON pc.id_categoria = c.id_categoria")
        else:
            cur.execute("SELECT pc.*, p.nombre_producto, c.nombre from tbl_productos_categorias pc JOIN tbl_productos p ON pc.id_producto = p.id_producto JOIN tbl_categorias c ON pc.id_categoria = c.id_categoria WHERE pc.id_producto=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_producto':result[0], 'id_categoria':result[1], 'nombre_producto':result[2], 'categoria':result[3] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productos_categoriasByCategoria/<int:id>/')
def get_productos_categoriasByCategoria(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT pc.*, p.nombre_producto, c.nombre from tbl_productos_categorias pc JOIN tbl_productos p ON pc.id_producto = p.id_producto JOIN tbl_categorias c ON pc.id_categoria = c.id_categoria")
        else:
            cur.execute("SELECT pc.*, p.nombre_producto, c.nombre from tbl_productos_categorias pc JOIN tbl_productos p ON pc.id_producto = p.id_producto JOIN tbl_categorias c ON pc.id_categoria = c.id_categoria WHERE pc.id_categoria=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_producto':result[0], 'id_categoria':result[1], 'nombre_producto':result[2], 'categoria':result[3] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_productos_categorias', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_productos_categorias():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_producto = _json['id_producto']
        _id_categoria = _json['id_categoria']

        query = "INSERT INTO tbl_productos_categorias(id_producto, id_categoria) VALUES(%s, %s)"
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

@app.route('/update_productos_categorias', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_productos_categorias():
    try:
        _json = request.get_json(force=True)
        _id_producto = _json['id_producto']
        _id_categoria = _json['id_categoria']
        _new_id_producto = _json['new_id_producto']
        _new_id_categoria = _json['new_id_categoria']

        query = "UPDATE tbl_productos_categorias SET id_producto=%s, id_categoria=%s WHERE id_producto=%s AND id_categoria =%s"
        data = (_new_id_producto, _new_id_categoria, _id_producto, _id_categoria)
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

@app.route('/delete_productos_categorias/<int:id_producto>/<int:id_categoria>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_productos_categorias(id_producto, id_categoria):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_productos_categorias WHERE id_producto=%s AND id_categoria=%s", (id_producto, id_categoria))
        conn.commit()
        res = jsonify('Registro eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()