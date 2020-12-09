
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user_stats" (
	"id" SERIAL PRIMARY KEY, 
	"user_id" INT REFERENCES "user",
	"points" INT DEFAULT (0),
	"achievements" INT DEFAULT (0),
	"unique_speedtest" INT DEFAULT (0),
	"unique_connection" INT DEFAULT (0),
	"rank" INT DEFAULT (0),
	"avatar" INT DEFAULT (0)
	);

    CREATE TABLE "user_trips" (
	"id" SERIAL PRIMARY KEY, 
	"user_id" INT REFERENCES "user",
	"trip_name" VARCHAR(32) NOT NULL
	);

    CREATE TABLE "trip_location" (
	"id" SERIAL PRIMARY KEY, 
	"trip_id" INT REFERENCES "user_trips",
	"location_name" VARCHAR(256),
	);

    CREATE TABLE "location" (
	"id" SERIAL PRIMARY KEY, 
	"long" FLOAT NOT NULL,
	"lat" FLOAT NOT NULL,
	"wifi_name" VARCHAR(128),
	"wifi_avg_speed" FlOAT,
	"location_address" VARCHAR(256),
	);

    CREATE TABLE "speedtest" (
	"id" SERIAL PRIMARY KEY, 
	"user_id" INT REFERENCES "user",
	"location_id" INT REFERENCES "location",
	"avg_speed" FLOAT,
	"test_result" FLOAT
	);