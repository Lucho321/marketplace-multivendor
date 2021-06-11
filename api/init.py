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

import usuarios, tiendas, compradores, tarjetas, direcciones_envios, facturas, productos, carritos, redes_sociales, productos_fotos, comentarios
#Aquí se agregarían los demás archivos vía import en caso de tener otras API’s