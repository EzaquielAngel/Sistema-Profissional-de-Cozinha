Create database cozinha_japonesa;

use cozinha_japonesa;

create table pratos (
	id int primary key auto_increment,
    nome varchar(100) not null,
    tipo varchar(100) not null,
    tempo_preparo int
);

DESCRIBE pratos;

SELECT * FROM pratos;

CREATE TABLE cozinheiros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    nivel VARCHAR(50),
    especialidade VARCHAR(100)
);

create table preparo (
	id int primary key auto_increment,
    id_prato int,
    id_cozinheiro int,
    data_de_preparo date,
    quantidade int,
	FOREIGN KEY (id_prato) REFERENCES pratos(id),
    FOREIGN KEY (id_cozinheiro) REFERENCES cozinheiros(id)
);

create table ingredientes (
	id int primary key auto_increment,
    nome varchar(100) not null,
    unidade varchar(100) not null,
    estoque_atual int
);

create table receitas (
	



);

