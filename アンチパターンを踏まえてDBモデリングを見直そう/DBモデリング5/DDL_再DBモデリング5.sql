CREATE TABLE "article" (
  "id" uuid PRIMARY KEY,
  "status" uuid,
  "created_user" uuid
);

CREATE TABLE "article_status" (
  "id" uuid PRIMARY KEY,
  "status" varchar
);

CREATE TABLE "article_content_history" (
  "id" uuid PRIMARY KEY,
  "article" uuid,
  "content" varchar,
  "created_at" timestamp
);

CREATE TABLE "select_content" (
  "id" uuid,
  "content_history" uuid
);

CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

ALTER TABLE "article" ADD FOREIGN KEY ("status") REFERENCES "article_status" ("id");

ALTER TABLE "article" ADD FOREIGN KEY ("created_user") REFERENCES "user" ("id");

ALTER TABLE "article_content_history" ADD FOREIGN KEY ("article") REFERENCES "article" ("id");

ALTER TABLE "select_content" ADD FOREIGN KEY ("content_history") REFERENCES "article_content_history" ("id");
