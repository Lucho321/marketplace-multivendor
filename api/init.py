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

import usuarios #importamos el archivo usuarios.py
import tiendas 
import compradores
import tarjetas
import direcciones_envios
import facturas
import productos
#Aquí se agregarían los demás archivos vía import en caso de tener otras API’s