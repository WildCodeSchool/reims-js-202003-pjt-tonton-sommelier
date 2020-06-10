/* SET FOREIGN_KEY_CHECKS = 0; */

CREATE DATABASE tonton_sommelier;

USE tonton_sommelier;

CREATE TABLE `box`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR (100) NOT NULL,
	PRIMARY KEY (`id`)
);

------------------------------------------

CREATE TABLE `description` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255),
	`type` VARCHAR(50),
    PRIMARY KEY (`id`)
);

/* Création de la table de jointure 'box_description' */
CREATE TABLE `box_description` (
	`box_id` INT(11) DEFAULT NULL,
	`description_id` INT(11) DEFAULT NULL
);

/* Ajout des clefs étrangères de la table 'box_description' */

ALTER TABLE box_description
ADD CONSTRAINT `fk_box_description_box`
FOREIGN KEY (`box_id`)
REFERENCES `box`(`id`);

ALTER TABLE box_description
ADD CONSTRAINT `fk_box_description_description`
FOREIGN KEY (`description_id`)
REFERENCES `description`(`id`);