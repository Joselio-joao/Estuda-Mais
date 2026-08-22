CREATE TABLE `competitionEnrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`competitionId` int NOT NULL,
	`userId` int NOT NULL,
	`status` enum('registered','withdrawn') NOT NULL DEFAULT 'registered',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `competitionEnrollments_id` PRIMARY KEY(`id`),
	CONSTRAINT `competitionEnrollments_competition_user_unique` UNIQUE(`competitionId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `competitions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerUserId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`description` text NOT NULL,
	`subject` varchar(80) NOT NULL,
	`educationLevel` varchar(80),
	`format` enum('individual','group') NOT NULL DEFAULT 'individual',
	`status` enum('open','in_progress','closed') NOT NULL DEFAULT 'open',
	`startAt` timestamp NOT NULL,
	`endAt` timestamp NOT NULL,
	`registrationDeadline` timestamp NOT NULL,
	`capacity` int NOT NULL DEFAULT 100,
	`reward` varchar(180),
	`communityId` int,
	`studyGroupId` int,
	`coverColor` varchar(7) NOT NULL DEFAULT '#0D47A1',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `competitions_id` PRIMARY KEY(`id`)
);
