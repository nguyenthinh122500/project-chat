/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `ChannelMembers` (
  `ChannelID` int NOT NULL,
  `MemberID` int NOT NULL,
  PRIMARY KEY (`ChannelID`,`MemberID`),
  KEY `MemberID` (`MemberID`),
  CONSTRAINT `ChannelMembers_ibfk_1` FOREIGN KEY (`ChannelID`) REFERENCES `Channels` (`ChannelID`),
  CONSTRAINT `ChannelMembers_ibfk_2` FOREIGN KEY (`MemberID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Channels` (
  `ChannelID` int NOT NULL AUTO_INCREMENT,
  `ChannelName` varchar(100) NOT NULL,
  `CreatorID` int NOT NULL,
  PRIMARY KEY (`ChannelID`),
  KEY `CreatorID` (`CreatorID`),
  CONSTRAINT `Channels_ibfk_1` FOREIGN KEY (`CreatorID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChatGroups` (
  `GroupID` int NOT NULL AUTO_INCREMENT,
  `GroupName` varchar(100) NOT NULL,
  `CreatorID` int NOT NULL,
  PRIMARY KEY (`GroupID`),
  KEY `CreatorID` (`CreatorID`),
  CONSTRAINT `ChatGroups_ibfk_1` FOREIGN KEY (`CreatorID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `GroupMembers` (
  `GroupID` int NOT NULL,
  `MemberID` int NOT NULL,
  PRIMARY KEY (`GroupID`,`MemberID`),
  KEY `MemberID` (`MemberID`),
  CONSTRAINT `GroupMembers_ibfk_1` FOREIGN KEY (`GroupID`) REFERENCES `ChatGroups` (`GroupID`),
  CONSTRAINT `GroupMembers_ibfk_2` FOREIGN KEY (`MemberID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PrivateMessages` (
  `MessageID` int NOT NULL AUTO_INCREMENT,
  `SenderID` int NOT NULL,
  `ReceiverID` int NOT NULL,
  `MessageType` varchar(20) NOT NULL,
  `Content` text,
  `SentTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MessageID`),
  KEY `SenderID` (`SenderID`),
  KEY `ReceiverID` (`ReceiverID`),
  CONSTRAINT `PrivateMessages_ibfk_1` FOREIGN KEY (`SenderID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `PrivateMessages_ibfk_2` FOREIGN KEY (`ReceiverID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `PrivateMessages_chk_1` CHECK ((`MessageType` in (_utf8mb4'text',_utf8mb4'image',_utf8mb4'video')))
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `AccountStatus` varchar(20) DEFAULT NULL,
  `Balance` float DEFAULT NULL,
  `Image` text,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `ChannelMembers` (`ChannelID`, `MemberID`) VALUES
(2, 1);
INSERT INTO `ChannelMembers` (`ChannelID`, `MemberID`) VALUES
(1, 2);
INSERT INTO `ChannelMembers` (`ChannelID`, `MemberID`) VALUES
(3, 3);

INSERT INTO `Channels` (`ChannelID`, `ChannelName`, `CreatorID`) VALUES
(1, 'Channel X', 3);
INSERT INTO `Channels` (`ChannelID`, `ChannelName`, `CreatorID`) VALUES
(2, 'Channel Y', 1);
INSERT INTO `Channels` (`ChannelID`, `ChannelName`, `CreatorID`) VALUES
(3, 'Channel Z', 2);

INSERT INTO `ChatGroups` (`GroupID`, `GroupName`, `CreatorID`) VALUES
(1, 'Group A', 1);
INSERT INTO `ChatGroups` (`GroupID`, `GroupName`, `CreatorID`) VALUES
(2, 'Group B', 2);
INSERT INTO `ChatGroups` (`GroupID`, `GroupName`, `CreatorID`) VALUES
(3, 'Group C', 3);



INSERT INTO `PrivateMessages` (`MessageID`, `SenderID`, `ReceiverID`, `MessageType`, `Content`, `SentTime`) VALUES
(48, 1, 2, 'text', 'chảo user2', '2023-12-12 08:08:17');
INSERT INTO `PrivateMessages` (`MessageID`, `SenderID`, `ReceiverID`, `MessageType`, `Content`, `SentTime`) VALUES
(49, 1, 3, 'text', 'chào user3', '2023-12-12 08:11:22');
INSERT INTO `PrivateMessages` (`MessageID`, `SenderID`, `ReceiverID`, `MessageType`, `Content`, `SentTime`) VALUES
(50, 1, 3, 'text', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/hinh-anh-do-an.jpg?alt=media&token=162343f6-6460-4974-a158-01c4f3c942fb', '2023-12-12 08:11:30');
INSERT INTO `PrivateMessages` (`MessageID`, `SenderID`, `ReceiverID`, `MessageType`, `Content`, `SentTime`) VALUES
(51, 1, 2, 'text', 'avc', '2023-12-12 08:28:40'),
(52, 2, 1, 'text', 'hey oyu', '2023-12-12 08:51:20'),
(53, 1, 2, 'text', 'hrlo', '2023-12-12 08:51:52'),
(54, 2, 1, 'text', 'ht', '2023-12-12 08:51:56'),
(55, 1, 2, 'text', 'ere', '2023-12-12 08:51:59'),
(56, 1, 2, 'text', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/hinh-anh-do-an.jpg?alt=media&token=40ba0ac9-376a-46f5-bb1f-34dc2d293f94', '2023-12-12 08:52:08'),
(57, 2, 1, 'text', 'fsdfd', '2023-12-12 09:04:01'),
(58, 1, 2, 'text', 'iuy', '2023-12-12 09:20:13');

INSERT INTO `Users` (`UserID`, `Username`, `Email`, `Password`, `AccountStatus`, `Balance`, `Image`) VALUES
(1, 'user1', 'npt@gmail.com', '1234', 'active', 100, 'https://picsum.photos/200');
INSERT INTO `Users` (`UserID`, `Username`, `Email`, `Password`, `AccountStatus`, `Balance`, `Image`) VALUES
(2, 'user2', 'npt1@gmail.com', '1234', 'active', 300, 'https://picsum.photos/200');
INSERT INTO `Users` (`UserID`, `Username`, `Email`, `Password`, `AccountStatus`, `Balance`, `Image`) VALUES
(3, 'user3', 'npt2@gmail.com', '1234', 'active', 400, 'https://picsum.photos/200');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;