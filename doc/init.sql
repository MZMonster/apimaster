/*
 Navicat MySQL Data Transfer

 Source Server         : docker-local
 Source Server Version : 50630
 Source Host           : 192.168.99.100
 Source Database       : mcare-server

 Target Server Version : 50630
 File Encoding         : utf-8

 Date: 07/11/2016 17:59:57 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `uuid` varchar(36) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `isActiveEmail` tinyint(1) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `isSuper` tinyint(1) DEFAULT NULL,
  `sites` longtext,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `component`
-- ----------------------------
DROP TABLE IF EXISTS `component`;
CREATE TABLE `component` (
  `uuid` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `cover` varchar(300) DEFAULT NULL,
  `url` varchar(300) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `publish` tinyint(1) DEFAULT NULL,
  `canDelete` tinyint(1) DEFAULT NULL,
  `expire` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `images` longtext,
  `data` longtext,
  `proxy` varchar(300) DEFAULT NULL,
  `createBy` int(11) unsigned DEFAULT NULL,
  `site` int(11) unsigned DEFAULT NULL,
  `container` int(11) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
    UNIQUE KEY `site-domain` (`site`,`domain`),
    CONSTRAINT `fk_component_createBy` FOREIGN KEY (`createBy`) REFERENCES `admin` (`id`),
    CONSTRAINT `fk_component_site` FOREIGN KEY (`site`) REFERENCES `site` (`id`),
    CONSTRAINT `fk_component_container` FOREIGN KEY (`container`) REFERENCES `container` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `container`
-- ----------------------------
DROP TABLE IF EXISTS `container`;
CREATE TABLE `container` (
  `uuid` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `cover` varchar(300) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `publish` tinyint(1) DEFAULT NULL,
  `expire` int(11) DEFAULT NULL,
  `createBy` int(11) unsigned DEFAULT NULL,
  `site` int(11) unsigned DEFAULT NULL,
  `ship` int(11) unsigned DEFAULT NULL,
  `canDelete` tinyint(1) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `site-domain` (`site`,`domain`),
    CONSTRAINT `fk_container_createBy` FOREIGN KEY (`createBy`) REFERENCES `admin` (`id`),
    CONSTRAINT `fk_container_site` FOREIGN KEY (`site`) REFERENCES `site` (`id`),
    CONSTRAINT `fk_container_ship` FOREIGN KEY (`ship`) REFERENCES `ship` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `ship`
-- ----------------------------
DROP TABLE IF EXISTS `ship`;
CREATE TABLE `ship` (
  `uuid` varchar(255) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `publish` tinyint(1) DEFAULT NULL,
  `expire` int(11) DEFAULT NULL,
  `createBy` int(11) unsigned DEFAULT NULL,
  `canDelete` tinyint(1) DEFAULT NULL,
  `site` int(11) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `site-ship` (`site`,`domain`),
  CONSTRAINT `fk_ship_createBy` FOREIGN KEY (`createBy`) REFERENCES `admin` (`id`),
  CONSTRAINT `fk_ship_site` FOREIGN KEY (`site`) REFERENCES `site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `site`
-- ----------------------------
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
  `createBy` int(11) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `domain` (`domain`),
  CONSTRAINT `fk_site_createBy` FOREIGN KEY (`createBy`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB;

ALTER TABLE `component` ADD INDEX `domain` USING BTREE (domain);
ALTER TABLE `container` ADD INDEX `domain` USING BTREE (domain);
ALTER TABLE `ship` ADD INDEX `domain` USING BTREE (domain);

SET FOREIGN_KEY_CHECKS = 1;
