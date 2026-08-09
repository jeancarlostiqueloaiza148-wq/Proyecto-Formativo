-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto oviadso
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `births`
--

DROP TABLE IF EXISTS `births`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `births` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `ovine_id` varchar(10) NOT NULL,
  `mother_id` varchar(10) NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `status` varchar(40) NOT NULL,
  `postJob` varchar(70) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `notes` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `births`
--

LOCK TABLES `births` WRITE;
/*!40000 ALTER TABLE `births` DISABLE KEYS */;
INSERT INTO `births` VALUES (1,'2026-07-16','3','1',4,'Saludable','Se realizó revisión veterinaria',1,'El cordero nació sin complicaciones y permanece con la madre.','2026-07-18 01:35:20','2026-07-18 01:38:29'),(2,'2026-07-19','2','5',4,'Saludable','Se realizó limpieza y revisión veterinaria',1,'Nacimiento sin complicaciones','2026-07-20 00:26:56','2026-07-20 00:33:02');
/*!40000 ALTER TABLE `births` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `mother_id` int NOT NULL,
  `number_of_offspring` int NOT NULL,
  `type_of_birth` varchar(50) NOT NULL,
  `complications` varchar(50) NOT NULL,
  `postJob` varchar(70) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `notes` varchar(50) NOT NULL,
  `status` varchar(70) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveries`
--

LOCK TABLES `deliveries` WRITE;
/*!40000 ALTER TABLE `deliveries` DISABLE KEYS */;
INSERT INTO `deliveries` VALUES (1,'2026-07-19',1,2,'Simple','Ninguna','Se realizó limpieza y revisión veterinaria de la oveja y las crías.',1,'Parto exitoso sin complicaciones.','Exitoso','2026-07-15 18:55:53','2026-07-20 00:48:37'),(2,'2026-07-19',1,2,'Simple','Ninguna','Se realizó limpieza y revisión veterinaria de la oveja y las crías.',1,'Parto exitoso sin complicaciones.','Exitoso','2026-07-20 00:47:37','2026-07-20 00:47:37'),(3,'2026-07-19',1,2,'Simple','Ninguna','Se realizó limpieza y revisión veterinaria de la oveja y las crías.',1,'Parto exitoso sin complicaciones.','Exitoso','2026-07-21 19:30:30','2026-07-21 19:30:30'),(4,'2026-07-19',1,2,'Simple','Ninguna','Se realizó limpieza y revisión veterinaria de la oveja y las crías.',1,'Parto exitoso sin complicaciones.','Exitoso','2026-07-29 00:07:21','2026-07-29 00:07:21');
/*!40000 ALTER TABLE `deliveries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedings`
--

DROP TABLE IF EXISTS `feedings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `ovine_id` varchar(10) NOT NULL,
  `food_type` varchar(20) NOT NULL,
  `quantity` decimal(10,0) NOT NULL,
  `postJob` varchar(50) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `notes` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedings`
--

LOCK TABLES `feedings` WRITE;
/*!40000 ALTER TABLE `feedings` DISABLE KEYS */;
INSERT INTO `feedings` VALUES (1,'2026-07-16','3','Pasto de corte',5,'Se verificó el consumo completo del alimento',1,'El ovino se alimentó normalmente y no presentó inconvenientes.','2026-07-17 23:30:48','2026-07-17 23:31:39'),(2,'2026-07-16','3','Pasto de corte',5,'Se verificó el consumo completo del alimento',1,'El ovino se alimentó normalmente y no presentó inconvenientes.','2026-07-17 23:31:46','2026-07-17 23:31:46'),(3,'2026-07-16','3','Pasto de corte',5,'Se verificó el consumo completo del alimento',1,'El ovino se alimentó normalmente y no presentó inconvenientes.','2026-07-17 23:32:09','2026-07-17 23:32:09'),(4,'2026-07-16','3','Pasto de corte',5,'Se verificó el consumo completo del alimento',1,'El ovino se alimentó normalmente y no presentó inconvenientes.','2026-07-18 01:11:07','2026-07-18 01:11:22'),(5,'2026-07-19','8','Pasto de corte',5,'Se verificó el consumo completo del alimento',1,'El ovino se alimentó normalmente y no presentó inconvenientes.','2026-07-20 00:57:43','2026-07-20 01:01:34'),(6,'2026-07-19','8','Pasto de corte',5,'Se verificó el consumo completo del alimento',1,'El ovino se alimentó normalmente y no presentó inconvenientes.','2026-07-20 01:01:39','2026-07-20 01:01:39');
/*!40000 ALTER TABLE `feedings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `healths`
--

DROP TABLE IF EXISTS `healths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `healths` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `ovine_id` varchar(15) NOT NULL,
  `diagnosis` varchar(30) NOT NULL,
  `treatment` varchar(30) NOT NULL,
  `postJob` varchar(50) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `observations` varchar(80) NOT NULL,
  `vaccine_id` int NOT NULL,
  `vaccine_name` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `healths`
--

LOCK TABLES `healths` WRITE;
/*!40000 ALTER TABLE `healths` DISABLE KEYS */;
INSERT INTO `healths` VALUES (1,'2026-07-19','1','Clostridiosis','Antibióticos y vitaminas','Se dejó el animal en observación durante 7 días.',1,'El ovino presentó tos, secreción nasal y mejoró después del tratamiento.',1,'Clostridiosis','2026-07-17 22:37:15','2026-07-20 01:06:03'),(2,'2026-07-16','2','Enfermedad respiratoria','Antibióticos y vitaminas','Se dejó el animal en observación durante 7 días',1,'El ovino presentó tos, secreción nasal y mejoró después del tratamiento.',1,'Clostridiosis','2026-07-17 22:44:55','2026-07-17 23:07:34'),(3,'2026-07-16','3','Enfermedad respiratoria','Antibióticos y vitaminas','Se dejó el animal en observación durante 7 días',1,'El ovino presentó tos, secreción nasal y mejoró después del tratamiento.',1,'Clostridiosis','2026-07-17 23:08:38','2026-07-17 23:09:14'),(4,'2026-07-19','1','Clostridiosis','Antibióticos y vitaminas','Se dejó el animal en observación durante 7 días.',1,'El ovino presentó tos, secreción nasal y mejoró después del tratamiento.',1,'Clostridiosis','2026-07-20 01:05:18','2026-07-20 01:05:18'),(5,'2026-07-19','1','Clostridiosis','Antibióticos y vitaminas','Se dejó el animal en observación durante 7 días.',1,'El ovino presentó tos, secreción nasal y mejoró después del tratamiento.',1,'Clostridiosis','2026-07-20 01:05:27','2026-07-20 01:05:27');
/*!40000 ALTER TABLE `healths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mortalities`
--

DROP TABLE IF EXISTS `mortalities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mortalities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `ovine_id` int NOT NULL,
  `cause` varchar(50) NOT NULL,
  `postJob` varchar(70) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `description` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mortalities`
--

LOCK TABLES `mortalities` WRITE;
/*!40000 ALTER TABLE `mortalities` DISABLE KEYS */;
INSERT INTO `mortalities` VALUES (1,'2026-07-16',1,'Enfermedad respiratoria','Se realizó disposición del cadáver',1,'El ovino presentó complicaciones respiratorias y falleció.','2026-07-16 22:42:46','2026-07-16 22:47:35'),(2,'2026-07-19',2,'Enfermedad respiratoria','Se realizó disposición del cadáver según el protocolo sanitario.',1,'El ovino presentó complicaciones respiratorias y falleció después del tratamiento.','2026-07-20 01:12:13','2026-07-20 01:13:49');
/*!40000 ALTER TABLE `mortalities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mountings`
--

DROP TABLE IF EXISTS `mountings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mountings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_of_mounting` varchar(50) NOT NULL,
  `result_mounting` varchar(50) NOT NULL,
  `breeding_male` varchar(50) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mountings`
--

LOCK TABLES `mountings` WRITE;
/*!40000 ALTER TABLE `mountings` DISABLE KEYS */;
INSERT INTO `mountings` VALUES (1,'Monta Natural','Exitoso','Semental Dorper OV-089',1,'2026-07-16 02:21:20','2026-07-16 22:07:48'),(2,'Monta Natural','Exitoso','Semental Dorper OV-090',1,'2026-07-20 01:15:52','2026-07-20 01:16:34'),(3,'Monta Natural','Exitoso','Semental Dorper OV-090',1,'2026-07-20 01:17:19','2026-07-20 01:17:48');
/*!40000 ALTER TABLE `mountings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ovines`
--

DROP TABLE IF EXISTS `ovines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ovines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `breed` varchar(50) NOT NULL,
  `sex` varchar(50) NOT NULL,
  `birth_date` date NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `status` varchar(50) NOT NULL,
  `active` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ovines`
--

LOCK TABLES `ovines` WRITE;
/*!40000 ALTER TABLE `ovines` DISABLE KEYS */;
INSERT INTO `ovines` VALUES (1,'Luna','OV-001','Pelibuey','H','2025-03-10',36,'Saludable',1,'2026-07-16 00:13:53','2026-07-16 00:14:57'),(2,'Estrella','OV-002','Dorper','Hembra','2025-04-12',38,'Saludable',1,'2026-07-20 01:19:52','2026-07-20 01:20:51');
/*!40000 ALTER TABLE `ovines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsibles`
--

DROP TABLE IF EXISTS `responsibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsibles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `document` varchar(50) NOT NULL,
  `postJob` varchar(50) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `phone` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsibles`
--

LOCK TABLES `responsibles` WRITE;
/*!40000 ALTER TABLE `responsibles` DISABLE KEYS */;
INSERT INTO `responsibles` VALUES (1,'Sofia','Cardenas','1023456789','Instructora',1,'3101234567','sofia.cardenas.nuevo@gmail.com','2026-07-15 21:40:47','2026-07-15 21:40:47'),(2,'Carlos','Ramírez','1023456789','Veterinario',1,'3204567890','carlos.ramirez@gmail.com','2026-07-15 21:42:00','2026-07-20 01:24:43'),(3,'Carlos','Ramírez','1023456789','Veterinario',1,'3204567890','carlos.ramirez@gmail.com','2026-07-20 01:22:56','2026-07-20 01:22:56');
/*!40000 ALTER TABLE `responsibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `postJob` varchar(50) NOT NULL,
  `verifyEmail` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `status` tinyint NOT NULL DEFAULT '0',
  `documentId` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jean','jeancarlostiqueloaiza148@gmail.com','123456','Administrador','Ingeniero',0,1,1,'123456789','2026-08-01 18:04:32','2026-08-01 18:04:32'),(2,'Jean','jeancarlostiqueloaiza148@gmail.com','123456','Administrador','Ingeniero',0,1,1,'123456789','2026-08-02 13:55:39','2026-08-02 13:55:39'),(3,'Jean','jeancarlostiqueloaiza148@gmail.com','123456','Administrador','Ingeniero',0,1,1,'123456789','2026-08-03 03:12:44','2026-08-03 03:12:44'),(4,'Jean','jeancarlostiqueloaiza148@gmail.com','123456','Administrador','Ingeniero',0,1,1,'123456789','2026-08-03 12:25:36','2026-08-03 12:25:36'),(5,'Jean','jeancarlostiqueloaiza148@gmail.com','123456','Administrador','Ingeniero',0,1,1,'123456789','2026-08-03 16:10:13','2026-08-03 16:10:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weights`
--

DROP TABLE IF EXISTS `weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `id_ovine` int NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `notes` varchar(50) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weights`
--

LOCK TABLES `weights` WRITE;
/*!40000 ALTER TABLE `weights` DISABLE KEYS */;
INSERT INTO `weights` VALUES (1,'2026-07-15',2,43,'Pesaje rutinario, animal en óptimas condiciones',1,'2026-07-15 23:25:55','2026-07-15 23:27:22'),(2,'2026-07-19',10,39,'Pesaje rutinario, buen estado corporal.',1,'2026-07-20 01:29:35','2026-07-21 19:24:16'),(3,'2026-07-19',1,39,'Pesaje rutinario, buen estado corporal.',1,'2026-07-21 19:23:13','2026-07-21 19:23:13');
/*!40000 ALTER TABLE `weights` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-09 13:12:37
