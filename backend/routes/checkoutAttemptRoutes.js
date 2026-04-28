import express from 'express';
import {
  createCheckoutAttempt,
  updateCheckoutAttempt,
  getAdminCheckoutAttempts,
} from '../controllers/checkoutAttemptController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createCheckoutAttempt);
router.route('/admin').get(protect, admin, getAdminCheckoutAttempts);
router.route('/:id').put(protect, updateCheckoutAttempt);

export default router;
