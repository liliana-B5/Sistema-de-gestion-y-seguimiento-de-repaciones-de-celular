import { config } from "dotenv";
import { application } from "express";

config();
export const PORT = process.env.PORT;
export const HOST_DB = process.env.DB_HOST;
export const USER_DB = process.env.DB_USER;
export const PASSWORD_DB = process.env.DB_PASSWORD;
export const DATABASE = process.env.DATABASE;
export const PORT_DB = process.env.PORT_DB || 3306;



export const config_core = {
    application: {
        cors: {
            server: [{
                origin: "localhost:3200", 
                credentials: true
            }]
        }
    }

}