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
(1, 'Que dit-on d\'un vin qui a une odeur de bois ?', 4, false,'nez'),
(2, 'boisé', 1, false,'nez'),
(3, 'fort', 2, false,'nez'),
(4, 'corsé', 3, true,'nez'),
(5, 'Que dit-on d\'un vin qui a une forte couleur ?', 4, false,'oeil'),
(6, 'il a de l\'alure', 1, false,'oeil'),
(7, 'il a le swag', 2, true, 'oeil'),
(8, 'il à de la présence', 3, false, 'oeil'),
(9, 'Dans le monde de l\'œunologie, comment appel t-on un goût "piquant" ?', 4, false,'bouche'),
(10, 'un gout tonique', 1, false,'bouche'),
(11, 'un gout puissant', 2, false,'bouche'),
(12, 'un gout vif', 3, true,'bouche'),
(13, 'Combien de temps est affiné un vin rouge ?', 4, false,'barique'),
(14, '5jours', 1, false,'barique'),
(15, '5mois', 2, false,'barique'),
(16, '5ans', 3, true,'barique'),
(17, 'Oû consome-t-on le plus de vin rouge ?', 4, false,'france'),
(18, 'en auvergne', 1, false,'france'),
(19, 'en alsace', 2, true, 'france'),
(20, 'en suède', 3, false, 'france'),
(21, 'Quelle type de plat se marient le mieu au vin rouge ?', 4, false,'book'),
(22, 'a base de viande', 1, false,'book'),
(23, 'a base de légume', 2, false,'book'),
(24, 'les 2 ', 3, true,'book'),
(25, 'Dans quoi déguste-t-on le vin rouge', 4, false,'couvert'),
(26, 'verre a pied', 1, false,'couvert'),
(27, 'verre a bierre', 2, false,'couvert'),
(28, 'verre a moutarde', 3, true,'couvert'),
(29, 'Quel raisin est utilisé pour fare du vin rouge ?', 4, false,'raisin'),
(30, 'raisin blanc', 1, false,'raisin'),
(31, 'raisin rouge', 2, true,'raisin'),
(32, 'sans importance', 3, false,'raisin');

INSERT INTO category_content (`category_id`, `content_id`) VALUES  
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10),
(1,11),
(1,12),
(1,13),
(1,14),
(1,15),
(1,16),
(1,17),
(1,18),
(1,19),
(1,20),
(1,21),
(1,22),
(1,23),
(1,24),
(1,25),
(1,26),
(1,27),
(1,28),
(1,29),
(1,30),
(1,31),
(1,32); 

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