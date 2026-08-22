CREATE TABLE `deviceNotificationSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceEnabled` boolean NOT NULL DEFAULT false,
	`dailyReminderEnabled` boolean NOT NULL DEFAULT false,
	`reminderHour` int NOT NULL DEFAULT 18,
	`expoPushToken` varchar(255),
	`tokenUpdatedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `deviceNotificationSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `deviceNotificationSettings_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `weeklyChallengeAwards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`challengeId` int NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(100) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`awardedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `weeklyChallengeAwards_id` PRIMARY KEY(`id`),
	CONSTRAINT `weeklyChallengeAwards_challenge_user_unique` UNIQUE(`challengeId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `weeklyChallengeParticipants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`challengeId` int NOT NULL,
	`userId` int NOT NULL,
	`status` enum('joined','completed','withdrawn') NOT NULL DEFAULT 'joined',
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `weeklyChallengeParticipants_id` PRIMARY KEY(`id`),
	CONSTRAINT `weeklyChallengeParticipants_challenge_user_unique` UNIQUE(`challengeId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `weeklyChallenges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerUserId` int NOT NULL,
	`weekCode` varchar(16) NOT NULL,
	`title` varchar(180) NOT NULL,
	`description` text NOT NULL,
	`subject` varchar(80) NOT NULL,
	`startAt` timestamp NOT NULL,
	`endAt` timestamp NOT NULL,
	`coverColor` varchar(7) NOT NULL DEFAULT '#0D47A1',
	`badgeTitle` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `weeklyChallenges_id` PRIMARY KEY(`id`),
	CONSTRAINT `weeklyChallenges_weekCode_unique` UNIQUE(`weekCode`)
);
