from flask import jsonify, request #nos permite formatear los resultados en JSON
from init import app
from init import mysql

@app.route('/get_reporte_ventasByTienda/<int:id>')
def get_reporteVentasByTienda(id):
    try:
        ingresoTotal = 0
        cur = mysql.connect().cursor()
        cur.execute("SELECT DISTINCT p.*, (p.precio * fp.cantidad_producto) as total, fp.cantidad_producto FROM tbl_productos p JOIN tbl_factura_producto fp ON p.id_producto = fp.id_producto JOIN tbl_facturas f ON f.id_tienda = p.id_tienda WHERE p.id_tienda=%s",(id,))
        
        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            ingresoTotal += result[11]
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10], 'total_producto':result[11], 'productos_vendidos':result[12]}
            json_items.append(content)
            content = {}

        content2 = { 'ingreso_total':ingresoTotal }
        json_items.append(content2)

        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/get_reporte_ventasByTiendaRango/<int:id>/<int:fecha1>/<int:fecha2>')
def get_reporteVentasByTiendaAndRango(id, fecha1, fecha2):
    try:
        ingresoTotal = 0
        fecha1 = str(fecha1)
        fecha2 = str(fecha2)
        cur = mysql.connect().cursor()
        cur.execute("SELECT DISTINCT p.*, (p.precio * fp.cantidad_producto) as total, fp.cantidad_producto FROM tbl_productos p JOIN tbl_factura_producto fp ON p.id_producto = fp.id_producto JOIN tbl_facturas f ON f.id_tienda = p.id_tienda WHERE p.id_tienda=%s AND f.fecha_generada BETWEEN %s AND %s",(id, fecha1, fecha2))

        rows = cur.fetchall()
        json_items = []
        content = {}
        for result in rows:
            ingresoTotal += result[11]
            content = { 'id_producto':result[0], 'nombre_producto':result[1], 'descripcion':result[2], 'cantidad_disponible':result[3], 'fecha_publicacion':result[4], 'ubicacion':result[5], 'precio':result[6], 'tiempo_envio':result[7], 'costo_envio':result[8], 'calificacion':result[9], 'id_tienda':result[10], 'total_producto':result[11], 'productos_vendidos':result[12]}
            json_items.append(content)
            content = {}

        content2 = { 'ingreso_total':ingresoTotal }
        json_items.append(content2)
        return jsonify(json_items) 

    except Exception as e:
        print(e)
    finally:
        cur.close()