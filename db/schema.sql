CREATE DATABASE pizzas_db;

USE pizzas_db;

CREATE TABLE pizzas(
    id INT NOT NULL AUTO_INCREMENT,
    pizza_name VARCHAR(200) NOT NULL,
    devoured BOOLEAN NOT NULL,
    PRIMARY KEY(id)
);