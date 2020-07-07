DROP DATABASE IF EXISTS tonton_sommelier;

CREATE DATABASE tonton_sommelier;

USE tonton_sommelier;

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
    `choix` INT(11),
    `réponse` BOOL,
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

CREATE TABLE `box_category` (
	`box_id` INT(11),
    `category_id` INT(11)
);

/*------ insertions--------*/

INSERT INTO bottle (`id`, `name`) VALUES (1, 'vin rouge1'),(2, 'vin rouge2'),(3, 'vin rouge3');

INSERT INTO category (`id`, `name`) VALUES (1, 'rouge'), (2, 'blanc') ;

INSERT INTO box (`id`, `name`, `category_id`) VALUES (1,'Mystère', 1);

INSERT INTO content (`id`, `content`, `choix`, `réponse`,`type`) VALUES 
(1, 'lorem ipsum inglorious minous santanas', 1, false,'nez'),
(2, 'lorem ipsum inglorious minous santanas', 2, false,'nez'),
(3, 'lorem ipsum inglorious minous santanas', 3, true,'nez'),
(4, 'lor222em ip222sum in222glorious mino222us sa222ntanas', 1, false,'oeil'),
(5, 'lor222em ip222sum in222glorious mino222us sa222ntanas', 2, true, 'oeil'),
(6, 'lor222em ip222sum in222glorious mino222us sa222ntanas', 3, false, 'oeil'),
(7, 'question 1 : lor333em ips3333um inglo33333rious m3333inous sant33333anas', 1, false,'bouche'),
(8, 'question 2 : lor333em ips3333um inglo33333rious m3333inous sant33333anas', 2, false,'bouche'),
(9, 'question 3 :lor333em ips3333um inglo33333rious m3333inous sant33333anas', 3, true,'bouche'),
(10, 'ceci nest pas bon', 1, true,'bouche');

INSERT INTO category_content (`category_id`, `content_id`) VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(2,10);

INSERT INTO bottle_box (`box_id`, `bottle_id`) VALUES (1,1),(1,2),(1,3);

INSERT INTO box_category (`box_id`, `category_id`) VALUES (1,1),(1,2);


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

ALTER TABLE box_category
ADD CONSTRAINT `fk_box_category_box`
FOREIGN KEY (`box_id`)
REFERENCES `box`(`id`);

ALTER TABLE box_category
ADD CONSTRAINT `fk_box_category_category`
FOREIGN KEY (`category_id`)
REFERENCES `category`(`id`);