CREATE TABLE "issue" (
  "id" integer PRIMARY KEY,
  "type" integer
);

CREATE TABLE "type" (
  "id" integer PRIMARY KEY,
  "type" varchar
);

CREATE TABLE "bugs" (
  "id" integer PRIMARY KEY
);

CREATE TABLE "request" (
  "id" integer PRIMARY KEY
);

ALTER TABLE "issue" ADD FOREIGN KEY ("type") REFERENCES "type" ("id");

ALTER TABLE "bugs" ADD FOREIGN KEY ("id") REFERENCES "issue" ("id");

ALTER TABLE "request" ADD FOREIGN KEY ("id") REFERENCES "issue" ("id");


insert into "type" values
(
  1,
  'bugs'
),
(
  2,
  'request'
)
;



insert into issue values
(
  1,
  1
),
(
  2,
  2
)
;

insert into bugs values
(
  1
)
;

insert into request values
(
  2
)
;


