import express from 'express';
import { processCommand } from '../controllers/assistantController.js';

const router = express.Router();

router.route('/').post(processCommand);

export default router;
