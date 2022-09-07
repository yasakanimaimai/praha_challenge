CREATE TABLE "workspace" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "address" varchar
);

CREATE TABLE "channel" (
  "id" uuid PRIMARY KEY,
  "belong_to_workspace" uuid,
  "name" varchar
);

CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "mail_address" varchar
);

CREATE TABLE "belong_to_workspace" (
  "workspace_id" uuid,
  "user_id" uuid
);

CREATE TABLE "belong_to_channel" (
  "channel_id" uuid,
  "user_id" uuid
);

CREATE TABLE "message" (
  "id" uuid PRIMARY KEY,
  "channel" uuid,
  "create_user" uuid,
  "status" uuid,
  "created_at" timestamp,
  "content" varchar
);

CREATE TABLE "message_status" (
  "id" uuid PRIMARY KEY,
  "status" varchar
);

CREATE TABLE "thread_relation" (
  "parent_message" uuid,
  "child_message" uuid,
  PRIMARY KEY ("parent_message", "child_message")
);

ALTER TABLE "channel" ADD FOREIGN KEY ("belong_to_workspace") REFERENCES "workspace" ("id");

ALTER TABLE "belong_to_workspace" ADD FOREIGN KEY ("workspace_id") REFERENCES "workspace" ("id");

ALTER TABLE "belong_to_workspace" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "belong_to_channel" ADD FOREIGN KEY ("channel_id") REFERENCES "channel" ("id");

ALTER TABLE "belong_to_channel" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("channel") REFERENCES "channel" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("create_user") REFERENCES "user" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("status") REFERENCES "message_status" ("id");

ALTER TABLE "thread_relation" ADD FOREIGN KEY ("parent_message") REFERENCES "message" ("id");

ALTER TABLE "thread_relation" ADD FOREIGN KEY ("child_message") REFERENCES "message" ("id");
