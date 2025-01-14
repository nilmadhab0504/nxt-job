"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
// src/mysqlService.ts
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const query = async (query, params = []) => {
    console.log("request come");
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(query, params);
        return rows;
    }
    catch (error) {
        throw new Error(`Database query failed: ${error.message}`);
    }
    finally {
        connection.release();
    }
};
exports.query = query;
