CREATE TABLE `description` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255),
	`type` VARCHAR(50),
    PRIMARY KEY (`id`)
);

CREATE TABLE `box_description` (
	`box_id` INT(11) DEFAULT NULL,
	`description_id` INT(11) DEFAULT NULL
);

ALTER TABLE box_description
ADD CONSTRAINT `fk_box_description_box`
FOREIGN KEY (`box_id`)
REFERENCES `box`(`id`);

ALTER TABLE box_description
ADD CONSTRAINT `fk_box_description_description`
FOREIGN KEY (`description_id`)
REFERENCES `description`(`id`);

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