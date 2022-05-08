-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-05-2022 a las 20:55:40
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestortareas`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `AddOrPut`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddOrPut` (IN `_id` INT, IN `_titulo` VARCHAR(50), IN `_descripcion` VARCHAR(250), IN `_estatus` INT, IN `_fecha_entrega` DATE, IN `_comentarios` VARCHAR(250), IN `_responsable` VARCHAR(50), IN `_tags` VARCHAR(200))  BEGIN
	IF _id= 0 THEN
    INSERT INTO tareas(titulo,descripcion,estatus,fecha_entrega,comentarios,responsable,tags)
    VALUES(_titulo, _descripcion, _estatus, _fecha_entrega, _comentarios ,_responsable, _tags);
    
    SET _id = LAST_INSERT_ID();
    
    ELSE
    	UPDATE tareas 
        SET 
        	titulo = _titulo,
            descripcion = _descripcion,
            estatus = _estatus,
            fecha_entrega = _fecha_entrega,
            comentarios = _comentarios,
            responsable = _responsable,
            tags = _tags
            WHERE id = _id;
            END IF;
            
            SELECT _id AS id;
        	
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `estatus` int(11) NOT NULL,
  `fecha_entrega` date NOT NULL,
  `comentarios` varchar(250) NOT NULL,
  `responsable` varchar(50) NOT NULL,
  `tags` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `titulo`, `descripcion`, `estatus`, `fecha_entrega`, `comentarios`, `responsable`, `tags`) VALUES
(10, 'Crear vistas de usuario 2 ', 'Crearasdasd', 90, '2022-06-08', 'asdsdasddddddddfa', 'Pablo', 'ok'),
(7, 'Crear vistas de usuario', 'Crear', 100, '2022-06-08', 'asdsdasddddddddfa', 'Johans', 'ok'),
(5, 'Preparar Servidor', 'Crear server express', 50, '2022-06-08', 'asdfa', 'johan', 'ok'),
(8, 'Crear vistas de usuario', 'Crear', 50, '2022-06-08', 'asdsdasddddddddfa', 'Pablo', 'ok'),
(9, 'Crear vistas bjs', 'asda', 100, '2022-08-08', 'asdsdasddddddddfa', 'Johan', 'ok');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(12) NOT NULL,
  `pass` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `pass`) VALUES
(1, 'Johan', '$2a$08$UNWbJiokWfoD.XTrXdFJHulnXy7eFQqVokWYuLQlqyP9AKTWY7gai'),
(2, 'pablo', '$2a$08$NU7nC0jVpAyqQYQz9Sn4duFEoMYK4XyKQtNPkt9oeGUJGR6h1mLoW'),
(3, 'hola', '$2a$08$7C1ry6wi6dwnQ6Qi1heZsOasrO3LDqyUVgnhhUJ1kCFCwWacM89j2'),
(4, 'admin', '$2a$08$XhM9imTJjWQuJBTdvnKlUOoCGVEnuey2jrCa8DyX9evsC.I8ci7YC');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
