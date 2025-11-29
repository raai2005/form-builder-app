import express from 'express';
import {
  createForm,
  getUserForms,
  getForm,
  updateForm,
  deleteForm,
  incrementViews,
  formValidation,
} from '../controllers/formController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// @route   POST /api/forms
// @desc    Create new form
// @access  Private
router.post('/', formValidation, createForm);

// @route   GET /api/forms
// @desc    Get all forms for user
// @access  Private
router.get('/', getUserForms);

// @route   GET /api/forms/:id
// @desc    Get single form
// @access  Private
router.get('/:id', getForm);

// @route   PUT /api/forms/:id
// @desc    Update form
// @access  Private
router.put('/:id', formValidation, updateForm);

// @route   DELETE /api/forms/:id
// @desc    Delete form
// @access  Private
router.delete('/:id', deleteForm);

// @route   POST /api/forms/:id/views
// @desc    Increment form views
// @access  Private
router.post('/:id/views', incrementViews);

export default router;
