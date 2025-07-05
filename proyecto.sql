use dawa;

CREATE TABLE TB_ROL (
  id_rol int NOT NULL AUTO_INCREMENT,
  nombre_rol varchar(25) NOT NULL,
  estado char(1) DEFAULT NULL,
  PRIMARY KEY (id_rol),
  CONSTRAINT TB_ROL_chk_1 CHECK ((estado in (_utf8mb4'A',_utf8mb4'I')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO TB_ROL (nombre_rol, estado) VALUES ('Admin', 'A');
INSERT INTO TB_ROL (nombre_rol, estado) VALUES ('Tecnico', 'A');
INSERT INTO TB_ROL (nombre_rol, estado) VALUES ('usuario', 'A');

select * from TB_USERS;
CREATE TABLE TB_USERS (
  id_user int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  passwords varchar(20) NOT NULL,
  nombre varchar(50) NOT NULL,
  apellidos varchar(50) NOT NULL,
  cedula varchar(10) NOT NULL,
  correo varchar(50) NOT NULL,
  id_rol int NOT NULL,
  PRIMARY KEY (id_user),
  FOREIGN KEY (id_rol) REFERENCES TB_ROL(id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO TB_USERS (username, passwords, nombre, apellidos, cedula, correo, id_rol) 
VALUES ('usuario1', 'password1', 'Maria', 'Perez', '1234567890', 'admin@gmail.com',  1);
INSERT INTO TB_USERS (username, passwords, nombre, apellidos, cedula, correo, id_rol) 
VALUES ('laura01', 'password2', 'Jose', 'Lopez', '2345678901', 'tecnico@gmail.com',  2);
INSERT INTO TB_USERS (username, passwords, nombre, apellidos, cedula, correo, id_rol) 
VALUES ('user00', 'password3', 'Jorg', 'Pazcual', '3456789012', 'user@gmail.com',  3);
INSERT INTO TB_USERS (username, passwords, nombre, apellidos, cedula, correo,  id_rol) 
VALUES ('yin', 'password3', 'mi', 'Sanch', '3456789012', 'user2@gmail.com', 3);



select * from repuesto;

CREATE TABLE repuesto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    precio DECIMAL(10, 2),
    imagen VARCHAR(255)
);

INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (1, 'Pantalla LCD para iPhone X', 120.00, 'https://http2.mlstatic.com/D_NQ_NP_757234-MEC75247329175_032024-O.webp');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (2, 'Batería Samsung Galaxy S10', 45.00, 'https://www.movilcrack.com/media/catalog/product/b/a/bateria_original_eb-bg975abu_samsung_s10_plus_g975f_gh82-18827a_mk22146.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (3, 'Cable de Carga USB-C Samsung', 10.00, 'https://celularesecuador.com/website/wp-content/uploads/2020/03/Imagen3.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (4, 'Cámara Trasera para iPhone 12', 85.00, 'https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/3662427524384_1.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (5, 'Altavoz para Google Pixel 5', 30.00, 'https://shockware.in/cdn/shop/products/GooglePixel5ES.3_1200x1200.jpg?v=1709060969');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (6, 'Botón Home para iPhone 8', 25.00, 'https://www.tabletpc.ec/2979-large_default/boton-home-huella-samsung-s5-flex.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (7, 'Cargador Inalámbrico para Infinix Note 40 Pro', 40.00, 'https://www.digitaltrends.com/wp-content/uploads/2024/03/Infinix-Note-40-Pro-Plus-MagPad-wireless-charger.jpg?fit=720%2C480&p=1');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (8, 'Protector de Pantalla de Vidrio Templado', 15.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4uKCt59uOfZb9nBikC-aVJrOwwQXgUgMVNQ&s');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (9, 'Micrófono para Samsung Galaxy Note 10', 20.00, 'https://www.tecnophonia.com/30042/micr%C3%B3fono-samsung-galaxy-note-10-n970f-note-10-plus-n975f-s10e-g970-s10-g973-s10-g975-s20-g980.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (10, 'Carcasa Trasera para Huawei P30', 35.00, 'https://m.media-amazon.com/images/I/61L4-v2CKBL._AC_SL1000_.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (11, 'Conector de Carga para iPhone 11', 18.00, 'https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/3662427746816_1.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (12, 'Auricular para OnePlus 8', 22.00, 'https://ae01.alicdn.com/kf/Hb8ea66911c174fb2b74618cbf1bc8467H.jpg_640x640Q90.jpg_.webp');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (13, 'Batería para Motorola Moto G7', 28.00, 'https://www.tabletpc.ec/4183-large_default/bateria-motorola-g20-jk50.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (14, 'Flex Cable para Xiaomi Mi 9', 12.00, 'https://m.media-amazon.com/images/I/51dB8VMeqfL._AC_UF894,1000_QL80_.jpg');
INSERT INTO repuesto (id, nombre, precio, imagen) VALUES (15, 'Sensor de Huella para Samsung Galaxy A50', 25.00, 'https://www.movilstore.com/cdn/shop/products/SPA0137.jpg?v=1659854597');


CREATE TABLE clientes (
    cliente_id INT NOT NULL AUTO_INCREMENT,
    id_user int default null,
    nombre varchar(50) NOT NULL,
    identificacion varchar(10) NOT NULL,
    apellido varchar(50) NOT NULL,
    telefono varchar(20),
    email varchar(50),
    direccion varchar(180)NOT NULL,
     PRIMARY KEY (cliente_id),
     FOREIGN KEY (id_user) REFERENCES TB_USERS(id_user)
);
select * from clientes;
select * from TB_USERS;


INSERT INTO clientes ( nombre, identificacion, apellido, telefono, email, direccion)
VALUES (  
        'Mariana ',
        '1234557890',
        'Gonzales',
        '04128905',
        'mar@gmail.com',
        '123 Main St');
INSERT INTO clientes (nombre, identificacion, apellido, telefono, email, direccion)
VALUES ('mi',
        '3456789012',
        'Sanch',
        '02453210',
        'user2@gmail.com',
        '456 Elm St');



CREATE TABLE orden_trabajo (
    orden_trabajo_id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT,
    tecnico_id INT,
    tipo_dispositivo varchar(75),
    marca varchar(100),
    modelo varchar(100),
	serial varchar(100),
	observacion varchar(200),
	falla_equipo text,
	reparacion text,
    fecha_orden varchar(20),
    abono decimal(8.4),
    presupuesto decimal(8.4),
    fecha_entrega varchar(20),
    estado VARCHAR(50),
    total DECIMAL(10, 2),
FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)

);

