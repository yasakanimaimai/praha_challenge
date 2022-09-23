CREATE TABLE "book" (
  "id" uuid PRIMARY KEY,
  "author_id" uuid
);

CREATE TABLE "author" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

ALTER TABLE "book" ADD FOREIGN KEY ("author_id") REFERENCES "author" ("id");
