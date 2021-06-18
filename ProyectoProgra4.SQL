/*
Created: 6/2/2021
Modified: 6/7/2021
Model: MySQL 8.0
Database: MySQL 8.0
*/

-- Create tables section -------------------------------------------------

-- Table tbl_usuarios

CREATE TABLE `tbl_usuarios`
(
  `id_usuario` Bigint NOT NULL AUTO_INCREMENT,
  `cedula` Varchar(20) NOT NULL,
  `nombre_usuario` Varchar(20) NOT NULL,
  `contrasena` Varchar(150) NOT NULL,
  `nombre_real` Varchar(64) NOT NULL,
  `pais` Varchar(20) NOT NULL,
  `direccion` Varchar(64) NOT NULL,
  `fotografia` Varchar(50),
  `telefono` Varchar(15) NOT NULL,
  `email` Varchar(64) NOT NULL,
  `tipo_usuario` Bool NOT NULL,
  `abuso` Int,
  `estado` Bool NOT NULL,
  PRIMARY KEY (`id_usuario`)
)
;

-- Table tbl_tiendas

CREATE TABLE `tbl_tiendas`
(
  `id_tienda` Bigint NOT NULL AUTO_INCREMENT,
  `calificacion` Float NOT NULL,
  `descripcion` Varchar(200),
  `id_usuario` Bigint,
  PRIMARY KEY (`id_tienda`)
)
;

CREATE INDEX `IX_Relationship2` ON `tbl_tiendas` (`id_usuario`)
;

-- Table tbl_compradores

