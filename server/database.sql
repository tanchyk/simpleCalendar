CREATE DATABASE todo_database;

CREATE TABLE todo(
todo_id SERIAL,
user_id INTEGER,
complete BIT DEFAULT 0,
description VARCHAR(255),
PRIMARY KEY(todo_id),
FOREIGN KEY(user_id)
);

CREATE TABLE users(
user_id SERIAL,
email VARCHAR(30) NOT NULL UNIQUE,
password VARCHAR(20) NOT NULL,
PRIMARY KEY(user_id)
);