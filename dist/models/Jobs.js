"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mySqlService_1 = require("../services/mySqlService");
const crypto_1 = require("crypto");
class Job {
    constructor(attributes) {
        this.id = attributes.id;
        this.title = attributes.title;
        this.company = attributes.company;
        this.location = attributes.location;
        this.salary = attributes.salary;
        this.description = attributes.description;
    }
    static async checkTableExistence() {
        const result = await (0, mySqlService_1.query)("SHOW TABLES LIKE 'jobs'");
        if (result.length === 0) {
            await (0, mySqlService_1.query)(`CREATE TABLE jobs (
                    id VARCHAR(8) PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    company VARCHAR(255) NOT NULL,
                    location VARCHAR(255) NOT NULL,
                    salary VARCHAR(50) NOT NULL,
                    description TEXT NOT NULL,
                    createdAt DATETIME NOT NULL,
                    updatedAt DATETIME NOT NULL
                )`);
        }
    }
    async save() {
        await Job.checkTableExistence();
        const now = new Date();
        try {
            if (this.id) {
                await (0, mySqlService_1.query)('UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ?, updatedAt = ? WHERE id = ?', [
                    this.title,
                    this.company,
                    this.location,
                    this.salary,
                    this.description,
                    now,
                    this.id,
                ]);
            }
            else {
                this.id = (0, crypto_1.randomBytes)(4).toString('hex');
                await (0, mySqlService_1.query)('INSERT INTO jobs (id, title, company, location, salary, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                    this.id,
                    this.title,
                    this.company,
                    this.location,
                    this.salary,
                    this.description,
                    now,
                    now,
                ]);
            }
        }
        catch (error) {
            console.error('Error saving job:', error);
            throw new Error('Could not save job');
        }
    }
    static async findAll() {
        try {
            const rows = await (0, mySqlService_1.query)('SELECT * FROM jobs');
            return rows.map((row) => new Job(row));
        }
        catch (error) {
            console.error('Error finding all jobs:', error);
            throw new Error('Could not find jobs');
        }
    }
    static async findById(id) {
        try {
            const rows = await (0, mySqlService_1.query)('SELECT * FROM jobs WHERE id = ?', [id]);
            if (rows.length > 0) {
                return new Job(rows[0]);
            }
            return null;
        }
        catch (error) {
            console.error('Error finding job:', error);
            throw new Error('Could not find job');
        }
    }
    static async deleteById(id) {
        try {
            await (0, mySqlService_1.query)('DELETE FROM jobs WHERE id = ?', [id]);
        }
        catch (error) {
            console.error('Error deleting job:', error);
            throw new Error('Could not delete job');
        }
    }
}
exports.default = Job;
