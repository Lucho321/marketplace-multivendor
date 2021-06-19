from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_productos/')#para obtener todos los productos
@app.route('/get_productos/<int:id>') #por id
def get_productos(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_productos t ORDER BY t.id_producto DESC")
        else:
            cur.execute("SELECT * FROM tbl_productos t WHERE id_producto=%s ORDER BY t.id_producto DESC",(id,))

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
        if id == None:
            cur.execute("SELECT * FROM tbl_productos t ORDER BY t.id_producto DESC")
        else:
            nom = '%'+cadena+'%'
            cur.execute("SELECT p.*, t.id_tienda, t.id_usuario, u.id_usuario, u.nombre_usuario, u.nombre_real FROM tbl_productos p JOIN tbl_tiendas t ON p.id_tienda = t.id_tienda JOIN tbl_usuarios u ON t.id_usuario = u.id_usuario WHERE p.nombre_producto like %s OR u.nombre_usuario like %s OR u.nombre_real like %s", (nom, nom, nom))

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
@app.route('/get_productosByCategoria/<string:categoria>') #por id
def get_productosByCategoria(categoria=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if categoria == None:
            cur.execute("SELECT * FROM tbl_productos")
        else:
            cur.execute("SELECT * FROM tbl_productos t JOIN tbl_productos_categorias pc ON t.id_producto = pc.id_producto JOIN tbl_categorias c ON pc.id_categoria = c.id_categoria WHERE c.nombre LIKE %s",(categoria,))

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
            cur.execute("SELECT * FROM tbl_productos t JOIN tbl_productos_carrito pc ON t.id_producto = pc.id_producto JOIN tbl_carrito_deseos c ON pc.id_carrito_deseo = c.id_carrito_deseo WHERE t.id_producto = %s",(id,))

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
        
@app.route('/get_productosByReporte/')#para obtener todos los productos
@app.route('/get_productosByReporte/<int:id>') #por id
def get_productosByReporte(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_productos")
        else:
            cur.execute("SELECT * FROM tbl_productos p JOIN tbl_productos_reportes pr ON p.id_producto = pr.id_producto WHERE pr.id_reportes_compras = %s",(id,))

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
        _fecha_publicacion = _json['fecha_publicacion']
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
        res = jsonify('Producto agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

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

