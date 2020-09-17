CREATE DATABASE todo_database;

CREATE TABLE users(
user_id SERIAL,
email VARCHAR(30) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
PRIMARY KEY(user_id)
);

CREATE TABLE todo(
todo_id SERIAL,
user_id INTEGER,
complete BOOL DEFAULT false,
description VARCHAR(255),
PRIMARY KEY(todo_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);