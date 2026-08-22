CREATE TABLE `postComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`body` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `postComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `postLikes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `postLikes_id` PRIMARY KEY(`id`),
	CONSTRAINT `postLikes_post_user_unique` UNIQUE(`postId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `postSaves` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `postSaves_id` PRIMARY KEY(`id`),
	CONSTRAINT `postSaves_post_user_unique` UNIQUE(`postId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `postShares` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `postShares_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('text','photo','video','question','document') NOT NULL DEFAULT 'text',
	`body` text NOT NULL,
	`mediaUrl` text,
	`mediaName` varchar(255),
	`mediaMimeType` varchar(120),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
