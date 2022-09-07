CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "directory" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "latest_status" uuid
);

CREATE TABLE "directory_status" (
  "id" uuid PRIMARY KEY,
  "status" varchar
);

CREATE TABLE "directory_activity" (
  "id" uuid PRIMARY KEY,
  "directory_id" uuid,
  "actived_user" uuid,
  "status" uuid,
  "actived_at" varchar
);

CREATE TABLE "directory_relation" (
  "parant_directory" uuid,
  "child_directory" uuid,
  "length" integer,
  PRIMARY KEY ("parant_directory", "child_directory")
);

CREATE TABLE "create_directory" (
  "directory_activity_id" uuid PRIMARY KEY
);

CREATE TABLE "update_directory" (
  "directory_activity_id" uuid PRIMARY KEY
);

CREATE TABLE "delete_directory" (
  "directory_activity_id" uuid PRIMARY KEY
);

CREATE TABLE "recover_directory" (
  "directory_activity_id" uuid PRIMARY KEY
);

CREATE TABLE "document" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "latest_status" uuid,
  "latest_content" varchar,
  "order" integer
);

CREATE TABLE "document_status" (
  "id" uuid PRIMARY KEY,
  "status" varchar
);

CREATE TABLE "document_activity" (
  "id" uuid PRIMARY KEY,
  "document_id" uuid,
  "actived_user" uuid,
  "status" uuid,
  "actived_at" varchar
);

CREATE TABLE "directory_document_relation" (
  "parant_directory" uuid,
  "child_document" uuid,
  "length" integer,
  PRIMARY KEY ("parant_directory", "child_document")
);

CREATE TABLE "create_document" (
  "document_activity_id" uuid PRIMARY KEY,
  "content" varchar
);

CREATE TABLE "update_document" (
  "document_activity_id" uuid PRIMARY KEY,
  "content" varchar
);

CREATE TABLE "delete_document" (
  "document_activity_id" uuid PRIMARY KEY,
  "content" varchar
);

CREATE TABLE "recover_document" (
  "document_activity_id" uuid PRIMARY KEY,
  "content" varchar
);

ALTER TABLE "directory" ADD FOREIGN KEY ("latest_status") REFERENCES "directory_status" ("id");

ALTER TABLE "directory_activity" ADD FOREIGN KEY ("directory_id") REFERENCES "directory" ("id");

ALTER TABLE "directory_activity" ADD FOREIGN KEY ("actived_user") REFERENCES "user" ("id");

ALTER TABLE "directory_activity" ADD FOREIGN KEY ("status") REFERENCES "directory_status" ("id");

ALTER TABLE "directory_relation" ADD FOREIGN KEY ("parant_directory") REFERENCES "directory" ("id");

ALTER TABLE "directory_relation" ADD FOREIGN KEY ("child_directory") REFERENCES "directory" ("id");

ALTER TABLE "create_directory" ADD FOREIGN KEY ("directory_activity_id") REFERENCES "directory_activity" ("id");

ALTER TABLE "update_directory" ADD FOREIGN KEY ("directory_activity_id") REFERENCES "directory_activity" ("id");

ALTER TABLE "delete_directory" ADD FOREIGN KEY ("directory_activity_id") REFERENCES "directory_activity" ("id");

ALTER TABLE "recover_directory" ADD FOREIGN KEY ("directory_activity_id") REFERENCES "directory_activity" ("id");

ALTER TABLE "document" ADD FOREIGN KEY ("latest_status") REFERENCES "document_status" ("id");

ALTER TABLE "document_activity" ADD FOREIGN KEY ("document_id") REFERENCES "document" ("id");

ALTER TABLE "document_activity" ADD FOREIGN KEY ("actived_user") REFERENCES "user" ("id");

ALTER TABLE "document_activity" ADD FOREIGN KEY ("status") REFERENCES "document_status" ("id");

ALTER TABLE "directory_document_relation" ADD FOREIGN KEY ("parant_directory") REFERENCES "directory" ("id");

ALTER TABLE "directory_document_relation" ADD FOREIGN KEY ("child_document") REFERENCES "document" ("id");

ALTER TABLE "create_document" ADD FOREIGN KEY ("document_activity_id") REFERENCES "document_activity" ("id");

ALTER TABLE "update_document" ADD FOREIGN KEY ("document_activity_id") REFERENCES "document_activity" ("id");

ALTER TABLE "delete_document" ADD FOREIGN KEY ("document_activity_id") REFERENCES "document_activity" ("id");

ALTER TABLE "recover_document" ADD FOREIGN KEY ("document_activity_id") REFERENCES "document_activity" ("id");
