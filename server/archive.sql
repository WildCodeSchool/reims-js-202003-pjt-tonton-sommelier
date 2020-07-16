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
    `difficulté` INT(11),
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

INSERT INTO content (`id`, `content`, `choix`, `réponse`,`type`, `difficulté`) VALUES 
(1, 'Quelle est la fouchette de temperature idéale pour une cave a vin ?', 4, false,'barique',1),
(2, 'Entre 10° et 14°', 1, false,'barique',1),
(3, 'Entre 11° et 15°', 2, false,'barique',1),
(4, 'Entre 12° et 16°', 3, true,'barique',1),
(5, 'La température de vieillissement optimale est de 12°C et doit être homogène dans toute la cave afin de faire vieillir votre vin jusqu\'à son apogée.', 5, false,'barique',1),
(6, 'Où trouve-t-on souvent les vins au meilleur prix ? ', 4, false,'france',1),
(7, 'En grande surface', 1, false,'france',1),
(8, 'Chez les cavistes', 2, false, 'france',1),
(9, 'Chez les producteurs', 3, true, 'france',1),
(10, 'Il vaut mieu privilégié le circuit court', 5, false,'france',1),
(11, 'Au cours de quels mois ont généralement lieu les vendanges ?', 4, false,'book',1),
(12, 'Août-septembre', 1, false,'book',1),
(13, 'Septembre-octobre', 2, true,'book',1),
(14, 'Octobre-novembre', 3, false,'book',1),
(15, 'En France, l\'époque des vendanges se situe traditionnellement entre septembre et octobre. De là vient le choix du nom de vendémiaire pour le premier mois du calendrier républicain qui dure du 22 septembre au 21 octobre. ', 5, false,'book',1),
(16, 'Quel effet le froid as-t-il sur le vin ?', 4, false,'couvert',1),
(17, 'Il inhibe les arômes', 1, true,'couvert',1),
(18, 'Il fait ressortir l’amertume', 2, false,'couvert',1),
(19, 'Il exhaler l’alcool', 3, false,'couvert',1),
(20, 'Un vin servi trop froid perdra ses arômes. Son acidité sera exacerbé au-delà du raisonnable, tout comme ses tanins. Il y a donc un risque qu\'un vin servi trop froid vous apparaisse dès lors comme austère et sans saveur.', 5, false,'couvert',1),
(21, 'Qu\'est ce que le cépage ?', 4, false,'raisin',1),
(22, 'Le domaine de production', 1, false,'raisin',1),
(23, 'L\'année de production', 2, false,'raisin',1),
(24, 'La variété du raisin utilisé', 3, true,'raisin',1),
(25, 'Un cépage est un type de plant de vigne, cultivé, et caractérisé par des particularités biologiques.', 5, false,'raisin', 1 );


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
(1,25);

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