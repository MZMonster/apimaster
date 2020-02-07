
# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 121.196.203.34 (MySQL 5.6.37)
# Database: apimaster2
# Generation Time: 2018-01-31 06:58:17 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table actionLog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `actionLog`;

CREATE TABLE `actionLog` (
  `model` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `data` longtext,
  `before` longtext,
  `after` longtext,
  `admin` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `actionLog` WRITE;
/*!40000 ALTER TABLE `actionLog` DISABLE KEYS */;

/*!40000 ALTER TABLE `actionLog` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `uuid` varchar(36) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `isSuper` tinyint(1) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`uuid`, `username`, `avatar`, `tel`, `email`, `status`, `isSuper`, `id`, `createdAt`, `updatedAt`)
VALUES
	('1','lx',NULL,NULL,'shanelau1021@gmail.com',1,1,1,NULL,NULL),
	('2','Vivi Zhang',NULL,NULL,'vivizhang@cryptape.com',0,NULL,2,NULL,NULL),
	('d83bf5b5-41bd-459c-8adb-fd6d469b3929','杨光耀',NULL,NULL,'yao@cryptape.com',0,0,5,'2017-07-28 18:09:18','2017-07-28 18:09:18'),
	('e6b6bb9b-d9f2-4d3e-94c4-04bae7aaeb08','潘婷婷',NULL,NULL,'ptting@cryptape.com',0,0,38,'2017-09-04 11:36:09','2017-09-04 11:36:09'),
	('da76c7bf-b139-44c8-8ea0-ddad282aac40','少平',NULL,NULL,'1243365509@qq.com',1,1,39,'2017-10-09 13:56:26','2017-10-09 13:56:26'),
	('f53a5a60-ad02-45c4-9630-6330ec2020cd','陈宇',NULL,NULL,'chenyu@cryptape.com',0,0,40,'2017-10-09 14:12:51','2017-10-09 14:12:51'),
	('15fe9430-745b-4e72-996e-4008b43db7cb','terry',NULL,NULL,'terry@cryptape.com',0,0,41,'2017-10-14 16:17:49','2017-10-14 16:17:49'),
	('af709875-eb20-478b-a07a-6effbb264758','刘兴',NULL,NULL,'shanelau1022@gmail.com',0,0,42,'2018-01-02 16:26:02','2018-01-02 16:26:02');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin_sites__site_admins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_sites__site_admins`;

CREATE TABLE `admin_sites__site_admins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_sites` int(11) DEFAULT NULL,
  `site_admins` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `admin_sites__site_admins` WRITE;
/*!40000 ALTER TABLE `admin_sites__site_admins` DISABLE KEYS */;

INSERT INTO `admin_sites__site_admins` (`id`, `admin_sites`, `site_admins`)
VALUES
	(37,1,34),
	(38,39,34),
	(39,40,34),
	(40,41,34),
	(41,42,34),
	(42,1,34);

/*!40000 ALTER TABLE `admin_sites__site_admins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table component
# ------------------------------------------------------------

DROP TABLE IF EXISTS `component`;

CREATE TABLE `component` (
  `uuid` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `cover` varchar(300) DEFAULT NULL,
  `url` varchar(300) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `publish` tinyint(1) DEFAULT NULL,
  `canDelete` tinyint(1) DEFAULT NULL,
  `expire` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `images` longtext,
  `data` longtext,
  `proxy` varchar(300) DEFAULT NULL,
  `createBy` int(11) DEFAULT NULL,
  `site` int(11) DEFAULT NULL,
  `container` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `component` WRITE;
/*!40000 ALTER TABLE `component` DISABLE KEYS */;

/*!40000 ALTER TABLE `component` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table container
# ------------------------------------------------------------

DROP TABLE IF EXISTS `container`;

CREATE TABLE `container` (
  `uuid` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `cover` varchar(300) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `publish` tinyint(1) DEFAULT NULL,
  `expire` int(11) DEFAULT NULL,
  `createBy` int(11) DEFAULT NULL,
  `site` int(11) DEFAULT NULL,
  `ship` int(11) DEFAULT NULL,
  `canDelete` tinyint(1) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `container` WRITE;
/*!40000 ALTER TABLE `container` DISABLE KEYS */;

INSERT INTO `container` (`uuid`, `title`, `domain`, `cover`, `description`, `publish`, `expire`, `createBy`, `site`, `ship`, `canDelete`, `id`, `createdAt`, `updatedAt`)
VALUES
	('9d09f6fe-449f-4136-89b6-c39c52dcc984','官方新闻','office-news',NULL,NULL,0,0,1,1,1,0,1,'2017-07-28 17:59:29','2017-07-28 18:08:36'),
	('8107edc0-d123-4511-b977-8774176c6839','媒体新闻','media-news',NULL,NULL,0,0,1,1,1,0,2,'2017-07-28 17:59:41','2017-07-28 18:08:29'),
	('f0ad670f-cf55-46ff-8155-f0239e290d1e','团队-中文','team-cn',NULL,NULL,0,0,1,1,3,0,3,'2017-08-02 18:40:35','2017-08-02 18:40:35'),
	('f48c22d7-392d-438c-9aa2-a280763a0247','团队-英文','team-en',NULL,NULL,0,0,1,1,3,0,4,'2017-08-02 18:41:25','2017-08-02 18:41:25'),
	('433a8ea8-ed4c-4097-bcf7-8e424530e3af','咨询中文','advisor-ch',NULL,NULL,0,0,1,1,3,0,5,'2017-08-02 18:42:47','2017-08-02 18:42:47'),
	('f8594e22-8caa-44b2-a21e-2454d51ebaa9','咨询英文','advisor-en',NULL,NULL,0,0,1,1,3,0,6,'2017-08-02 18:42:59','2017-08-02 18:42:59'),
	('df1c58b1-a22f-40c6-a6b6-11b41620988c',NULL,'notice',NULL,NULL,1,0,1,34,37,0,39,'2017-10-09 10:18:52','2018-01-31 14:55:02'),
	('bc0b2ff2-698e-4ab8-b15d-9f51d8de7b4b','测试板块','test',NULL,NULL,1,0,1,34,37,1,40,'2018-01-31 14:55:44','2018-01-31 14:55:44');

/*!40000 ALTER TABLE `container` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ship
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ship`;

CREATE TABLE `ship` (
  `uuid` varchar(255) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `publish` tinyint(1) DEFAULT NULL,
  `expire` int(11) DEFAULT NULL,
  `createBy` int(11) DEFAULT NULL,
  `canDelete` tinyint(1) DEFAULT NULL,
  `site` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ship` WRITE;
/*!40000 ALTER TABLE `ship` DISABLE KEYS */;

INSERT INTO `ship` (`uuid`, `domain`, `title`, `description`, `publish`, `expire`, `createBy`, `canDelete`, `site`, `id`, `createdAt`, `updatedAt`)
VALUES
	('43cf5766-7575-4d99-9e94-2b3650a49e78','news','新闻',NULL,0,0,1,0,1,1,'2017-07-28 17:59:08','2017-07-28 17:59:08'),
	('c669bc70-40f4-4c08-8c71-94d5a1e30704','team-en','团队介绍',NULL,0,0,1,0,1,3,'2017-08-02 18:38:57','2017-08-02 18:38:57'),
	('3966c2a5-01bb-4998-a3cf-cd04f81f27a8','eth',NULL,NULL,0,0,1,0,34,36,'2017-09-11 11:02:07','2017-09-11 11:02:07'),
	('75974d22-c938-4da7-8865-baee7183d116','eth-notice',' 矿池的公告',NULL,1,0,1,0,34,37,'2017-10-09 10:14:47','2018-01-31 14:55:28');

/*!40000 ALTER TABLE `ship` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table site
# ------------------------------------------------------------

DROP TABLE IF EXISTS `site`;

CREATE TABLE `site` (
  `uuid` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `cover` varchar(300) DEFAULT NULL,
  `images` longtext,
  `description` varchar(300) DEFAULT NULL,
  `publish` tinyint(1) DEFAULT NULL,
  `expire` int(11) DEFAULT NULL,
  `data` longtext,
  `createBy` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `domain` (`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `site` WRITE;
/*!40000 ALTER TABLE `site` DISABLE KEYS */;

INSERT INTO `site` (`uuid`, `title`, `domain`, `cover`, `images`, `description`, `publish`, `expire`, `data`, `createBy`, `id`, `createdAt`, `updatedAt`)
VALUES
	('b4f7e280-a24f-46b7-90b9-119f7e28c004','eth-notice','eth-pool',NULL,NULL,' 星火矿池',0,0,NULL,1,34,'2017-09-11 11:01:34','2018-01-02 16:26:22');

/*!40000 ALTER TABLE `site` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
