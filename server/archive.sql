DROP DATABASE IF EXISTS tonton_sommelier;

CREATE DATABASE tonton_sommelier;

USE tonton_sommelier;

/* Création des tables  */

CREATE TABLE `box`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR (100) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `description` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(500),
    `content_location` VARCHAR(50),
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
	`category_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);

/* Création des tables de jointure  */

CREATE TABLE `box_description` (
	`box_id` INT(11),
	`description_id` INT(11)
);

CREATE TABLE `bottle_box` (
	`box_id` INT(11),
    `bottle_id` INT(11)
);

/*------ insertions--------*/

INSERT INTO bottle (`id`, `name`, `category_id`) VALUES (1, 'vin rouge1', 1),(2, 'vin rouge2', 1),(3, 'vin rouge3', 1);

INSERT INTO category (`id`, `name`) VALUES (1, 'rouge'), (2, 'blanc') ;

INSERT INTO box (`id`, `name`) VALUES (1,'Mystère');

INSERT INTO description (`id`, `content`, `type`) VALUES (1, 'lorem ipsum inglorious minous santanas', 'texte'),(2, 'lor222em ip222sum in222glorious mino222us sa222ntanas', 'image'),(3, 'lor333em ips3333um inglo33333rious m3333inous sant33333anas', 'video');

INSERT INTO box_description (`box_id`, `description_id`) VALUES (1,1),(1,2),(1,3);

INSERT INTO bottle_box (`box_id`, `bottle_id`) VALUES (1,1),(1,2),(1,3);


/* ------ contraintes ----*/ 

ALTER TABLE bottle
ADD CONSTRAINT `fk_bottle_category`
FOREIGN KEY (`category_id`)
REFERENCES `category`(`id`);

ALTER TABLE box_description
ADD CONSTRAINT `fk_box_description_box`
FOREIGN KEY (`box_id`)
REFERENCES `box`(`id`);

ALTER TABLE box_description
ADD CONSTRAINT `fk_box_description_description`
FOREIGN KEY (`description_id`)
REFERENCES `description`(`id`);

ALTER TABLE bottle_box
ADD CONSTRAINT `fk_bottle_box_bottle`
FOREIGN KEY (`bottle_id`)
REFERENCES `bottle`(`id`);

ALTER TABLE bottle_box
ADD CONSTRAINT `fk_bottle_box_box`
FOREIGN KEY (`box_id`)
REFERENCES `box`(`id`);