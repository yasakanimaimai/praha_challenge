CREATE TABLE "reserve" (
  "id" uuid PRIMARY KEY,
  "store" uuid,
  "customer" uuid,
  "reserve_at" timestamp,
  "receipt_schedule_at" timestamp
);

CREATE TABLE "reserve_order" (
  "id" uuid PRIMARY KEY,
  "reserve_id" uuid,
  "order_at" timestamp
);

CREATE TABLE "reserve_order_detail" (
  "order_id" uuid,
  "detail_number" uuid,
  "wasabi_valume" uuid,
  "order_menu" uuid,
  "quantity" integer,
  PRIMARY KEY ("order_id", "detail_number")
);

CREATE TABLE "reserve_activity" (
  "id" uuid PRIMARY KEY,
  "reserve_id" uuid,
  "reserve_status" uuid,
  "reserve_activity_at" timestamp
);

CREATE TABLE "start_preparation" (
  "reserve_activity_id" uuid PRIMARY KEY
);

CREATE TABLE "end_preparation" (
  "reserve_activity_id" uuid PRIMARY KEY
);

CREATE TABLE "receipt" (
  "reserve_activity_id" uuid PRIMARY KEY
);

CREATE TABLE "cancel" (
  "reserve_activity_id" uuid PRIMARY KEY,
  "memo" varchar
);

CREATE TABLE "store" (
  "id" uuid PRIMARY KEY,
  "store_name" varchar,
  "store_address" varchar,
  "open_time" time,
  "close_time" time
);

CREATE TABLE "employee" (
  "id" uuid PRIMARY KEY,
  "belong_to_store" uuid,
  "employee_rank" uuid,
  "name" varchar
);

CREATE TABLE "employee_rank" (
  "id" uuid PRIMARY KEY,
  "rank_name" varchar
);

CREATE TABLE "customer" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "menu" (
  "id" uuid PRIMARY KEY,
  "sales_condition" uuid,
  "menu_name" varchar
);

CREATE TABLE "set_menu_component" (
  "set_menu" uuid,
  "component_menu" uuid,
  PRIMARY KEY ("set_menu", "component_menu")
);

CREATE TABLE "menu_category" (
  "id" uuid PRIMARY KEY,
  "category_name" varchar
);

CREATE TABLE "menu_category_belongs_to_menu_category" (
  "parent_menu_category" uuid,
  "child_menu_category" uuid,
  "hierarchy_length" integer,
  PRIMARY KEY ("parent_menu_category", "child_menu_category")
);

CREATE TABLE "menu_belongs_to_menu_category" (
  "menu" uuid,
  "menu_category" uuid,
  PRIMARY KEY ("menu", "menu_category")
);

CREATE TABLE "wasabi_valume" (
  "id" uuid PRIMARY KEY,
  "volume" varchar
);

CREATE TABLE "menu_sales_condition" (
  "id" uuid PRIMARY KEY,
  "conndition" varchar
);

CREATE TABLE "reserve_status" (
  "id" uuid PRIMARY KEY,
  "status" varchar
);

COMMENT ON TABLE "reserve_order" IS '予約に紐づく注文。
  注文が変更されると新しくレコードがinsertされる';

COMMENT ON COLUMN "reserve_order"."order_at" IS '最新時間が現在の注文';

COMMENT ON COLUMN "reserve_order_detail"."detail_number" IS 'order_id内で連番';

ALTER TABLE "reserve" ADD FOREIGN KEY ("store") REFERENCES "store" ("id");

ALTER TABLE "reserve" ADD FOREIGN KEY ("customer") REFERENCES "customer" ("id");

ALTER TABLE "reserve_order" ADD FOREIGN KEY ("reserve_id") REFERENCES "reserve" ("id");

ALTER TABLE "reserve_order_detail" ADD FOREIGN KEY ("order_id") REFERENCES "reserve_order" ("id");

ALTER TABLE "reserve_order_detail" ADD FOREIGN KEY ("wasabi_valume") REFERENCES "wasabi_valume" ("id");

ALTER TABLE "reserve_order_detail" ADD FOREIGN KEY ("order_menu") REFERENCES "menu" ("id");

ALTER TABLE "reserve_activity" ADD FOREIGN KEY ("reserve_id") REFERENCES "reserve" ("id");

ALTER TABLE "reserve_activity" ADD FOREIGN KEY ("reserve_status") REFERENCES "reserve_status" ("id");

ALTER TABLE "start_preparation" ADD FOREIGN KEY ("reserve_activity_id") REFERENCES "reserve_activity" ("id");

ALTER TABLE "end_preparation" ADD FOREIGN KEY ("reserve_activity_id") REFERENCES "reserve_activity" ("id");

ALTER TABLE "receipt" ADD FOREIGN KEY ("reserve_activity_id") REFERENCES "reserve_activity" ("id");

ALTER TABLE "cancel" ADD FOREIGN KEY ("reserve_activity_id") REFERENCES "reserve_activity" ("id");

ALTER TABLE "employee" ADD FOREIGN KEY ("belong_to_store") REFERENCES "store" ("id");

ALTER TABLE "employee" ADD FOREIGN KEY ("employee_rank") REFERENCES "employee_rank" ("id");

ALTER TABLE "menu" ADD FOREIGN KEY ("sales_condition") REFERENCES "menu_sales_condition" ("id");

ALTER TABLE "set_menu_component" ADD FOREIGN KEY ("set_menu") REFERENCES "menu" ("id");

ALTER TABLE "set_menu_component" ADD FOREIGN KEY ("component_menu") REFERENCES "menu" ("id");

ALTER TABLE "menu_category_belongs_to_menu_category" ADD FOREIGN KEY ("parent_menu_category") REFERENCES "menu_category" ("id");

ALTER TABLE "menu_category_belongs_to_menu_category" ADD FOREIGN KEY ("child_menu_category") REFERENCES "menu_category" ("id");

ALTER TABLE "menu_belongs_to_menu_category" ADD FOREIGN KEY ("menu") REFERENCES "menu" ("id");

ALTER TABLE "menu_belongs_to_menu_category" ADD FOREIGN KEY ("menu_category") REFERENCES "menu_category" ("id");
