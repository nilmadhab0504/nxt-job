// src/routes/jobRoutes.ts

import express from 'express';
import JobController from '../controllers/JobControllers';

const router = express.Router();

router.post('/', JobController.createJob);
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getJobById);
router.put('/:id', JobController.updateJob);
router.delete('/:id', JobController.deleteJob);

export default router;
