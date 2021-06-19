from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_categorias/')
@app.route('/get_categorias/<int:id>')
def get_categorias(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_categorias")
        else:
            cur.execute("SELECT * from tbl_categorias WHERE id_categoria=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_categoria':result[0], 'nombre':result[1], 'descripcion':result[2] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_categoriasByProducto/')
@app.route('/get_categoriasByProducto/<int:id>')
def get_categoriasByProducto(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_categorias")
        else:
            cur.execute("SELECT * from tbl_categorias c JOIN tbl_productos_categorias pc ON c.id_categoria = pc.id_categoria WHERE pc.id_producto=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_categoria':result[0], 'nombre':result[1], 'descripcion':result[2] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()


@app.route('/insert_categorias', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_categorias():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _nombre = _json['nombre']
        _descripcion = _json['descripcion']

        query = "INSERT INTO tbl_categorias(nombre, descripcion) VALUES(%s, %s)"
        data = (_nombre, _descripcion)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Categoria agregada exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_categorias', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_categorias():
    try:
        _json = request.get_json(force=True)
        _id_categoria = _json['id_categoria']
        _nombre = _json['nombre']
        _descripcion = _json['descripcion']

        query = "UPDATE tbl_categorias SET nombre=%s, descripcion=%s WHERE id_categoria=%s"
        data = (_nombre, _descripcion, _id_categoria)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Categoria actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_categorias/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_categorias(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_categorias WHERE id_categoria=%s", (id,))
        conn.commit()
        res = jsonify('Categoria eliminada exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()