"use strict";
// src/controllers/jobController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jobs_1 = __importDefault(require("../models/Jobs"));
class JobController {
    async createJob(req, res) {
        try {
            const { title, company, location, salary, description } = req.body;
            const job = new Jobs_1.default({ title, company, location, salary, description });
            await job.save();
            res.status(201).json({ message: 'Job created successfully', job });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating job', error });
        }
    }
    async getAllJobs(_req, res) {
        try {
            const jobs = await Jobs_1.default.findAll();
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching jobs', error });
        }
    }
    async getJobById(req, res) {
        try {
            const { id } = req.params;
            const job = await Jobs_1.default.findById(id);
            if (job) {
                res.json(job);
            }
            else {
                res.status(404).json({ message: 'Job not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error finding job', error });
        }
    }
    async updateJob(req, res) {
        try {
            const { id } = req.params;
            const { title, company, location, salary, description } = req.body;
            const job = await Jobs_1.default.findById(id);
            if (job) {
                job.title = title;
                job.company = company;
                job.location = location;
                job.salary = salary;
                job.description = description;
                await job.save();
                res.json({ message: 'Job updated successfully', job });
            }
            else {
                res.status(404).json({ message: 'Job not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating job', error });
        }
    }
    async deleteJob(req, res) {
        try {
            const { id } = req.params;
            const job = await Jobs_1.default.findById(id);
            if (job) {
                await Jobs_1.default.deleteById(id);
                res.json({ message: 'Job deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Job not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting job', error });
        }
    }
}
exports.default = new JobController();
