from flask import Flask
from flask_cors import CORS
from flaskext.mysql import MySQL

app = Flask(__name__)
CORS(app)

mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'proyecto1'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)

import usuarios, tiendas, compradores, tarjetas, direcciones_envios, reporte_ventas, reporte_compras
import facturas, productos, carritos, redes_sociales, productos_fotos, comentarios, categorias, reportes_compras, productos_categorias
import compradores_tiendas, productos_reportes, facturas_productos, productos_carrito, compras, tiendas_calificaciones, productos_calificaciones, reportes_abusos
#Aquí se agregarían los demás archivos vía import en caso de tener otras API’s