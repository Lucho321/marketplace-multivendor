from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql
from productos import update_productos_calificaciones

@app.route('/get_productos_calificaciones/')#para obtener todos los facturas
@app.route('/get_productos_calificaciones/<int:id>') #por id
def get_productos_calificaciones(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_productos_calificaciones")
        else:
            cur.execute("SELECT * FROM tbl_productos_calificaciones t WHERE id_producto_calificacion=%s ",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto_calificacion':result[0], 
                        'id_usuario':result[1], 
                        'calificacion':result[2], 
                        'id_producto':result[2]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()


@app.route('/get_productosCalificacionesByProductoByUsuario/<int:id_producto>/<int:id_usuario>/') #por id
def get_productosCalificacionesByProductoByUsuario(id_producto,id_usuario): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        cur.execute("SELECT p.id_producto_calificacion FROM tbl_productos_calificaciones p WHERE id_producto=%s AND  id_usuario=%s",(id_producto,id_usuario,))
        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_producto_calificacion':result[0]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

        

@app.route('/insert_productos_calificaciones', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_productos_calificaciones():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_usuario = _json['id_usuario']
        _calificacion_new = _json['calificacion']
        _id_producto = _json['id_producto']
        _cont = 0
        calificacionBD=0
        newCalificacion=0
        
        query = "INSERT INTO tbl_productos_calificaciones(id_usuario, calificacion, id_producto) VALUES(%s, %s, %s)"
        data = (_id_usuario, _calificacion_new, _id_producto,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()

        cur1 = mysql.connect().cursor() #Nos conectamos a mysql
        cur1.execute("SELECT t.calificacion FROM tbl_productos_calificaciones t WHERE id_producto=%s",(_id_producto,))
        rows = cur1.fetchall() 
        for result in rows: 
            _cont = _cont + 1 
            calificacionBD = calificacionBD+result[0]

        if (_cont != 0):
            newCalificacion = (calificacionBD/_cont)
        else: 
            newCalificacion = (calificacionBD/1)

        update_productos_calificaciones(newCalificacion, _id_producto)

        res = jsonify('Calificación producto agregada exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()
        







@app.route('/update_producto_calificacion', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_producto_calificacion():
    try:
        _json = request.get_json(force=True)
        _id_tienda_calificacion = _json['id_producto_calificacion']
        _calificacion = _json['calificacion']
        _id_producto= _json['id_producto']
        newCalificacion = 0
        _cont=0
        calificacionBD=0
        
        query = "UPDATE tbl_productos_calificaciones SET calificacion=%s WHERE id_producto_calificacion=%s"
        data = (_calificacion, _id_tienda_calificacion,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()

        cur1 = mysql.connect().cursor() #Nos conectamos a mysql
        cur1.execute("SELECT t.calificacion FROM tbl_productos_calificaciones t WHERE id_producto=%s",(_id_producto,))
        rows = cur1.fetchall() 
        for result in rows: 
            _cont = _cont + 1 
            calificacionBD = calificacionBD+result[0]
        if (_cont != 0):
            newCalificacion = (calificacionBD/_cont)
        else: 
            newCalificacion = (calificacionBD/1)
    
        update_productos_calificaciones(newCalificacion, _id_producto)

        res = jsonify('Calificacion del producto actualizada exitosamente.')
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()