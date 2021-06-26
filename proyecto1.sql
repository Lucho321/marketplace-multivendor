-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2021 a las 14:05:07
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.33

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
  `id_carrito_deseo` bigint(20) NOT NULL,
  `es_deseo` tinyint(1) NOT NULL,
  `id_comprador` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_carrito_deseos`
--

INSERT INTO `tbl_carrito_deseos` (`id_carrito_deseo`, `es_deseo`, `id_comprador`) VALUES
(1, 1, 1),
(2, 0, 1),
(3, 1, 2),
(4, 0, 2),
(5, 1, 3),
(6, 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_categorias`
--

CREATE TABLE `tbl_categorias` (
  `id_categoria` bigint(20) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_categorias`
--

INSERT INTO `tbl_categorias` (`id_categoria`, `nombre`, `descripcion`) VALUES
(1, 'Ropa', ''),
(2, 'Femenino', ''),
(3, 'Masculino', ''),
(4, 'Inferior', ''),
(5, 'Superior', ''),
(6, 'Vehículos', ''),
(7, 'Accesorios', ''),
(8, 'Repuestos', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_comentarios`
--

CREATE TABLE `tbl_comentarios` (
  `id_comentario` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `comentario` varchar(200) NOT NULL,
  `nivel` int(11) DEFAULT NULL,
  `id_producto` bigint(20) DEFAULT NULL,
  `padre` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_comentarios`
--

INSERT INTO `tbl_comentarios` (`id_comentario`, `id_usuario`, `comentario`, `nivel`, `id_producto`, `padre`) VALUES
(1, 2, 'Me encanta, yo se lo compre a mi novia', NULL, 1, NULL),
(2, 2, 'Esta precioso, se lo quiero regalar a mi novia', NULL, 8, NULL),
(3, 2, 'Yo compre, no salió muy buena', NULL, 10, NULL),
(4, 7, 'SIUUUUUUUUUUUU', NULL, 1, NULL),
(5, 7, 'SIIUUUUUUUUUUUUU', NULL, 10, NULL),
(6, 7, 'SIUUUUUUUUUUUUUUUU', NULL, 2, NULL),
(7, 7, 'SIIIUUUUUUUUUUUUUUUU', NULL, 3, NULL),
(8, 7, 'SIUUUUUUUUUUUUUUUUU', NULL, 4, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_compradores`
--

CREATE TABLE `tbl_compradores` (
  `id_comprador` bigint(20) NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_compradores`
--

INSERT INTO `tbl_compradores` (`id_comprador`, `id_usuario`) VALUES
(1, 2),
(2, 6),
(3, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_compradores_tiendas`
--

CREATE TABLE `tbl_compradores_tiendas` (
  `id_comprador` bigint(20) NOT NULL,
  `id_tienda` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_compradores_tiendas`
--

INSERT INTO `tbl_compradores_tiendas` (`id_comprador`, `id_tienda`) VALUES
(1, 1),
(1, 4);

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

--
-- Volcado de datos para la tabla `tbl_direcciones_envios`
--

INSERT INTO `tbl_direcciones_envios` (`id_direccion`, `pais`, `provincia`, `numero_casillero`, `codigo_postal`, `observaciones`, `id_comprador`) VALUES
(1, 'Costa Rica', 'San Jose', '565F', '11901', 'Barrio Cooperativa Contiguo al Colegio Calderón Guardia', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_facturas`
--

CREATE TABLE `tbl_facturas` (
  `id_factura` bigint(20) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `direccion_url` varchar(100) NOT NULL,
  `fecha_generada` date NOT NULL,
  `id_tienda` bigint(20) DEFAULT NULL,
  `id_comprador` bigint(20) DEFAULT NULL,
  `id_tarjeta` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_factura_producto`
--

CREATE TABLE `tbl_factura_producto` (
  `id_factura` bigint(20) NOT NULL,
  `id_producto` bigint(20) NOT NULL,
  `cantidad_producto` int(11) DEFAULT NULL
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

--
-- Volcado de datos para la tabla `tbl_productos`
--

INSERT INTO `tbl_productos` (`id_producto`, `nombre_producto`, `descripcion`, `cantidad_disponible`, `fecha_publicacion`, `ubicacion`, `precio`, `tiempo_envio`, `costo_envio`, `calificacion`, `id_tienda`) VALUES
(1, 'Enaguita Miedo', 'Enaguita miedo para que deje a los wilas como locos', 15, '0000-00-00', 'Desamparados', 12, '3', 4, 0, 1),
(2, 'Pasamontañas miedo', 'Pasamontañas terror para que puedas asaltar tu \"Chino\" favorito', 12, '0000-00-00', 'Desamparados', 20, '5', 8, 5, 1),
(3, 'Gorrita Miedo', 'Gorrita miedo para que pegue porte con las chichis', 27, '2021-06-26', 'Desamparados', 15, '4', 5, 5, 1),
(4, 'fgfgfg', 'fgfg', 10, '2021-06-26', 'fgfg', 10, '10', 10, 0, 1),
(5, 'Gorra YST', 'Gorra original Yo Soy Tico', 15, '2021-06-26', 'La Sabana', 8, '3', 3, 0, 2),
(6, 'Camiseta YST', 'Camiseta original Yo Soy Tico', 30, '2021-06-26', 'La Sabana', 7, '3', 5, 0, 2),
(7, 'Camiseta Negra Tommy', 'Camiseta negra marca Tommy', 5, '2021-06-26', 'USA', 30, '5', 15, 0, 3),
(8, 'Vestido Amarillo', 'Vestido amarillo, hermoso y casual, especial para cualquier ocasión', 6, '2021-06-26', 'USA', 40, '5', 10, 4, 3),
(9, 'Casco FOX', 'Casco FOX Ultra resistente y ligero', 15, '2021-06-26', 'Liberia', 95, '3', 7, 0, 4),
(10, 'Tubo Escape', 'Tubo Escape Yamaha para Scooter', 22, '2021-06-26', 'Liberia', 45, '4', 5, 1.5, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_productos_calificaciones`
--

CREATE TABLE `tbl_productos_calificaciones` (
  `id_producto_calificacion` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `calificacion` float NOT NULL,
  `id_producto` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_productos_calificaciones`
--

INSERT INTO `tbl_productos_calificaciones` (`id_producto_calificacion`, `id_usuario`, `calificacion`, `id_producto`) VALUES
(1, 2, 4, 8),
(2, 2, 2, 10),
(3, 7, 1, 10),
(4, 7, 5, 2),
(5, 7, 5, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_productos_carrito`
--

CREATE TABLE `tbl_productos_carrito` (
  `id_carrito_deseo` bigint(20) NOT NULL,
  `id_producto` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_productos_carrito`
--

INSERT INTO `tbl_productos_carrito` (`id_carrito_deseo`, `id_producto`, `cantidad`) VALUES
(1, 2, 3),
(1, 3, 3),
(2, 1, 0),
(2, 6, 0),
(2, 7, 0),
(2, 8, 0),
(2, 9, 0),
(5, 6, 1),
(5, 8, 3),
(6, 1, 0),
(6, 2, 0),
(6, 3, 0),
(6, 4, 0),
(6, 5, 0),
(6, 6, 0),
(6, 7, 0),
(6, 8, 0),
(6, 9, 0),
(6, 10, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_productos_categorias`
--

CREATE TABLE `tbl_productos_categorias` (
  `id_producto` bigint(20) NOT NULL,
  `id_categoria` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_productos_categorias`
--

INSERT INTO `tbl_productos_categorias` (`id_producto`, `id_categoria`) VALUES
(1, 1),
(1, 2),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 5),
(3, 1),
(3, 5),
(4, 2),
(5, 1),
(5, 2),
(5, 3),
(6, 1),
(6, 3),
(7, 1),
(7, 3),
(7, 5),
(8, 1),
(8, 2),
(9, 6),
(9, 7),
(10, 6),
(10, 8);

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

--
-- Volcado de datos para la tabla `tbl_productos_fotos`
--

INSERT INTO `tbl_productos_fotos` (`id_foto`, `nombre`, `url_foto`, `id_producto`) VALUES
(1, 'no-disponible.jpg', 'pro-1-ima-1-D_NQ_NP_673160-MLM31908313181_082019-O.jpg', 1),
(2, 'no-disponible.jpg', 'pro-1-ima-2-fafcb6c618be0e174d02d4691483b4f6.jpg', 1),
(3, 'no-disponible.jpg', 'pro-2-ima-3-71yZRz0TK7L._AC_SY550_.jpg', 2),
(4, 'no-disponible.jpg', 'pro-2-ima-4-retrato-ladron-pasamontanas_13339-212480.jpg', 2),
(5, 'no-disponible.jpg', 'pro-3-ima-5-pro-2-ima-4.jpg', 3),
(7, 'no-disponible.jpg', 'pro-5-ima-7-fgfgf.jpg', 5),
(8, 'no-disponible.jpg', 'pro-5-ima-8-fgfgfgf.jfif', 5),
(9, 'no-disponible.jpg', 'pro-6-ima-9-foto-camisa-3.jpg', 6),
(10, 'no-disponible.jpg', 'pro-7-ima-10-ca.jpg', 7),
(11, 'no-disponible.jpg', 'pro-7-ima-11-camiseta.jpg', 7),
(12, 'no-disponible.jpg', 'pro-8-ima-12-ves.jpg', 8),
(13, 'no-disponible.jpg', 'pro-8-ima-13-v.jpg', 8),
(14, 'no-disponible.jpg', 'pro-8-ima-14-vs.jpg', 8),
(15, 'no-disponible.jpg', 'pro-9-ima-15-c.jpg', 9),
(16, 'no-disponible.jpg', 'pro-9-ima-16-cc.png', 9),
(17, 'no-disponible.jpg', 'pro-10-ima-17-tb.jpg', 10),
(19, 'no-disponible.jpg', 'pro-10-ima-19-tb2.jpg', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_redes_sociales`
--

CREATE TABLE `tbl_redes_sociales` (
  `id_red_social` bigint(20) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `valor` varchar(20) NOT NULL,
  `url_perfil` varchar(100) NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_redes_sociales`
--

INSERT INTO `tbl_redes_sociales` (`id_red_social`, `tipo`, `valor`, `url_perfil`, `id_usuario`) VALUES
(1, 'facebook', 'pegandoporte', 'facebook.com/pegandoporte', 1),
(2, 'instagram', 'pablove_00', 'instagram.com/pablove_00', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_reportes_abusos`
--

CREATE TABLE `tbl_reportes_abusos` (
  `id_tienda` bigint(20) NOT NULL,
  `id_comprador` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_reportes_abusos`
--

INSERT INTO `tbl_reportes_abusos` (`id_tienda`, `id_comprador`) VALUES
(3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tarjetas`
--

CREATE TABLE `tbl_tarjetas` (
  `id_tarjeta` bigint(20) NOT NULL,
  `nombre_propietario` varchar(64) NOT NULL,
  `numero_tarjeta` varchar(50) NOT NULL,
  `codigo_cvv` varchar(6) NOT NULL,
  `fecha_vence` varchar(11) NOT NULL,
  `saldo` float NOT NULL,
  `id_comprador` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_tarjetas`
--

INSERT INTO `tbl_tarjetas` (`id_tarjeta`, `nombre_propietario`, `numero_tarjeta`, `codigo_cvv`, `fecha_vence`, `saldo`, `id_comprador`) VALUES
(1, 'Pablo Venegas Elizondo', '1234123412341234', '613', '03/22', 360, 1),
(3, 'Pablo Venegas Elizondo', '1111111111111111', '613', '03/22', 856, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tiendas`
--

CREATE TABLE `tbl_tiendas` (
  `id_tienda` bigint(20) NOT NULL,
  `calificacion` float DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  `abusos` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_tiendas`
--

INSERT INTO `tbl_tiendas` (`id_tienda`, `calificacion`, `descripcion`, `id_usuario`, `abusos`) VALUES
(1, 5, 'La tienda más AK7 y tuanis de Costa Rica, para que pegue porte y la vara', 1, 0),
(2, 0, 'La Televisora de Costa Rica', 3, 0),
(3, 0, 'La tienda más fashion de toda Costa Rica', 4, 0),
(4, 0, 'Aquí puedes encontrar todo lo que quieras para tu motocicleta', 5, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tiendas_calificaciones`
--

CREATE TABLE `tbl_tiendas_calificaciones` (
  `id_tienda_calificacion` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `calificacion` float NOT NULL,
  `id_tienda` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_tiendas_calificaciones`
--

INSERT INTO `tbl_tiendas_calificaciones` (`id_tienda_calificacion`, `id_usuario`, `calificacion`, `id_tienda`) VALUES
(1, 2, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `id_usuario` bigint(20) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `nombre_usuario` varchar(20) NOT NULL,
  `contrasena` varchar(150) NOT NULL,
  `nombre_real` varchar(64) NOT NULL,
  `pais` varchar(20) NOT NULL,
  `direccion` varchar(64) NOT NULL,
  `fotografia` varchar(50) DEFAULT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(64) NOT NULL,
  `tipo_usuario` tinyint(1) NOT NULL,
  `abuso` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`id_usuario`, `cedula`, `nombre_usuario`, `contrasena`, `nombre_real`, `pais`, `direccion`, `fotografia`, `telefono`, `email`, `tipo_usuario`, `abuso`, `estado`) VALUES
(1, '88895784564', 'tiendita_miedo', 'pbkdf2:sha256:260000$iWHsX0oHII0KUm0V$f04494032afa6ee7dfb5425ea9a7b7dc048052566b9d803095b3b0b023d63681', 'Tiendita Miedo CR', 'Costa Rica', 'Desamparados', 'usr-1-usr-1.png', '78546932', 'tienditamiedo@info.com', 0, 0, 1),
(2, '117920192', 'pablove', 'pbkdf2:sha256:260000$iWHsX0oHII0KUm0V$f04494032afa6ee7dfb5425ea9a7b7dc048052566b9d803095b3b0b023d63681', 'Pablo Venegas Elizondo', 'Costa Rica', 'Barrio Cooperativa', 'usr-2-2130.jpg', '89659554', 'pablo@gmail.com', 1, 0, 1),
(3, '4548454646486', 'teletica', 'pbkdf2:sha256:260000$uMbgH1pyPKAZQdCG$d5a536ecdbf4bf4e4422dfad52d6d7e00b46c3bbded0f7420740382dd864177b', 'Teletica Tienda', 'Costa Rica', 'La Sabana', 'usr-3-gJhI7QoL.jpg', '27710045', 'teleticacr@info.com', 0, 0, 1),
(4, '758466463226', 'farosa', 'pbkdf2:sha256:260000$vyLDGqyetpuAb5kV$2502fe598eaa54c8d39fcc3cbf8f33cf992d61aa573a565f8325e23622da31f8', 'Farosa Boutique', 'Costa Rica', 'Pérez Zeledón', 'usr-4-usr-2.jpg', '86784543', 'farosa@gmail.com', 0, 0, 1),
(5, '7876465688', 'mm', 'pbkdf2:sha256:260000$G4kbwPc9BQFblfFd$c05692d2197ce0be4c18a1eb57fce45036be99122cbffb5c48827e4f81413d42', 'Mundo Moto', 'Costa Rica', 'Liberia', 'usr-5-usr-3.jpeg', '45657896421', 'mundomoto@hotmail.com', 0, 0, 1),
(6, '456215768', 'german', 'pbkdf2:sha256:260000$ctiGrQmAhmOJj30W$1f3c6f069f77d28fcbce82ba4078585c7a8eb960a427ff96e7ec614f52f4f447', 'German Garmendia', 'Chile', 'Santiago', 'usr-6-unnamed.jpg', '45681245', 'german@gmail.com', 1, 0, 1),
(7, '456789546', 'cristiano', 'pbkdf2:sha256:260000$yV7OwSbCDx0m777o$d0cb02cccd925bbc89924de4b4bddc06d64eca4b6f4fe4fb5c5a25cd5a7a1b2d', 'Cristiano Ronaldo', 'Portugal', 'Buenos Aires, Chupatelmango', 'usr-7-cris.jpg', '86457854', 'cristiano@gmail.com', 1, 0, 1);

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
  ADD KEY `IX_Relationship25` (`id_producto`),
  ADD KEY `IX_Relationship29` (`padre`),
  ADD KEY `IX_Relationship37` (`id_usuario`);

--
-- Indices de la tabla `tbl_compradores`
--
ALTER TABLE `tbl_compradores`
  ADD PRIMARY KEY (`id_comprador`),
  ADD KEY `IX_Relationship3` (`id_usuario`);

--
-- Indices de la tabla `tbl_compradores_tiendas`
--
ALTER TABLE `tbl_compradores_tiendas`
  ADD PRIMARY KEY (`id_comprador`,`id_tienda`),
  ADD KEY `Relationship28` (`id_tienda`);

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
  ADD KEY `IX_Relationship22` (`id_tienda`),
  ADD KEY `IX_Relationship35` (`id_comprador`),
  ADD KEY `IX_Relationship36` (`id_tarjeta`);

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
-- Indices de la tabla `tbl_productos_calificaciones`
--
ALTER TABLE `tbl_productos_calificaciones`
  ADD PRIMARY KEY (`id_producto_calificacion`),
  ADD KEY `IX_Relationship33` (`id_producto`);

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
-- Indices de la tabla `tbl_redes_sociales`
--
ALTER TABLE `tbl_redes_sociales`
  ADD PRIMARY KEY (`id_red_social`),
  ADD KEY `IX_Relationship4` (`id_usuario`);

--
-- Indices de la tabla `tbl_reportes_abusos`
--
ALTER TABLE `tbl_reportes_abusos`
  ADD PRIMARY KEY (`id_tienda`,`id_comprador`),
  ADD KEY `Relationship39` (`id_comprador`);

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
-- Indices de la tabla `tbl_tiendas_calificaciones`
--
ALTER TABLE `tbl_tiendas_calificaciones`
  ADD PRIMARY KEY (`id_tienda_calificacion`),
  ADD KEY `IX_Relationship34` (`id_tienda`);

--
-- Indices de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_carrito_deseos`
--
ALTER TABLE `tbl_carrito_deseos`
  MODIFY `id_carrito_deseo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_categorias`
--
ALTER TABLE `tbl_categorias`
  MODIFY `id_categoria` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tbl_comentarios`
--
ALTER TABLE `tbl_comentarios`
  MODIFY `id_comentario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tbl_compradores`
--
ALTER TABLE `tbl_compradores`
  MODIFY `id_comprador` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_direcciones_envios`
--
ALTER TABLE `tbl_direcciones_envios`
  MODIFY `id_direccion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_facturas`
--
ALTER TABLE `tbl_facturas`
  MODIFY `id_factura` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_productos`
--
ALTER TABLE `tbl_productos`
  MODIFY `id_producto` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tbl_productos_calificaciones`
--
ALTER TABLE `tbl_productos_calificaciones`
  MODIFY `id_producto_calificacion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_productos_fotos`
--
ALTER TABLE `tbl_productos_fotos`
  MODIFY `id_foto` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tbl_redes_sociales`
--
ALTER TABLE `tbl_redes_sociales`
  MODIFY `id_red_social` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_tarjetas`
--
ALTER TABLE `tbl_tarjetas`
  MODIFY `id_tarjeta` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_tiendas`
--
ALTER TABLE `tbl_tiendas`
  MODIFY `id_tienda` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_tiendas_calificaciones`
--
ALTER TABLE `tbl_tiendas_calificaciones`
  MODIFY `id_tienda_calificacion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  ADD CONSTRAINT `Relationship25` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`),
  ADD CONSTRAINT `Relationship29` FOREIGN KEY (`padre`) REFERENCES `tbl_comentarios` (`id_comentario`),
  ADD CONSTRAINT `Relationship37` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`);

--
-- Filtros para la tabla `tbl_compradores`
--
ALTER TABLE `tbl_compradores`
  ADD CONSTRAINT `Relationship3` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`);

--
-- Filtros para la tabla `tbl_compradores_tiendas`
--
ALTER TABLE `tbl_compradores_tiendas`
  ADD CONSTRAINT `Relationship27` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`),
  ADD CONSTRAINT `Relationship28` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`);

--
-- Filtros para la tabla `tbl_direcciones_envios`
--
ALTER TABLE `tbl_direcciones_envios`
  ADD CONSTRAINT `Relationship5` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`);

--
-- Filtros para la tabla `tbl_facturas`
--
ALTER TABLE `tbl_facturas`
  ADD CONSTRAINT `Relationship22` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`),
  ADD CONSTRAINT `Relationship35` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`),
  ADD CONSTRAINT `Relationship36` FOREIGN KEY (`id_tarjeta`) REFERENCES `tbl_tarjetas` (`id_tarjeta`);

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
-- Filtros para la tabla `tbl_productos_calificaciones`
--
ALTER TABLE `tbl_productos_calificaciones`
  ADD CONSTRAINT `Relationship33` FOREIGN KEY (`id_producto`) REFERENCES `tbl_productos` (`id_producto`);

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
-- Filtros para la tabla `tbl_redes_sociales`
--
ALTER TABLE `tbl_redes_sociales`
  ADD CONSTRAINT `Relationship4` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios` (`id_usuario`);

--
-- Filtros para la tabla `tbl_reportes_abusos`
--
ALTER TABLE `tbl_reportes_abusos`
  ADD CONSTRAINT `Relationship38` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`),
  ADD CONSTRAINT `Relationship39` FOREIGN KEY (`id_comprador`) REFERENCES `tbl_compradores` (`id_comprador`);

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

--
-- Filtros para la tabla `tbl_tiendas_calificaciones`
--
ALTER TABLE `tbl_tiendas_calificaciones`
  ADD CONSTRAINT `Relationship34` FOREIGN KEY (`id_tienda`) REFERENCES `tbl_tiendas` (`id_tienda`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
