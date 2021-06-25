from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_reporte_comprasByComprador/<int:id>')
def get_reporteComprasByComprador(id):
    try:
        ingresoTotal = 0
        cur = mysql.connect().cursor()
        cur.execute("select DISTINCT p.*, (fp.cantidad_producto * p.precio) as total, fp.cantidad_producto, t.numero_tarjeta from tbl_productos p join tbl_factura_producto fp on p.id_producto = fp.id_producto join tbl_facturas f on f.id_tienda = p.id_tienda join tbl_tarjetas t ON t.id_tarjeta = f.id_tarjeta where f.id_comprador=%s",(id,))
        
        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            ingresoTotal += result[11]
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10], 'total_producto':result[11], 'productos_comprados':result[12], 'tarjeta':result[13]}
            json_items.append(content)
            content = {}

        content2 = { 'ingreso_total':ingresoTotal }
        json_items.append(content2)

        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_reporte_comprasByCompradorRango/<int:id>/<int:fecha1>/<int:fecha2>')
def get_reporteComprasByCompradorAndRango(id, fecha1, fecha2):
    try:
        gastoTotal = 0
        fecha1 = str(fecha1)
        fecha2 = str(fecha2)
        cur = mysql.connect().cursor()
        cur.execute("select DISTINCT p.*, (fp.cantidad_producto * p.precio) as total, fp.cantidad_producto, t.numero_tarjeta from tbl_productos p join tbl_factura_producto fp on p.id_producto = fp.id_producto join tbl_facturas f on f.id_tienda = p.id_tienda join tbl_tarjetas t ON t.id_tarjeta = f.id_tarjeta where f.id_comprador=%s AND f.fecha_generada between %s and %s",(id, fecha1, fecha2))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            gastoTotal += result[11]
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10], 'total_producto':result[11], 'productos_comprados':result[12], 'tarjeta':result[13]}
            json_items.append(content)
            content = {}

        content2 = { 'gasto_total':gastoTotal }
        json_items.append(content2)
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()