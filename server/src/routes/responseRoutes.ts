import express from 'express';
import {
  submitResponse,
  getFormResponses,
  getResponse,
  deleteResponse,
  responseValidation,
} from '../controllers/responseController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/responses/:formId
// @desc    Submit form response
// @access  Public
router.post('/:formId', responseValidation, submitResponse);

// Protected routes
router.use(authMiddleware);

// @route   GET /api/responses/form/:formId
// @desc    Get all responses for a form
// @access  Private
router.get('/form/:formId', getFormResponses);

// @route   GET /api/responses/:id
// @desc    Get single response
// @access  Private
router.get('/:id', getResponse);

// @route   DELETE /api/responses/:id
// @desc    Delete response
// @access  Private
router.delete('/:id', deleteResponse);

export default router;
