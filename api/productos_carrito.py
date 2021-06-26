from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_productos_carritos/')
def get_productos_carritos():
    try:
        cur = mysql.connect().cursor()
        cur.execute("SELECT * from tbl_productos_carrito")
        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_carrito_deseo':result[0], 'id_producto':result[1], 'cantidad':result[2] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productos_carritosByCarritoAndProducto/<int:id_carrito>/<int:id_producto>')
def get_productos_carritosByCarritoAndProducto(id_carrito, id_producto):
    try:
        cur = mysql.connect().cursor()
        cur.execute("SELECT * from tbl_productos_carrito WHERE id_carrito_deseo=%s AND id_producto=%s", (id_carrito, id_producto))
        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_carrito_deseo':result[0], 'id_producto':result[1], 'cantidad':result[2] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()


@app.route('/get_productos_carritosByCarrito/<int:id_carrito>')
def get_productos_carritosByCarrito(id_carrito):
    try:
        cur = mysql.connect().cursor()
        cur.execute("SELECT * from tbl_productos_carrito pc JOIN tbl_productos p ON pc.id_producto=p.id_producto JOIN tbl_tiendas t ON p.id_tienda=t.id_tienda WHERE id_carrito_deseo=%s AND t.abusos<10", (id_carrito))
        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_carrito_deseo':result[0], 'id_producto':result[1], 'cantidad':result[2] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_productos_carritos', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_productos_carritos():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_carrito_deseo = _json['id_carrito_deseo']
        _id_producto = _json['id_producto']
        _cantidad = _json['cantidad']

        query = "INSERT INTO tbl_productos_carrito(id_carrito_deseo, id_producto, cantidad) VALUES(%s, %s, %s)"
        data = (_id_carrito_deseo, _id_producto, _cantidad)
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

@app.route('/update_productos_carritos', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_productos_carritos():
    try:
        _json = request.get_json(force=True)
        _id_producto = _json['id_producto']
        _id_carrito_deseo = _json['id_carrito_deseo']
        _cantidad = ['cantidad']

        query = "UPDATE tbl_productos_carrito SET id_carrito_deseo=%s, id_producto=%s, cantidad=%s WHERE id_carrito_deseo=%s AND id_producto=%s"
        data = (_id_carrito_deseo, _id_producto, _cantidad, _id_carrito_deseo, _id_producto)
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

@app.route('/delete_productos_carritos/<int:id_carrito_deseo>/<int:id_producto>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_productos_carritos(id_carrito_deseo, id_producto):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_productos_carrito WHERE id_carrito_deseo=%s AND id_producto=%s", (id_carrito_deseo, id_producto))
        conn.commit()
        res = jsonify('Registro eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()