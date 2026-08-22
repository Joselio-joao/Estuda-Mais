CREATE TABLE `progressReportGrants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentUserId` int NOT NULL,
	`recipientName` varchar(160) NOT NULL,
	`recipientEmail` varchar(320) NOT NULL,
	`recipientType` enum('guardian','school') NOT NULL,
	`status` enum('active','revoked') NOT NULL DEFAULT 'active',
	`grantedAt` timestamp NOT NULL DEFAULT (now()),
	`revokedAt` timestamp,
	CONSTRAINT `progressReportGrants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `safetyReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reporterUserId` int NOT NULL,
	`targetType` enum('post','comment','community','group','challenge','user') NOT NULL,
	`targetId` int NOT NULL,
	`category` enum('spam','bullying','unsafe','inappropriate','other') NOT NULL,
	`details` varchar(1000),
	`status` enum('submitted','reviewing','resolved','dismissed') NOT NULL DEFAULT 'submitted',
	`reviewerUserId` int,
	`resolutionNote` varchar(1000),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	CONSTRAINT `safetyReports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `progressReportGrants_student_idx` ON `progressReportGrants` (`studentUserId`);--> statement-breakpoint
CREATE INDEX `safetyReports_target_idx` ON `safetyReports` (`targetType`,`targetId`);--> statement-breakpoint
CREATE INDEX `safetyReports_status_idx` ON `safetyReports` (`status`);