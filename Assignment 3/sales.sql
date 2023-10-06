-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 04, 2023 at 11:03 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sales`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(4) NOT NULL AUTO_INCREMENT,
  `productname` varchar(255) DEFAULT NULL,
  `productprice` float DEFAULT NULL,
  `productquantity` int(11) DEFAULT NULL,
  `productdescription` text,
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `productname`, `productprice`, `productquantity`, `productdescription`) VALUES
(1, 'paste', 2778, 89, 'jjsjsjjsjs'),
(2, 'mango', 2778, 89, 'akakaka'),
(3, 'paint', 22, 22, 'hshhshshshs'),
(4, 'cereal', 2, 22, 'hshsshsh'),
(5, 'snacks', 123, 13, 'sjsjss'),
(6, 'spoons', 2778, 89, 'jjsjsjsjs'),
(7, 'plates', 2778, 89, 'hshshhshs'),
(8, 'cups', 1991, 1919, 'hheejejeje'),
(9, 'pots', 2778, 89, 'hshhshs'),
(10, 'boots', 33, 33, 'hhddjd'),
(11, 'boxes', 13, 12, 'dddd'),
(12, 'tape', 777, 888, 'hhhhjhj');

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
CREATE TABLE IF NOT EXISTS `sale` (
  `sale_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`sale_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`sale_id`, `product_id`, `product_quantity`, `total_price`) VALUES
(1, 1, 1, '500.00'),
(2, 2, 2, '500.00'),
(3, 3, 3, '444.00'),
(4, 5, 5, '555.00'),
(6, 6, 64, '55.00'),
(7, 44, 44, '333.00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
