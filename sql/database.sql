CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "bio" varchar,
  "level" integer,
  "email" varchar,
  "avatar" varchar,
  "code_auth" varchar,
  "online" varchar,
  "gendre" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "block_list" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "blocked_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "history" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "enmey_id" integer,
  "home_score" integer,
  "away_score" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "friends" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "friend_id" integer,
  "status" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "achievements" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "type" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "rooms" (
  "id" integer PRIMARY KEY,
  "owner_id" integer,
  "name" varchar,
  "password" varchar,
  "type" varchar,
  "avatar" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "room_users" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "room_id" integer,
  "role" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "room_messages" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "room_id" integer,
  "message" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "private_channel" (
  "id" integer PRIMARY KEY,
  "sender" integer,
  "reciever" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "private_channel_messages" (
  "id" integer PRIMARY KEY,
  "channel_id" integer,
  "message" text
);

ALTER TABLE "achievements" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "friends" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "friends" ADD FOREIGN KEY ("friend_id") REFERENCES "users" ("id");

ALTER TABLE "history" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "history" ADD FOREIGN KEY ("enmey_id") REFERENCES "users" ("id");

ALTER TABLE "rooms" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "room_users" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "rooms" ADD FOREIGN KEY ("id") REFERENCES "room_users" ("room_id");

ALTER TABLE "room_messages" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "rooms" ADD FOREIGN KEY ("id") REFERENCES "room_messages" ("room_id");

ALTER TABLE "private_channel" ADD FOREIGN KEY ("sender") REFERENCES "users" ("id");

ALTER TABLE "private_channel" ADD FOREIGN KEY ("reciever") REFERENCES "users" ("id");

ALTER TABLE "private_channel_messages" ADD FOREIGN KEY ("channel_id") REFERENCES "private_channel" ("id");

ALTER TABLE "block_list" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "block_list" ADD FOREIGN KEY ("blocked_id") REFERENCES "users" ("id");
