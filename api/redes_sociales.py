from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_redes/')
@app.route('/get_redes/<int:id>')
def get_redes(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_redes_sociales")
        else:
            cur.execute("SELECT * from tbl_redes_sociales WHERE id_red_social=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_red_social':result[0], 'nombre':result[1], 'nombre_usuario':result[2], 'url_perfil':result[3], 'id_usuario':result[4]}
            json_items.append(content)
            content = {}
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_redesByUsuario/')
@app.route('/get_redesByUsuario/<int:id>')
def get_credesByUsuario(id=None):
    try:
        cur = mysql.connect().cursor()
        if id == None:
            cur.execute("SELECT * from tbl_redes_sociales")
        else:
            cur.execute("SELECT * from tbl_redes_sociales WHERE id_usuario=%s",(id,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'id_red_social':result[0], 'nombre':result[1], 'nombre_usuario':result[2], 'url_perfil':result[3], 'id_usuario':result[4]}
            json_items.append(content)
            content = {}
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/insert_redes', methods=['POST']) #Sólo podrá ser accedida vía POST
def insert_redes():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _tipo = _json['tipo']
        _valor = _json['valor']
        _url_perfil = _json['url_perfil']
        _id_usuario = _json['id_usuario']

        query = "INSERT INTO tbl_redes_sociales(tipo, valor, url_perfil, id_usuario) VALUES(%s, %s, %s, %s)"
        data = (_tipo, _valor, _url_perfil, _id_usuario)
        
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Red social agregada exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/update_redes', methods=['PUT']) #Sólo podrá ser accedida vía PUT
def update_redes():
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _id_red = _json['id_red_social']
        _tipo = _json['tipo']
        _valor = _json['valor']
        _url_perfil = _json['url_perfil']
        _id_usuario = _json['id_usuario']

        query = "UPDATE tbl_redes_sociales SET nombre=%s, nombre_usuario=%s, url_perfil=%s, id_usuario=%s WHERE id_red_social=%s"
        data = (_tipo, _valor, _url_perfil, _id_usuario, _id_red)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Red social actualizada exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/delete_redes/<int:id>', methods=['DELETE']) #Sólo podrá ser accedida vía DELETE
def delete_redes(id):
    try:
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM tbl_redes_sociales WHERE id_red_social=%s", (id,))
        conn.commit()
        res = jsonify('Red social eliminada exitosamente.')
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()