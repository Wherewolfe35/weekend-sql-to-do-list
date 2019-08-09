CREATE TABLE "todoitems" (
	"id" SERIAL PRIMARY KEY,
	"item" VARCHAR(200) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE NOT NULL
	);
	
INSERT INTO "todoitems" ( "item" , "completed") VALUES('Complete weekend challenge', false), ('Start weekend challenge', true);