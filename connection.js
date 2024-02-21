import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

const configuration = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
};


const pool = mysql.createPool(configuration);

export async function query(sql, params) {
  try {
    const conn = await pool.getConnection();
    const result = await conn.execute(sql, params);
    conn.release();
    return result;
  } catch (error) {
    throw error; 
  }
}