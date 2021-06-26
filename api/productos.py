from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql
from datetime import datetime


@app.route('/get_productos/')#para obtener todos los productos
@app.route('/get_productos/<int:id>') #por id
def get_productos(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT p.*, u.nombre_real FROM tbl_productos p JOIN tbl_tiendas t ON t.id_tienda = p.id_tienda JOIN tbl_usuarios u ON u.id_usuario = t.id_tienda WHERE t.abusos<10")
        else:
            cur.execute("SELECT p.*, u.nombre_real FROM tbl_productos p JOIN tbl_tiendas t ON t.id_tienda = p.id_tienda JOIN tbl_usuarios u ON u.id_usuario = t.id_tienda WHERE p.id_producto = %s; ",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10], 'nombre_tienda':result[11] }
            json_items.append(content)
            content = {}
        print(json_items)
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productosByTienda/')#para obtener todos los productos
@app.route('/get_productosByTienda/<int:id>') #por id
def get_productosByTienda(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_productos t ORDER BY t.id_producto DESC")
        else:
            cur.execute("SELECT * FROM tbl_productos t WHERE id_tienda=%s ORDER BY t.id_producto DESC",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close() 

@app.route('/get_productosByTiendaOrNombre/')#para obtener todos los productos
@app.route('/get_productosByTiendaOrNombre/<string:cadena>') #por id
def get_productosByTiendaOrNombre(cadena=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if cadena == None:
            cur.execute("SELECT * FROM tbl_productos p JOIN tbl_tiendas t ON t.id_tienda = p.id_tienda WHERE t.abusos<10")
        else:
            nom = '%'+cadena+'%'
            cur.execute("SELECT p.*, t.id_tienda, t.id_usuario, u.id_usuario, u.nombre_usuario, u.nombre_real FROM tbl_productos p JOIN tbl_tiendas t ON p.id_tienda = t.id_tienda JOIN tbl_usuarios u ON t.id_usuario = u.id_usuario WHERE (p.nombre_producto like %s OR u.nombre_usuario like %s OR u.nombre_real like %s) AND t.abusos<10", (nom, nom, nom))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productosByTiendaAndNombre/')#para obtener todos los productos
@app.route('/get_productosByTiendaAndNombre/<string:cadena>/<int:id>') #por id
def get_productosByTiendaAndNombre(cadena=None, id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None and cadena == None:
            cur.execute("SELECT * FROM tbl_productos t ORDER BY t.id_producto DESC")
        else:
            nom = '%'+cadena+'%'
            cur.execute("SELECT p.*, t.id_tienda, t.id_usuario, u.id_usuario, u.nombre_usuario, u.nombre_real FROM tbl_productos p JOIN tbl_tiendas t ON p.id_tienda = t.id_tienda JOIN tbl_usuarios u ON t.id_usuario = u.id_usuario WHERE p.nombre_producto like %s AND t.id_tienda=%s", (nom, id))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productosByCategoria/')#para obtener todos los productos
@app.route('/get_productosByCategoria/<int:id>') #por id
def get_productosByCategoria(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_productos p JOIN tbl_tiendas t ON t.id_tienda = p.id_tienda WHERE t.abusos<10")
        else:
            cur.execute("SELECT * FROM tbl_productos t JOIN tbl_tiendas tx ON tx.id_tienda = t.id_tienda JOIN tbl_productos_categorias pc ON t.id_producto = pc.id_producto JOIN tbl_categorias c ON pc.id_categoria = c.id_categoria WHERE c.id_categoria  = %s AND tx.abusos<10 ",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productosByCarrito/')#para obtener todos los productos
@app.route('/get_productosByCarrito/<int:id>') #por id
def get_productosByCarrito(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_productos")
        else:
            cur.execute("SELECT t.*, pc.cantidad FROM tbl_productos t JOIN tbl_tiendas tx ON tx.id_tienda = t.id_tienda JOIN tbl_productos_carrito pc ON t.id_producto = pc.id_producto JOIN tbl_carrito_deseos c ON pc.id_carrito_deseo = c.id_carrito_deseo WHERE (c.id_carrito_deseo = %s) AND tx.abusos<10",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10], 'cantidad':result[11]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productosByFactura/')#para obtener todos los productos
@app.route('/get_productosByFactura/<int:id>') #por id
def get_productosByFactura(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_productos")
        else:
            cur.execute("SELECT * FROM tbl_productos p JOIN tbl_factura_producto fp ON p.id_producto = fp.id_producto WHERE fp.id_factura = %s",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productosByListaTiendas/<int:id_comprador>/<int:id_tienda>') #por id
def get_productosByListaTienda(id_comprador, id_tienda): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_productos")
        else:
            cur.execute("SELECT p.* FROM tbl_productos p JOIN tbl_productos_carrito pc ON pc.id_producto = p.id_producto JOIN tbl_compradores_tiendas ct ON p.id_tienda = ct.id_tienda WHERE p.id_tienda=%s AND ct.id_comprador=%s",(id_tienda, id_comprador))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_productosBaratos/<int:id_categoria>/<int:fecha1>/<int:fecha2>/<float:precio>') #por id
def get_productosBaratos(id_categoria, fecha1, fecha2, precio): #funcion que sera invoada por la ruta anterior
    try:
        fecha1 = str(fecha1)
        fecha2 = str(fecha2)
        cur = mysql.connect().cursor()
        cur.execute("SELECT p.* FROM tbl_productos p JOIN tbl_productos_categorias pc ON pc.id_producto = p.id_producto WHERE pc.id_categoria=%s AND p.fecha_publicacion BETWEEN %s AND %s AND p.precio < %s",(id_categoria, fecha1, fecha2, precio))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_productos', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_productos():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _nombre_producto = _json['nombre_producto']
        _descripcion = _json['descripcion']
        _cantidad_disponible = _json['cantidad_disponible']
        _fecha_publicacion = datetime.date(datetime.now())
        _ubicacion = _json['ubicacion']
        _precio = _json['precio']
        _tiempo_envio = _json['tiempo_envio']
        _costo_envio = _json['costo_envio']
        _calificacion = _json['calificacion']
        _id_tienda = _json['id_tienda']
        query = "INSERT INTO tbl_productos(nombre_producto, descripcion, cantidad_disponible, fecha_publicacion, ubicacion, precio, tiempo_envio, costo_envio, calificacion, id_tienda ) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        data = (_nombre_producto, _descripcion, _cantidad_disponible, _fecha_publicacion, _ubicacion, _precio, _tiempo_envio, _costo_envio, _calificacion, _id_tienda,)
        print(data)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()

        cur.execute("SELECT p.id_producto FROM tbl_productos p WHERE p.nombre_producto=%s AND p.descripcion=%s AND p.id_tienda=%s",(_nombre_producto,_descripcion,_id_tienda,))
        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto':result[0]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 


        #res = jsonify('Producto agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        #res.status_code = 200
        #return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_productos', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_productos():
    try:
        _json = request.get_json(force=True)
        _id_producto = _json['id_producto']
        _nombre_producto = _json['nombre_producto']
        _descripcion = _json['descripcion']
        _cantidad_disponible = _json['cantidad_disponible']
        _fecha_publicacion = _json['fecha_publicacion']
        _ubicacion = _json['ubicacion']
        _precio = _json['precio']
        _tiempo_envio = _json['tiempo_envio']
        _costo_envio = _json['costo_envio']
        _calificacion = _json['calificacion']
        _id_tienda = _json['id_tienda']
        query = "UPDATE tbl_productos SET nombre_producto=%s, descripcion=%s, cantidad_disponible=%s, fecha_publicacion=%s, ubicacion=%s, precio=%s, tiempo_envio=%s, costo_envio=%s, calificacion=%s, id_tienda=%s WHERE id_producto=%s"
        data =(_nombre_producto, _descripcion, _cantidad_disponible, _fecha_publicacion, _ubicacion, _precio, _tiempo_envio, _costo_envio, _calificacion, _id_tienda, _id_producto,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Producto actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_productos/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_productos(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_productos WHERE id_producto=%s", (id,))
        conn.commit()
        res = jsonify('producto eliminado exitosamente.')
        res.status_code = 200
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()


@app.route('/update_productos_calificaciones', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_productos_calificaciones(newCalificacion, _id_tienda):
    try:
        query = "UPDATE tbl_productos SET calificacion=%s WHERE id_producto=%s"
        data = (newCalificacion, _id_tienda,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        
        res = jsonify('Calificación del producto actualizada exitosamente.')
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()        
