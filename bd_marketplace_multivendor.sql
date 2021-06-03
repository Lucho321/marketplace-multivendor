-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2021 a las 18:04:58
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_carrito_deseos`
--

CREATE TABLE `tbl_carrito_deseos` (
  `id_carrito_deseo` int(11) NOT NULL,
  `es_deseo` tinyint(1) NOT NULL,
  `id_comprador` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_categorias`
--

CREATE TABLE `tbl_categorias` (
  `id_categoria` bigint(20) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_comentarios`
--

CREATE TABLE `tbl_comentarios` (
  `id_comentario` bigint(20) NOT NULL,
  `comentario` varchar(200) NOT NULL,
  `padre` varchar(200) DEFAULT NULL,
  `nivel` int(11) DEFAULT NULL,
  `id_producto` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_compradores`
--

CREATE TABLE `tbl_compradores` (
  `id_comprador` bigint(20) NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  `id_tienda` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_direcciones_envios`
--

CREATE TABLE `tbl_direcciones_envios` (
  `id_direccion` bigint(20) NOT NULL,
  `pais` varchar(25) NOT NULL,
  `provincia` varchar(25) NOT NULL,
  `numero_casillero` varchar(10) NOT NULL,
  `codigo_postal` varchar(10) NOT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `id_comprador` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_facturas`
--

CREATE TABLE `tbl_facturas` (
  `id_factura` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `direccion_url` varchar(100) NOT NULL,
  `fecha_generada` date NOT NULL,
  `id_tienda` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_factura_producto`
--

CREATE TABLE `tbl_factura_producto` (
  `id_factura` int(11) NOT NULL,
  `id_producto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_productos`
--

CREATE TABLE `tbl_productos` (
  `id_producto` bigint(20) NOT NULL,
  `nombre_producto` varchar(50) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `cantidad_disponible` int(11) NOT NULL,
  `fecha_publicacion` date NOT NULL,
  `ubicacion` varchar(250) NOT NULL,
  `precio` float NOT NULL,
  `tiempo_envio` varchar(25) DEFAULT NULL,
  `costo_envio` float DEFAULT NULL,
  `calificacion` float DEFAULT NULL,
  `id_tienda` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_productos_carrito`
--

CREATE TABLE `tbl_productos_carrito` (
  `id_carrito_deseo` int(11) NOT NULL,
  `id_producto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_productos_categorias`
--

CREATE TABLE `tbl_productos_categorias` (
  `id_producto` bigint(20) NOT NULL,
  `id_categoria` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_productos_fotos`
--

CREATE TABLE `tbl_productos_fotos` (
  `id_foto` bigint(20) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `url_foto` varchar(100) NOT NULL,
  `id_producto` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_productos_reportes`
--

CREATE TABLE `tbl_productos_reportes` (
  `id_reportes_compras` bigint(20) NOT NULL,
  `id_producto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_redes_sociales`
--

CREATE TABLE `tbl_redes_sociales` (
  `id_red_social` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `nombre_usuario` varchar(64) NOT NULL,
  `url_perfil` varchar(100) NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_reportes_compras`
--

CREATE TABLE `tbl_reportes_compras` (
  `id_reportes_compras` bigint(20) NOT NULL,
  `url_factura` varchar(100) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  `id_tienda` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tarjetas`
--

CREATE TABLE `tbl_tarjetas` (
  `id_tarjeta` int(11) NOT NULL,
  `nombre_propietario` varchar(64) NOT NULL,
  `numero_tarjeta` varchar(50) NOT NULL,
  `codigo_cvv` varchar(6) NOT NULL,
  `fecha_vence` varchar(11) NOT NULL,
  `saldo` float NOT NULL,
  `id_comprador` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tiendas`
--

CREATE TABLE `tbl_tiendas` (
  `id_tienda` bigint(20) NOT NULL,
  `calificacion` float NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `id_usuario` bigint(20) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `nombre_usuario` varchar(20) NOT NULL,
  `contrasena` varchar(64) NOT NULL,
  `nombre_real` varchar(64) NOT NULL,
  `pais` varchar(20) NOT NULL,
  `direccion` varchar(64) NOT NULL,
  `fotografia` varchar(20) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(20) NOT NULL,
  `tipo_usuario` tinyint(1) NOT NULL,
  `abuso` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_carrito_deseos`
--
ALTER TABLE `tbl_carrito_deseos`
  ADD PRIMARY KEY (`id_carrito_deseo`),
  ADD KEY `IX_Relationship7` (`id_comprador`);

--
-- Indices de la tabla `tbl_categorias`
--
ALTER TABLE `tbl_categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `tbl_comentarios`
--
ALTER TABLE `tbl_comentarios`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `IX_Relationship25` (`id_producto`);

--
-- Indices de la tabla `tbl_compradores`
--
ALTER TABLE `tbl_compradores`
  ADD PRIMARY KEY (`id_comprador`),
  ADD KEY `IX_Relationship3` (`id_usuario`),
  ADD KEY `IX_Relationship26` (`id_tienda`);

--
-- Indices de la tabla `tbl_direcciones_envios`
--
ALTER TABLE `tbl_direcciones_envios`
  ADD PRIMARY KEY (`id_direccion`),
  ADD KEY `IX_Relationship5` (`id_comprador`);

--
-- Indices de la tabla `tbl_facturas`
--
ALTER TABLE `tbl_facturas`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `IX_Relationship22` (`id_tienda`);

--
-- Indices de la tabla `tbl_factura_producto`
--
ALTER TABLE `tbl_factura_producto`
  ADD PRIMARY KEY (`id_factura`,`id_producto`),
  ADD KEY `Relationship24` (`id_producto`);

--
-- Indices de la tabla `tbl_productos`
--
ALTER TABLE `tbl_productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `IX_Relationship1` (`id_tienda`);

--
-- Indices de la tabla `tbl_productos_carrito`
--
ALTER TABLE `tbl_productos_carrito`
  ADD PRIMARY KEY (`id_carrito_deseo`,`id_producto`),
  ADD KEY `Relationship13` (`id_producto`);

--
-- Indices de la tabla `tbl_productos_categorias`
--
ALTER TABLE `tbl_productos_categorias`
  ADD PRIMARY KEY (`id_producto`,`id_categoria`),
  ADD KEY `Relationship17` (`id_categoria`);

--
-- Indices de la tabla `tbl_productos_fotos`
--
ALTER TABLE `tbl_productos_fotos`
  ADD PRIMARY KEY (`id_foto`),
  ADD KEY `IX_Relationship15` (`id_producto`);

--
-- Indices de la tabla `tbl_productos_reportes`
--
ALTER TABLE `tbl_productos_reportes`
  ADD PRIMARY KEY (`id_reportes_compras`,`id_producto`),
  ADD KEY `Relationship21` (`id_producto`);

--
-- Indices de la tabla `tbl_redes_sociales`
--
ALTER TABLE `tbl_redes_sociales`
  ADD PRIMARY KEY (`id_red_social`),
  ADD KEY `IX_Relationship4` (`id_usuario`);

--
-- Indices de la tabla `tbl_reportes_compras`
--
ALTER TABLE `tbl_reportes_compras`
  ADD PRIMARY KEY (`id_reportes_compras`),
  ADD KEY `IX_Relationship18` (`id_usuario`),
  ADD KEY `IX_Relationship19` (`id_tienda`);

--
-- Indices de la tabla `tbl_tarjetas`
--
ALTER TABLE `tbl_tarjetas`
  ADD PRIMARY KEY (`id_tarjeta`),
  ADD KEY `IX_Relationship6` (`id_comprador`);

--
-- Indices de la tabla `tbl_tiendas`
--
ALTER TABLE `tbl_tiendas`
  ADD PRIMARY KEY (`id_tienda`),
  ADD KEY `IX_Relationship2` (`id_usuario`);

--
-- Indices de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_carrito_deseos`
--
ALTER TABLE `tbl_carrito_deseos`
  ADD CONSTRAINT `Relationship7` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`);

--
-- Filtros para la tabla `tbl_comentarios`
--
ALTER TABLE `tbl_comentarios`
  ADD CONSTRAINT `Relationship25` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`);

--
-- Filtros para la tabla `tbl_compradores`
--
ALTER TABLE `tbl_compradores`
  ADD CONSTRAINT `Relationship26` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`),
  ADD CONSTRAINT `Relationship3` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`);

--
-- Filtros para la tabla `tbl_direcciones_envios`
--
ALTER TABLE `tbl_direcciones_envios`
  ADD CONSTRAINT `Relationship5` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`);

--
-- Filtros para la tabla `tbl_facturas`
--
ALTER TABLE `tbl_facturas`
  ADD CONSTRAINT `Relationship22` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`);

--
-- Filtros para la tabla `tbl_factura_producto`
--
ALTER TABLE `tbl_factura_producto`
  ADD CONSTRAINT `Relationship23` FOREIGN KEY (`id_factura`) REFERENCES `tbl_facturas` (`id_factura`),
  ADD CONSTRAINT `Relationship24` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`);

--
-- Filtros para la tabla `tbl_productos`
--
ALTER TABLE `tbl_productos`
  ADD CONSTRAINT `Relationship1` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`);

--
-- Filtros para la tabla `tbl_productos_carrito`
--
ALTER TABLE `tbl_productos_carrito`
  ADD CONSTRAINT `Relationship12` FOREIGN KEY (`id_carrito_deseo`) REFERENCES `tbl_carrito_deseos` (`id_carrito_deseo`),
  ADD CONSTRAINT `Relationship13` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`);

--
-- Filtros para la tabla `tbl_productos_categorias`
--
ALTER TABLE `tbl_productos_categorias`
  ADD CONSTRAINT `Relationship16` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`),
  ADD CONSTRAINT `Relationship17` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categorias` (`id_categoria`);

--
-- Filtros para la tabla `tbl_productos_fotos`
--
ALTER TABLE `tbl_productos_fotos`
  ADD CONSTRAINT `Relationship15` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`);

--
-- Filtros para la tabla `tbl_productos_reportes`
--
ALTER TABLE `tbl_productos_reportes`
  ADD CONSTRAINT `Relationship20` FOREIGN KEY (`id_reportes_compras`) REFERENCES `tbl_reportes_compras` (`id_reportes_compras`),
  ADD CONSTRAINT `Relationship21` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`);

--
-- Filtros para la tabla `tbl_redes_sociales`
--
ALTER TABLE `tbl_redes_sociales`
  ADD CONSTRAINT `Relationship4` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`);

--
-- Filtros para la tabla `tbl_reportes_compras`
--
ALTER TABLE `tbl_reportes_compras`
  ADD CONSTRAINT `Relationship18` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`),
  ADD CONSTRAINT `Relationship19` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`);

--
-- Filtros para la tabla `tbl_tarjetas`
--
ALTER TABLE `tbl_tarjetas`
  ADD CONSTRAINT `Relationship6` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`);

--
-- Filtros para la tabla `tbl_tiendas`
--
ALTER TABLE `tbl_tiendas`
  ADD CONSTRAINT `Relationship2` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
