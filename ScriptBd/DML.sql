
/*
drop table `prueba_sophos`.`sedes_usuarios`;
drop table `prueba_sophos`.`sedes`;
drop table `prueba_sophos`.`ciudades`;
drop table `prueba_sophos`.`usuarios`;*/

CREATE TABLE IF NOT EXISTS `prueba_sophos`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `createdAt` VARCHAR(45) NULL,
  `updatedAt` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE)
ENGINE = MyISAM;




CREATE TABLE IF NOT EXISTS `prueba_sophos`.`ciudades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL,
  `createdAt` VARCHAR(45) NULL,
  `updatedAt` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = MyISAM;



CREATE TABLE IF NOT EXISTS `prueba_sophos`.`sedes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idciudad` INT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `capacidadmax` INT NOT NULL DEFAULT 300 COMMENT 'capacidad maxima de la sede .',
  `createdAt` VARCHAR(45) NULL,
  `updatedAt` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_idciudad_idx` (`idciudad` ASC) VISIBLE,
  CONSTRAINT `fk_idciudad`
    FOREIGN KEY (`idciudad`)
    REFERENCES `prueba_sophos`.`ciudades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


CREATE TABLE IF NOT EXISTS `prueba_sophos`.`sedes_usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_sede` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `createdAt` VARCHAR(45) NULL,
  `updatedAt` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_usuario_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_id_sede_idx` (`id_sede` ASC) VISIBLE,
  CONSTRAINT `fk_id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `prueba_sophos`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_sede`
    FOREIGN KEY (`id_sede`)
    REFERENCES `prueba_sophos`.`sedes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


 
-- insert usuario admin
insert into usuarios (login,nombre,password,email,role) values('admin','admin','$2a$10$SMtE7yjy1DDnBrzzitjNqeAV513XQOKCm7avSzGdemn2XTt28Z1k.','admin@admin.com','USR_ADM');


commit;