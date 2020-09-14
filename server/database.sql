CREATE DATABASE todo_database;

CREATE TABLE todo(
todo_id SERIAL PRIMARY KEY,
description VARCHAR(255)
);

INSERT INTO users (description)
VALUES ('first task');