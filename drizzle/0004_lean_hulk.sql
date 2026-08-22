CREATE TABLE `learningResources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerUserId` int NOT NULL,
	`type` enum('book','material','video') NOT NULL,
	`title` varchar(180) NOT NULL,
	`description` text NOT NULL,
	`subject` varchar(80) NOT NULL,
	`educationLevel` varchar(80),
	`author` varchar(160) NOT NULL,
	`coverColor` varchar(7) NOT NULL DEFAULT '#0D47A1',
	`fileUrl` text,
	`fileName` varchar(255),
	`mimeType` varchar(120),
	`durationSeconds` int NOT NULL DEFAULT 0,
	`access` enum('public','community','group') NOT NULL DEFAULT 'public',
	`communityId` int,
	`studyGroupId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learningResources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resourceProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resourceId` int NOT NULL,
	`userId` int NOT NULL,
	`watchedSeconds` int NOT NULL DEFAULT 0,
	`completed` boolean NOT NULL DEFAULT false,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resourceProgress_id` PRIMARY KEY(`id`),
	CONSTRAINT `resourceProgress_resource_user_unique` UNIQUE(`resourceId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `resourceSaves` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resourceId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `resourceSaves_id` PRIMARY KEY(`id`),
	CONSTRAINT `resourceSaves_resource_user_unique` UNIQUE(`resourceId`,`userId`)
);
