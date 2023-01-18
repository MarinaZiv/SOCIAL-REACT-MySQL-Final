-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: social
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `commentamount`
--

DROP TABLE IF EXISTS `commentamount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentamount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `commentNumId_idx` (`postId`),
  CONSTRAINT `commentNumId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentamount`
--

LOCK TABLES `commentamount` WRITE;
/*!40000 ALTER TABLE `commentamount` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentamount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(2500) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `commentUserId_idx` (`userId`),
  KEY `postId_idx` (`postId`),
  CONSTRAINT `commentUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Manually inserted comment','2022-12-01 13:47:38',1,4),(3,'Manually inserted comment-3',NULL,1,4),(45,'00.34','2022-12-03 00:34:10',1,4),(49,'comment','2022-12-12 01:46:14',3,24),(50,'comment','2022-12-12 01:47:29',1,9),(51,'comment','2022-12-12 01:51:09',4,10),(52,'comment','2022-12-12 01:51:35',4,24),(53,'comment','2022-12-12 01:52:58',3,10),(54,'comment','2022-12-12 01:53:49',3,25);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `likeUserId_idx` (`userId`),
  KEY `likePostId_idx` (`postId`),
  CONSTRAINT `likePostId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likeUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (369,2,23),(371,1,4),(373,1,24),(374,1,25),(375,4,23),(376,4,24),(377,4,9),(378,4,4),(379,3,23),(380,3,10),(382,3,24),(383,3,25);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(2500) DEFAULT NULL,
  `img` varchar(600) DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,'You may not be her first, her last, or her only. She loved before she may love again. But if she loves you now, what else matters? She\'s not perfect—you aren\'t either, and the two of you may never be perfect together but if she can make you laugh, cause you to think twice, and admit to being human and making mistakes, hold onto her and give her the most you can. She may not be thinking about you every second of the day, but she will give you a part of her that she knows you can break—her heart. So don\'t hurt her, don\'t change her, don\'t analyze and don\'t expect more than she can give. Smile when she makes you happy, let her know when she makes you mad, and miss her when she\'s not there.','',3,'2022-12-01 12:40:49'),(9,'Some people feel the rain. Others just get wet.','1670582686230gettyimages-74700287-612x612.jpg',3,'2022-12-09 12:44:46'),(10,'Ultralight flight is a small aircraft, designed to provide short-haul aerial experiences for a single person or two people.','',1,'2022-12-09 13:00:41'),(23,'The moon is Earth\'s most constant companion and the easiest celestial object to find in the night sky. The rhythm of the phases of the moon has guided humanity for millennia; for instance, calendar months are roughly equal to the time it takes to go from one full moon to the next. But the moon\'s orbit and phases can seem mysterious. for example, the moon always shows us the same face, but it\'s always changing size as how much of it we see depends on the moon\'s position in relation to Earth and the sun.','https://res.cloudinary.com/dvfl7coan/image/upload/v1670802010/mtznwy0cattkro2efuoh.jpg',1,'2022-12-12 01:40:10'),(24,'Perfect!','https://res.cloudinary.com/dvfl7coan/image/upload/v1670802188/ja1sqeiz0vmcggncqt1t.jpg',2,'2022-12-12 01:43:09'),(25,'In recent years, scientists have uncovered a lot of new information about shark physiology, but the day-to-day life of sharks remains fairly mysterious. Most shark species are very difficult to study because they travel quickly over long distances, sometimes deep in the sea. They live in a world that is largely inaccessible to humans. We do know that sharks are solitary animals, for the most part. They typically live and hunt by themselves, joining up with other sharks only in certain circumstances, such as mating. Some sharks will form schools on occasion, however. Researchers aren\'t really sure why this occurs because sharks don\'t really need protection from predators and they don\'t feed in schools. At this point, it\'s still unclear why sharks behave this way. In any case, the occurrence is very rare. Most of the time, sharks swim alone.','https://res.cloudinary.com/dvfl7coan/image/upload/v1670802298/qtzwqiv98cdpgyelebdy.webp',4,'2022-12-12 01:44:59');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationships`
--

DROP TABLE IF EXISTS `relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerUserId` int NOT NULL,
  `followedUserId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `followerUser_idx` (`followerUserId`),
  KEY `followedUser_idx` (`followedUserId`),
  CONSTRAINT `followedUser` FOREIGN KEY (`followedUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followerUser` FOREIGN KEY (`followerUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationships`
--

LOCK TABLES `relationships` WRITE;
/*!40000 ALTER TABLE `relationships` DISABLE KEYS */;
INSERT INTO `relationships` VALUES (9,3,2),(10,2,1),(12,1,4),(14,1,3);
/*!40000 ALTER TABLE `relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(600) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `storyUserId_idx` (`userId`),
  CONSTRAINT `storyUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(600) NOT NULL,
  `name` varchar(200) NOT NULL,
  `coverPic` varchar(600) DEFAULT NULL,
  `profilePic` varchar(600) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'marinaziv','ziv@ziv.com','$2b$10$zQUKv.dYiVH8J.CiLyBPzOGQjDSHRRjc/pSfZB95LCjaO3QwqV3Dm','Marina Ziv','https://res.cloudinary.com/dvfl7coan/image/upload/v1670800929/i51jrqsecuonq9zc3tre.webp','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMT6tJEGTW-oLom5-jn5oB8Zvr2LPI4t7Lg&usqp=CAU','Tel-Aviv','https://github.com/MarinaZiv'),(2,'jack','j@j.com','$2b$10$f3aYA0kgKf6BD2/pV3Ja5OBIGiio9V0W1ntCGhoOSXVTTgJyOrhpS','Jack Nicholson','https://timelinecovers.pro/facebook-cover/download/the-shining-jack-nicholson-facebook-cover.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYiikbyUqYPvSBILICPFoYgMpIVdE5RGfZA&usqp=CAU','NY','https://jack.com'),(3,'bob','b@b.com','$2b$10$U.v7EpwUhZhwI8p7bkMcEOPXBYkddPOMBj6Oe/N8KlpnEvgDTxG9e','Bob Marley','https://musicindustryhowtoimages.s3.amazonaws.com/wp-content/uploads/2021/12/08012030/Best-Reggae-Songs-of-All-Time.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRmuJjFSgC6yiuLl-n37wQS2HE19WFb20YyQ&usqp=CAU','Brookline','https://bob.com'),(4,'jeff','jeff@jeff.com','$2b$10$9h7LL6B6/FZA75IP7EFrmeuCUv2HiTraYVdInF9R7jrbehjEFXdDm','Jeff Bridges','https://cdn2.civitatis.com/estados-unidos/los-angeles/guia/cartel-hollywood.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK0cp6fyIxUx3pHnHRmsZi4iG3A9u46zy1GA&usqp=CAU','AL','https://jeff.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-12  2:00:39
