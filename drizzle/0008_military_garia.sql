CREATE TABLE `competitionSubmissionAttachments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submissionId` int NOT NULL,
	`uploadedByUserId` int NOT NULL,
	`fileUrl` text NOT NULL,
	`fileName` varchar(180) NOT NULL,
	`mimeType` varchar(120) NOT NULL,
	`fileSize` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `competitionSubmissionAttachments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('competition','submission','evaluation','certificate','system') NOT NULL DEFAULT 'system',
	`title` varchar(180) NOT NULL,
	`body` text NOT NULL,
	`targetPath` varchar(255),
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `studentBadges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('participant','reviewed','excellence') NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` varchar(255) NOT NULL,
	`icon` varchar(60) NOT NULL,
	`awardedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studentBadges_id` PRIMARY KEY(`id`),
	CONSTRAINT `studentBadges_user_type_unique` UNIQUE(`userId`,`type`)
);
