from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_reportes/')
@app.route('/get_reportes/<int:id>')
def get_reportes(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_reportes_compras")
        else:
            cur.execute("SELECT * from tbl_reportes_compras WHERE id_reportes_compras=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_reportes_compras':result[0], 'url_factura':result[1], 'descripcion':result[2], 'id_usuario':result[3], 'id_tienda':result[4] }
            json_items.append(content)
            content = {}
        
        print(result)
        return jsonify(json_items) 

        
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_reportesByUsuario/')
@app.route('/get_reportesByUsuario/<int:id>')
def get_reportesByUsuario(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_reportes_compras")
        else:
            cur.execute("SELECT * from tbl_reportes_compras WHERE id_usuario=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_reportes_compras':result[0], 'url_factura':result[1], 'descripcion':result[2], 'id_usuario':result[3], 'id_tienda':result[4] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_reportesByTienda/')
@app.route('/get_reportesByTienda/<int:id>')
def get_reportesByTienda(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_reportes_compras")
        else:
            cur.execute("SELECT * from tbl_reportes_compras WHERE id_tienda=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_reportes_compras':result[0], 'url_factura':result[1], 'descripcion':result[2], 'id_usuario':result[3], 'id_tienda':result[4] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_reportesByTiendaAndUsuario/')
@app.route('/get_reportesByTiendaAndUsuario/<int:id_tienda>/<int:id_usuario>')
def get_reportesByTiendaAndUsuario(id_tienda=None, id_usuario= None):
    try:
        cur = mysql.connect().cursor()
        if id_tienda == None and id_usuario == None:
            cur.execute("SELECT * from tbl_reportes_compras")
        else:
            cur.execute("SELECT * from tbl_reportes_compras WHERE id_tienda=%s AND id_usuario=%s",(id_tienda, id_usuario))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_reportes_compras':result[0], 'url_factura':result[1], 'descripcion':result[2], 'id_usuario':result[3], 'id_tienda':result[4] }
            json_items.append(content)
            content = {}
        
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_reportes', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_reportes():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _url_factura = _json['url_factura']
        _descripcion = _json['descripcion']
        _id_usuario = _json['id_usuario']
        _id_tienda = _json['id_tienda']

        query = "INSERT INTO tbl_reportes_compras(url_factura, descripcion, id_usuario, id_tienda) VALUES(%s, %s, %s, %s)"
        data = (_url_factura, _descripcion, _id_usuario, _id_tienda)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Reporte de compra agregado exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_reportes', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_reportes():
    try:
        _json = request.get_json(force=True)
        _id_reporte = _json['id_reportes_compras']
        _url_factura = _json['url_factura']
        _descripcion = _json['descripcion']
        _id_usuario = _json['id_usuario']
        _id_tienda = _json['id_tienda']

        query = "UPDATE tbl_reportes_compras SET url_factura=%s, descripcion=%s, id_usuario=%s, id_tienda=%s WHERE id_reportes_compras=%s"
        data = (_url_factura, _descripcion, _id_usuario, _id_tienda, _id_reporte)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Reporte de compra actualizado exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_reportes/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_reportes(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_reportes_compras WHERE id_reportes_compras=%s", (id,))
        conn.commit()
        res = jsonify('Reporte de compra eliminado exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()