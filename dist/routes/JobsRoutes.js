"use strict";
// src/routes/jobRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JobControllers_1 = __importDefault(require("../controllers/JobControllers"));
const router = express_1.default.Router();
router.post('/', JobControllers_1.default.createJob);
router.get('/', JobControllers_1.default.getAllJobs);
router.get('/:id', JobControllers_1.default.getJobById);
router.put('/:id', JobControllers_1.default.updateJob);
router.delete('/:id', JobControllers_1.default.deleteJob);
exports.default = router;
