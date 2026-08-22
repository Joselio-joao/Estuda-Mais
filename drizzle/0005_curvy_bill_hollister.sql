CREATE TABLE `studyPlans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`subject` varchar(80) NOT NULL,
	`goal` varchar(300) NOT NULL,
	`title` varchar(180) NOT NULL,
	`planJson` text NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `studyPlans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teacherMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`action` enum('explain','solve','summary','quiz','plan','general') NOT NULL DEFAULT 'general',
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `teacherMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teacherSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(160) NOT NULL DEFAULT 'Professor IA',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teacherSessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `teacherSessions_userId_unique` UNIQUE(`userId`)
);
