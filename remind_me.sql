CREATE SCHEMA `remind.me` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `remind.me`.`user` (
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
