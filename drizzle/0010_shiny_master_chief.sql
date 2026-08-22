CREATE TABLE `ownerAuditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`actorUserId` int NOT NULL,
	`targetUserId` int,
	`targetType` enum('user','post') NOT NULL,
	`targetId` int NOT NULL,
	`action` varchar(80) NOT NULL,
	`reason` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ownerAuditLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `posts` ADD `moderationStatus` enum('visible','hidden') DEFAULT 'visible' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `moderationReason` varchar(500);--> statement-breakpoint
ALTER TABLE `posts` ADD `moderatedAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `accountStatus` enum('active','suspended','banned') DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `restrictionReason` varchar(500);--> statement-breakpoint
ALTER TABLE `users` ADD `restrictedAt` timestamp;