// src/mysqlService.ts
import mysql, { RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const query = async (query: string, params: any = []): Promise<RowDataPacket[]> => {
    console.log("request come");
    const connection = await pool.getConnection();
    try {
        const [rows]: [RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query, params);
        return rows;
    } catch (error: any) {
        throw new Error(`Database query failed: ${error.message}`);
    } finally {
        connection.release();
    }
};
