### Schema

CREATE DATABASE pizzas_db;
USE pizzas_db;

CREATE TABLE pizzas
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	devoured BOOLEAN,
	PRIMARY KEY (id)
);
