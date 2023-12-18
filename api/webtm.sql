5555555555555SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE `project` (
  `Project_ID` int NOT NULL,
  `Title` varchar(63) NOT NULL,
  `Owner_ID` int NOT NULL
);

CREATE TABLE `projectworkers` (
  `User_ID` int NOT NULL,
  `Privilage` int DEFAULT '1',
  `Project_ID` int NOT NULL
);

CREATE TABLE `tasks` (
  `Task_ID` int NOT NULL,
  `Project_ID` int NOT NULL,
  `Title` varchar(63) NOT NULL,
  `Description` text NOT NULL,
  `Status` int DEFAULT NULL,
  `Created_at` int(30) NOT NULL,
  `Created_by` varchar(24) NOT NULL,
  `expire_time` int(30) NOT NULL,
  `Asignee_ID` int NOT NULL
);

CREATE TABLE `user` (
  `User_ID` int NOT NULL,
  `Username` varchar(24) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `identifier` char(64) NOT NULL
);

ALTER TABLE `project`
  ADD PRIMARY KEY (`Project_ID`),
  ADD KEY `Owner_ID` (`Owner_ID`);

ALTER TABLE `projectworkers`
  ADD KEY `Project_ID` (`Project_ID`),
  ADD KEY `User_ID` (`User_ID`);

ALTER TABLE `tasks`
  ADD PRIMARY KEY (`Task_ID`),
  ADD KEY `Project_ID` (`Project_ID`),
  ADD KEY `Asignee_ID` (`Asignee_ID`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`);




ALTER TABLE `project`
  MODIFY `Project_ID` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `tasks`
  MODIFY `Task_ID` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `user`
  MODIFY `User_ID` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`Owner_ID`) REFERENCES `user` (`User_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `projectworkers`
  ADD CONSTRAINT `projectworkers_ibfk_1` FOREIGN KEY (`Project_ID`) REFERENCES `project` (`Project_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `projectworkers_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`Project_ID`) REFERENCES `project` (`Project_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`Asignee_ID`) REFERENCES `user` (`User_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;