from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql
from tiendas import update_tiendas_calificaciones

@app.route('/get_tiendas_calificaciones/')#para obtener todos los facturas
@app.route('/get_tiendas_calificaciones/<int:id>') #por id
def get_tiendas_calificaciones(id=None): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        if id == None:
            cur.execute("SELECT * FROM tbl_tiendas_calificaciones")
        else:
            cur.execute("SELECT * FROM tbl_tiendas_calificaciones t WHERE id_tienda_calificacion=%s ",(id,))

        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_tienda_calificacion':result[0], 
                        'id_usuario':result[1], 
                        'calificacion':result[2], 
                        'id_tienda':result[2]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()



@app.route('/get_tiendasCalificacionesByTiendaByUsuario/<int:id_tienda>/<int:id_usuario>/') #por id
def get_tiendasCalificacionesByTiendaByUsuario(id_tienda,id_usuario): #funcion que sera invoada por la ruta anterior
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        cur.execute("SELECT t.id_tienda_calificacion FROM tbl_tiendas_calificaciones t WHERE id_tienda=%s AND  id_usuario=%s",(id_tienda,id_usuario,))
        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_tienda_calificacion':result[0]}
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

        

@app.route('/insert_tiendas_calificaciones', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_tiendas_calificaciones():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_usuario = _json['id_usuario']
        _calificacion_new = _json['calificacion']
        _id_tienda = _json['id_tienda']
        _cont = 0
        calificacionBD=0
        newCalificacion=0
        
        query = "INSERT INTO tbl_tiendas_calificaciones(id_usuario, calificacion, id_tienda) VALUES(%s, %s, %s)"
        data = (_id_usuario, _calificacion_new, _id_tienda,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()

        cur1 = mysql.connect().cursor() #Nos conectamos a mysql
        cur1.execute("SELECT t.calificacion FROM tbl_tiendas_calificaciones t WHERE id_tienda=%s",(_id_tienda,))
        rows = cur1.fetchall() 
        for result in rows: 
            _cont = _cont + 1 
            calificacionBD = calificacionBD+result[0]

        if (_cont != 0):
            newCalificacion = (calificacionBD/_cont)
        else: 
            newCalificacion = (calificacionBD/1)

        update_tiendas_calificaciones(newCalificacion, _id_tienda)

        res = jsonify('Calificación tienda agregada exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()
        

@app.route('/update_tienda_calificacion', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_tienda_calificacion():
    try:
        _json = request.get_json(force=True)
        _id_tienda_calificacion = _json['id_tienda_calificacion']
        _calificacion = _json['calificacion']
        _id_tienda = _json['id_tienda']
        newCalificacion = 0
        _cont=0
        calificacionBD=0
        
        query = "UPDATE tbl_tiendas_calificaciones SET calificacion=%s WHERE id_tienda_calificacion=%s"
        data = (_calificacion, _id_tienda_calificacion,)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()

        cur1 = mysql.connect().cursor() #Nos conectamos a mysql
        cur1.execute("SELECT t.calificacion FROM tbl_tiendas_calificaciones t WHERE id_tienda=%s",(_id_tienda,))
        rows = cur1.fetchall() 
        for result in rows: 
            _cont = _cont + 1 
            calificacionBD = calificacionBD+result[0]
        if (_cont != 0):
            newCalificacion = (calificacionBD/_cont)
        else: 
            newCalificacion = (calificacionBD/1)
    
        update_tiendas_calificaciones(newCalificacion, _id_tienda)

        res = jsonify('Calificacion de la tienda actualizada exitosamente.')
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()