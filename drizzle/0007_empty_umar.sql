CREATE TABLE `competitionCertificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`competitionId` int NOT NULL,
	`userId` int NOT NULL,
	`submissionId` int NOT NULL,
	`certificateCode` varchar(80) NOT NULL,
	`score` int NOT NULL,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `competitionCertificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `competitionCertificates_certificateCode_unique` UNIQUE(`certificateCode`),
	CONSTRAINT `competitionCertificates_competition_user_unique` UNIQUE(`competitionId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `competitionSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`competitionId` int NOT NULL,
	`userId` int NOT NULL,
	`response` text NOT NULL,
	`status` enum('submitted','reviewed') NOT NULL DEFAULT 'submitted',
	`score` int,
	`feedback` text,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `competitionSubmissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `competitionSubmissions_competition_user_unique` UNIQUE(`competitionId`,`userId`)
);
