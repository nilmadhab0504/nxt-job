// src/controllers/jobController.ts

import { Request, Response } from 'express';
import Job from '../models/Jobs';

class JobController {
  async createJob(req: Request, res: Response) {
    try {
      const { title, company, location, salary, description } = req.body;
      const job = new Job({ title, company, location, salary, description });
      await job.save();
      res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
      res.status(500).json({ message: 'Error creating job', error });
    }
  }

  async getAllJobs(_req: Request, res: Response) {
    try {
      const jobs = await Job.findAll();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching jobs', error });
    }
  }

  async getJobById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const job = await Job.findById(id);
      if (job) {
        res.json(job);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error finding job', error });
    }
  }

  async updateJob(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, company, location, salary, description } = req.body;
      const job = await Job.findById(id);
      if (job) {
        job.title = title;
        job.company = company;
        job.location = location;
        job.salary = salary;
        job.description = description;
        await job.save();
        res.json({ message: 'Job updated successfully', job });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating job', error });
    }
  }

  async deleteJob(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const job = await Job.findById(id);
      if (job) {
        await Job.deleteById(id);
        res.json({ message: 'Job deleted successfully' });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting job', error });
    }
  }
}

export default new JobController();
