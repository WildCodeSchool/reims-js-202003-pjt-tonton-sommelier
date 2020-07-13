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
(5, 'On dit de ce vin qu\il est corsé.', 5, false,'nez'),
(6, 'Que dit-on d\'un vin qui a une forte couleur ?', 4, false,'oeil'),
(7, 'il a de l\'alure', 1, false,'oeil'),
(8, 'il a le swag', 2, true, 'oeil'),
(9, 'il à de la présence', 3, false, 'oeil'),
(10, 'On dit qu\'il s\'agit d\'un vin swagé.', 5, false,'oeil'),
(11, 'Dans le monde de l\'œunologie, comment appel t-on un goût "piquant" ?', 4, false,'bouche'),
(12, 'un gout tonique', 1, false,'bouche'),
(13, 'un gout puissant', 2, false,'bouche'),
(14, 'un gout vif', 3, true,'bouche'),
(15, 'Un goût puqiant est un goût vif.', 5, false,'bouche'),
(16, 'Combien de temps est affiné un vin rouge ?', 4, false,'barique'),
(17, '5jours', 1, false,'barique'),
(18, '5mois', 2, false,'barique'),
(19, '5ans', 3, true,'barique'),
(20, 'Il est important de ne pas dépasser cette durée sans quoi le vin perd de sa valeur gustative.', 5, false,'barique'),
(21, 'Oû consome-t-on le plus de vin rouge ?', 4, false,'france'),
(22, 'en auvergne', 1, false,'france'),
(23, 'en alsace', 2, true, 'france'),
(24, 'en suède', 3, false, 'france'),
(25, 'Les français aiment le rosé tandis que les suedois préfèrent le vin blanc.', 5, false,'france'),
(26, 'Quelle type de plat se marient le mieu au vin rouge ?', 4, false,'book'),
(27, 'a base de viande', 1, false,'book'),
(28, 'a base de légume', 2, false,'book'),
(29, 'les 2 ', 3, true,'book'),
(30, 'Peut importe le type de viande, le vin rouge relève leur goût.', 5, false,'book'),
(31, 'Dans quoi déguste-t-on le vin rouge', 4, false,'couvert'),
(32, 'verre a pied', 1, false,'couvert'),
(33, 'verre a bierre', 2, false,'couvert'),
(34, 'verre a moutarde', 3, true,'couvert'),
(35, 'Il faut cependant bien rincer le verre avant dgustation.', 5, false,'couvert'),
(36, 'Quel raisin est utilisé pour fare du vin rouge ?', 4, false,'raisin'),
(37, 'raisin blanc', 1, false,'raisin'),
(38, 'raisin rouge', 2, true,'raisin'),
(39, 'sans importance', 3, false,'raisin'),
(40, 'Le raisin blanc pour le raisin blanc, le rouge pour le rouge.', 5, false,'raisin');


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
(1,32),
(1,33),
(1,34),
(1,35),
(1,36),
(1,37),
(1,38),
(1,39),
(1,40); 

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