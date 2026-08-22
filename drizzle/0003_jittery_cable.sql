CREATE TABLE `communities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerUserId` int NOT NULL,
	`name` varchar(140) NOT NULL,
	`description` text NOT NULL,
	`category` varchar(80) NOT NULL,
	`educationLevel` varchar(80),
	`visibility` enum('public','private') NOT NULL DEFAULT 'public',
	`coverColor` varchar(7) NOT NULL DEFAULT '#0D47A1',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `communities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `communityMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`communityId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('admin','member') NOT NULL DEFAULT 'member',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `communityMembers_id` PRIMARY KEY(`id`),
	CONSTRAINT `communityMembers_community_user_unique` UNIQUE(`communityId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `conversationMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversationMembers_id` PRIMARY KEY(`id`),
	CONSTRAINT `conversationMembers_conversation_user_unique` UNIQUE(`conversationId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('direct','group','community') NOT NULL,
	`title` varchar(160),
	`communityId` int,
	`studyGroupId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`senderUserId` int NOT NULL,
	`body` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `studyGroupMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`groupId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('admin','member') NOT NULL DEFAULT 'member',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studyGroupMembers_id` PRIMARY KEY(`id`),
	CONSTRAINT `studyGroupMembers_group_user_unique` UNIQUE(`groupId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `studyGroups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`communityId` int NOT NULL,
	`ownerUserId` int NOT NULL,
	`name` varchar(140) NOT NULL,
	`description` text NOT NULL,
	`privacy` enum('public','private') NOT NULL DEFAULT 'public',
	`conversationId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studyGroups_id` PRIMARY KEY(`id`)
);
