CREATE TABLE "reminder" (
  "id" uuid PRIMARY KEY,
  "status" uuid,
  "content" varchar,
  "frequency" varchar,
  "next_send_at" timestamp,
  "last_send_at" timestamp,
  "created_at" timestamp
);

CREATE TABLE "send_reminder" (
  "id" uuid PRIMARY KEY,
  "reminder" uuid,
  "send_user" varchar,
  "send_at" timestamp
);

CREATE TABLE "done_reminder" (
  "id" uuid PRIMARY KEY,
  "reminder" uuid,
  "user" varchar,
  "done_at" timestamp
);

CREATE TABLE "delete_reminder" (
  "id" uuid PRIMARY KEY,
  "reminder" uuid,
  "deleted_at" timestamp
);

CREATE TABLE "reminder_status" (
  "id" uuid PRIMARY KEY,
  "status" varchar
);

CREATE TABLE "remind_to_user" (
  "id" uuid PRIMARY KEY,
  "reminder_id" uuid,
  "to_user" varchar
);

ALTER TABLE "reminder" ADD FOREIGN KEY ("status") REFERENCES "reminder_status" ("id");

ALTER TABLE "send_reminder" ADD FOREIGN KEY ("reminder") REFERENCES "reminder" ("id");

ALTER TABLE "done_reminder" ADD FOREIGN KEY ("reminder") REFERENCES "reminder" ("id");

ALTER TABLE "delete_reminder" ADD FOREIGN KEY ("reminder") REFERENCES "reminder" ("id");

ALTER TABLE "remind_to_user" ADD FOREIGN KEY ("reminder_id") REFERENCES "reminder" ("id");
