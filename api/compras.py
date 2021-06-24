from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql
from datetime import datetime

@app.route('/realizar_compra', methods=['POST']) #por id
def realizar_compra(): #funcion que sera invoada por la ruta anterior
    try:
        _json = request.get_json(force=True) #Obtiene en formato JSON los datos enviados desde el front-End
        _productos = _json['productos']
        _precio_total = _json['precio_total']
        _tarjeta = _json['id_tarjeta']
        _comprador = _json['id_comprador']

        conn = mysql.connect()
        cur = conn.cursor()

        for i in _productos:
            restarProductosInventario(i)
        
        rebajar(_precio_total, _tarjeta)
        
        res = jsonify('Compra realizada exitosamente.') #Se retorna un mensaje de éxito en formato JSON
        res.status_code = 200
        
        return res

    except Exception as e:
        print(e)
    finally:
        cur.close()


def get_nombreFactura():
    nombreFactura = ''
    now = datetime.now()
    fecha = now.strftime("%m%d%Y_%H%M%S")
    try:
        cur = mysql.connect().cursor() #Nos conectamos a mysql
        cur.execute("SELECT t.id_factura from tbl_facturas t WHERE t.id_factura=(SELECT max(id_factura) FROM tbl_facturas)")
        
        rows = cur.fetchall() #obtenemos el arreglo de resultados de la consulta
        json_items = []
        content = {}
        for result in rows: #obtenemos el arreglo de resultados de la consulta
            content = { 'id_factura':result[0]}
            json_items.append(content)
            content = {}

        if json_items == []:
            nombreFactura = '1' + fecha
        else:
            nombreFactura = str(json_items[0]['id_factura']) + '_' +fecha

        return nombreFactura

    except Exception as e:
        print(e)
    finally:
        cur.close()

def rebajar(precio_total, id_tarjeta):
    try:
        saldoTarjeta = getSaldoTarjeta(id_tarjeta)
        saldoRestante = saldoTarjeta - precio_total
        query = "UPDATE tbl_tarjetas SET saldo=%s WHERE id_tarjeta=%s"
        data = (saldoRestante, id_tarjeta)
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('La rebaja se ha efecutado correctamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()

def getSaldoTarjeta(id_tarjeta):
    try: 
        cur = mysql.connect().cursor()
        cur.execute("SELECT t.saldo from tbl_tarjetas t WHERE id_tarjeta=%s",(id_tarjeta,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'saldo':result[0] }
            json_items.append(content)
            content = {}
        
        return json_items[0]['saldo']

    except Exception as e:
        print(e)
    finally:
        cur.close()

def getCantProducto(id_producto):
    try: 
        cur = mysql.connect().cursor()
        cur.execute("SELECT t.cantidad_disponible from tbl_productos t WHERE id_producto=%s",(id_producto,))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            content = { 'cantidad':result[0] }
            json_items.append(content)
            content = {}
        
        return json_items[0]['cantidad']

    except Exception as e:
        print(e)
    finally:
        cur.close()

def restarProductosInventario(producto):
    productosComprados = producto['cantidad']
    productosRestantes = getCantProducto(producto['id_producto']) - productosComprados
    try:
        query = "UPDATE tbl_productos SET cantidad_disponible=%s WHERE id_producto =%s"
        data = (productosRestantes, producto['id_producto'])
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query, data)
        conn.commit()
        res = jsonify('Comprador actualizado exitosamente.')
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cur.close()


