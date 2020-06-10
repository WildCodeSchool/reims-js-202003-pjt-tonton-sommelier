CREATE DATABASE tonton_sommelier;

USE tonton_sommelier;

CREATE TABLE `box`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR (100) NOT NULL,
	PRIMARY KEY (`id`)
);

------------------------------------------

CREATE TABLE bottle(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (100) NOT NULL,
	category_id VARCHAR (100) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE category(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (100) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE bottle CHANGE category category_id VARCHAR (100) NOT NULL;