CREATE TABLE `tbl_compradores`
(
  `id_comprador` Bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` Bigint,
  PRIMARY KEY (`id_comprador`)
)
;

CREATE INDEX `IX_Relationship3` ON `tbl_compradores` (`id_usuario`)
;

-- Table tbl_productos

CREATE TABLE `tbl_productos`
(
  `id_producto` Bigint NOT NULL AUTO_INCREMENT,
  `nombre_producto` Varchar(50) NOT NULL,
  `descripcion` Varchar(150) NOT NULL,
  `cantidad_disponible` Int NOT NULL,
  `fecha_publicacion` Date NOT NULL,
  `ubicacion` Varchar(250) NOT NULL,
  `precio` Float(0) NOT NULL,
  `tiempo_envio` Varchar(25),
  `costo_envio` Float,
  `calificacion` Float,
  `id_tienda` Bigint,
  PRIMARY KEY (`id_producto`)
)
;

CREATE INDEX `IX_Relationship1` ON `tbl_productos` (`id_tienda`)
;

-- Table tbl_comentarios

CREATE TABLE `tbl_comentarios`
(
  `id_comentario` Bigint NOT NULL AUTO_INCREMENT,
  `comentario` Varchar(200) NOT NULL,
  `nivel` Int,
  `id_producto` Bigint,
  `padre` Bigint,
  PRIMARY KEY (`id_comentario`)
)
;

CREATE INDEX `IX_Relationship25` ON `tbl_comentarios` (`id_producto`)
;

CREATE INDEX `IX_Relationship29` ON `tbl_comentarios` (`padre`)
;

-- Table tbl_categorias

CREATE TABLE `tbl_categorias`
(
  `id_categoria` Bigint NOT NULL AUTO_INCREMENT,
  `nombre` Varchar(25) NOT NULL,
  `descripcion` Varchar(250),
  PRIMARY KEY (`id_categoria`)
)
;

-- Table tbl_productos_fotos

CREATE TABLE `tbl_productos_fotos`
(
  `id_foto` Bigint NOT NULL AUTO_INCREMENT,
  `nombre` Varchar(25) NOT NULL,
  `url_foto` Varchar(100) NOT NULL,
  `id_producto` Bigint,
  PRIMARY KEY (`id_foto`)
)
;

CREATE INDEX `IX_Relationship15` ON `tbl_productos_fotos` (`id_producto`)
;

-- Table tbl_reportes_compras

CREATE TABLE `tbl_reportes_compras`
(
  `id_reportes_compras` Bigint NOT NULL AUTO_INCREMENT,
  `url_factura` Varchar(100) NOT NULL,
  `descripcion` Varchar(250),
  `id_tienda` Bigint,
  `id_comprador` Bigint,
  PRIMARY KEY (`id_reportes_compras`)
)
;

CREATE INDEX `IX_Relationship19` ON `tbl_reportes_compras` (`id_tienda`)
;

CREATE INDEX `IX_Relationship31` ON `tbl_reportes_compras` (`id_comprador`)
;

-- Table tbl_facturas

CREATE TABLE `tbl_facturas`
(
  `id_factura` Bigint NOT NULL AUTO_INCREMENT,
  `descripcion` Varchar(200) NOT NULL,
  `direccion_url` Varchar(100) NOT NULL,
  `fecha_generada` Date NOT NULL,
  `id_tienda` Bigint,
  PRIMARY KEY (`id_factura`)
)
;

CREATE INDEX `IX_Relationship22` ON `tbl_facturas` (`id_tienda`)
;

-- Table tbl_carrito_deseos

CREATE TABLE `tbl_carrito_deseos`
(
  `id_carrito_deseo` Bigint NOT NULL AUTO_INCREMENT,
  `es_deseo` Bool NOT NULL,
  `id_comprador` Bigint,
  PRIMARY KEY (`id_carrito_deseo`)
)
;

CREATE INDEX `IX_Relationship7` ON `tbl_carrito_deseos` (`id_comprador`)
;

-- Table tbl_redes_sociales

CREATE TABLE `tbl_redes_sociales`
(
  `id_red_social` Bigint NOT NULL AUTO_INCREMENT,
  `tipo` Varchar(10) NOT NULL,
  `valor` Varchar(20) NOT NULL,
  `url_perfil` Varchar(100) NOT NULL,
  `id_usuario` Bigint,
  PRIMARY KEY (`id_red_social`)
)
;

CREATE INDEX `IX_Relationship4` ON `tbl_redes_sociales` (`id_usuario`)
;

-- Table tbl_tarjetas

CREATE TABLE `tbl_tarjetas`
(
  `id_tarjeta` Bigint NOT NULL AUTO_INCREMENT,
  `nombre_propietario` Varchar(64) NOT NULL,
  `numero_tarjeta` Varchar(50) NOT NULL,
  `codigo_cvv` Varchar(6) NOT NULL,
  `fecha_vence` Varchar(11) NOT NULL,
  `saldo` Float NOT NULL,
  `id_comprador` Bigint,
  PRIMARY KEY (`id_tarjeta`)
)
;

CREATE INDEX `IX_Relationship6` ON `tbl_tarjetas` (`id_comprador`)
;

-- Table tbl_direcciones_envios

CREATE TABLE `tbl_direcciones_envios`
(
  `id_direccion` Bigint NOT NULL AUTO_INCREMENT,
  `pais` Varchar(25) NOT NULL,
  `provincia` Varchar(25) NOT NULL,
  `numero_casillero` Varchar(10) NOT NULL,
  `codigo_postal` Varchar(10) NOT NULL,
  `observaciones` Varchar(200),
  `id_comprador` Bigint,
  PRIMARY KEY (`id_direccion`)
)
;

CREATE INDEX `IX_Relationship5` ON `tbl_direcciones_envios` (`id_comprador`)
;

-- Table tbl_productos_carrito

CREATE TABLE `tbl_productos_carrito`
(
  `id_carrito_deseo` Bigint NOT NULL,
  `id_producto` Bigint NOT NULL,
  `cantidad` Int NOT NULL
)
;

ALTER TABLE `tbl_productos_carrito` ADD PRIMARY KEY (`id_carrito_deseo`, `id_producto`)
;

-- Table tbl_productos_categorias

CREATE TABLE `tbl_productos_categorias`
(
  `id_producto` Bigint NOT NULL,
  `id_categoria` Bigint NOT NULL
)
;

ALTER TABLE `tbl_productos_categorias` ADD PRIMARY KEY (`id_producto`, `id_categoria`)
;

-- Table tbl_productos_reportes

CREATE TABLE `tbl_productos_reportes`
(
  `id_reportes_compras` Bigint NOT NULL,
  `id_producto` Bigint NOT NULL
)
;

ALTER TABLE `tbl_productos_reportes` ADD PRIMARY KEY (`id_reportes_compras`, `id_producto`)
;

-- Table tbl_factura_producto

CREATE TABLE `tbl_factura_producto`
(
  `id_factura` Bigint NOT NULL,
  `id_producto` Bigint NOT NULL
)
;

ALTER TABLE `tbl_factura_producto` ADD PRIMARY KEY (`id_factura`, `id_producto`)
;

-- Table tbl_compradores_tiendas

CREATE TABLE `tbl_compradores_tiendas`
(
  `id_comprador` Bigint NOT NULL,
  `id_tienda` Bigint NOT NULL
)
;

ALTER TABLE `tbl_compradores_tiendas` ADD PRIMARY KEY (`id_comprador`, `id_tienda`)
;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE `tbl_productos` ADD CONSTRAINT `Relationship1` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_tiendas` ADD CONSTRAINT `Relationship2` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_compradores` ADD CONSTRAINT `Relationship3` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_redes_sociales` ADD CONSTRAINT `Relationship4` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_direcciones_envios` ADD CONSTRAINT `Relationship5` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_tarjetas` ADD CONSTRAINT `Relationship6` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_carrito_deseos` ADD CONSTRAINT `Relationship7` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_productos_carrito` ADD CONSTRAINT `Relationship12` FOREIGN KEY (`id_carrito_deseo`) REFERENCES `tbl_carrito_deseos` (`id_carrito_deseo`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_productos_carrito` ADD CONSTRAINT `Relationship13` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_productos_fotos` ADD CONSTRAINT `Relationship15` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_productos_categorias` ADD CONSTRAINT `Relationship16` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_productos_categorias` ADD CONSTRAINT `Relationship17` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categorias` (`id_categoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_reportes_compras` ADD CONSTRAINT `Relationship19` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_productos_reportes` ADD CONSTRAINT `Relationship20` FOREIGN KEY (`id_reportes_compras`) REFERENCES `tbl_reportes_compras` (`id_reportes_compras`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_productos_reportes` ADD CONSTRAINT `Relationship21` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_facturas` ADD CONSTRAINT `Relationship22` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_factura_producto` ADD CONSTRAINT `Relationship23` FOREIGN KEY (`id_factura`) REFERENCES `tbl_facturas` (`id_factura`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_factura_producto` ADD CONSTRAINT `Relationship24` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_comentarios` ADD CONSTRAINT `Relationship25` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_compradores_tiendas` ADD CONSTRAINT `Relationship27` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_compradores_tiendas` ADD CONSTRAINT `Relationship28` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_comentarios` ADD CONSTRAINT `Relationship29` FOREIGN KEY (`padre`) REFERENCES `tbl_comentarios` (`id_comentario`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tbl_reportes_compras` ADD CONSTRAINT `Relationship31` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

