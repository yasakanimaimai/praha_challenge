-- 親テーブルが２つの子テーブルを持ち場合のJOIN確認用
CREATE TABLE "parent" (
  "id" integer PRIMARY KEY,
  "value" varchar
);

CREATE TABLE "child1" (
  "id" integer,
  "parent_id" integer,
  "value" varchar
);

CREATE TABLE "child2" (
  "id" integer,
  "parent_id" integer,
  "value" varchar
);

ALTER TABLE "child1" ADD FOREIGN KEY ("parent_id") REFERENCES "parent" ("id");

ALTER TABLE "child2" ADD FOREIGN KEY ("parent_id") REFERENCES "parent" ("id");

-- insert
insert into parent values
(
  1,
  'a'
)
,(
  2,
  'b'
)
,(
  3,
  'c'
);

insert into child1 values
(
  1,
  1,
  'child_a'
)
;


-- select
SELECT
  *
FROM
  parent
;

-- 検証クエリ
SELECT
  *
FROM
  parent AS p
LEFT OUTER JOIN
  child1 AS c1
  ON p.id = c1.parent_id
LEFT OUTER JOIN
  child2 AS c2
  ON p.id = c2.parent_id
;
