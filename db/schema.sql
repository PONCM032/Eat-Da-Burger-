DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burger
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	action BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);