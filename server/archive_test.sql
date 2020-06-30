DROP DATABASE IF EXISTS tonton_sommelier_test;

CREATE DATABASE tonton_sommelier_test;

USE tonton_sommelier_test;

/* Création des tables  */

CREATE TABLE `box`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR (100) NOT NULL,
    `category_id` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `content` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(500),
	`type` VARCHAR(50),
    PRIMARY KEY (`id`)
);

CREATE TABLE `category`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR (100) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `bottle`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR (100) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR (100) NOT NULL,
    `password` VARCHAR (100) NOT NULL,
    PRIMARY KEY (`id`)
);

/* Création des tables de jointure  */

CREATE TABLE `category_content` (
	`category_id` INT(11),
	`content_id` INT(11)
);

CREATE TABLE `bottle_box` (
	`box_id` INT(11),
    `bottle_id` INT(11)
);

/*------ insertions--------*/

INSERT INTO bottle (`id`, `name`) VALUES (1, 'vin rouge1'),(2, 'vin rouge2'),(3, 'vin rouge3');

INSERT INTO category (`id`, `name`) VALUES (1, 'rouge'), (2, 'blanc') ;

INSERT INTO box (`id`, `name`, `category_id`) VALUES (1,'Mystère', 1);

INSERT INTO content (`id`, `content`, `type`) VALUES (1, 'lorem ipsum inglorious minous santanas', 'texte'),(2, 'lor222em ip222sum in222glorious mino222us sa222ntanas', 'image'),(3, 'lor333em ips3333um inglo33333rious m3333inous sant33333anas', 'video');

INSERT INTO category_content (`category_id`, `content_id`) VALUES (1,1),(1,2),(1,3);

INSERT INTO bottle_box (`box_id`, `bottle_id`) VALUES (1,1),(1,2),(1,3);


/* ------ contraintes ----*/ 

ALTER TABLE box
ADD CONSTRAINT `fk_box_category`
FOREIGN KEY (`category_id`)
REFERENCES `category`(`id`);

ALTER TABLE category_content
ADD CONSTRAINT `fk_category_content_category`
FOREIGN KEY (`category_id`)
REFERENCES `category`(`id`);

ALTER TABLE category_content
ADD CONSTRAINT `fk_category_content_content`
FOREIGN KEY (`content_id`)
REFERENCES `content`(`id`);

ALTER TABLE bottle_box
ADD CONSTRAINT `fk_bottle_box_bottle`
FOREIGN KEY (`bottle_id`)
REFERENCES `bottle`(`id`);

ALTER TABLE bottle_box
ADD CONSTRAINT `fk_bottle_box_box`
FOREIGN KEY (`box_id`)
REFERENCES `box`(`id`);