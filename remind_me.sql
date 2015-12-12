CREATE SCHEMA `remind_me` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `remind_me`.`user` (
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `remind_me`.`remind_list` (
  `remind_index` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `company` VARCHAR(45) NULL,
  `category` VARCHAR(45) NULL,
  `item_list` JSON NOT NULL,
  `date` TEXT NOT NULL,
  `img_link` TEXT NULL,
  `buy_complete` TINYINT NOT NULL DEFAULT 0,
  `remind_alarm` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`remind_index`, `email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

select * from remind_me.remind_list;
update remind_me.remind_list set remind_alarm = false where remind_index = 2;
update remind_me.remind_list set remind_alarm = true where remind_index = 2;
