//import { createPool } from "mysql2/promise";
import mysql from 'mysql2/promise';
import { HOST_DB, USER_DB, PASSWORD_DB, DATABASE, PORT_DB } from '../config/config.js';

export const connectToDatabase = () => {
  return mysql.createPool({
    host: HOST_DB,
    user: USER_DB,
    password: PASSWORD_DB,
    database: DATABASE,
    port: PORT_DB,
  });
};



/*export const db_pool_connection = createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'Lissette05',
        database: 'dawa',
        port: 3306
    }
);*/

