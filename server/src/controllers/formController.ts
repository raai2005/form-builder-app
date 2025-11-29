import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import Form from '../models/Form';
import ResponseModel from '../models/Response';
import { AuthRequest } from '../middleware/auth';

// Validation rules
export const formValidation = [
  body('title').trim().notEmpty().withMessage('Form title is required'),
  body('description').optional().trim(),
  body('fields').isArray().withMessage('Fields must be an array'),
  body('status')
    .optional()
    .isIn(['active', 'draft', 'archived'])
    .withMessage('Invalid status'),
];

// Create new form
export const createForm = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { title, description, fields, status } = req.body;

    const form = new Form({
      userId: req.userId,
      title,
      description,
      fields: fields || [],
      status: status || 'draft',
    });

    await form.save();

    res.status(201).json({
      message: 'Form created successfully',
      form,
    });
  } catch (error) {
    console.error('Create form error:', error);
    res.status(500).json({ message: 'Server error while creating form' });
  }
};

// Get all forms for user
export const getUserForms = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const query: any = { userId: req.userId };

    if (status && status !== 'all') {
      query.status = status;
    }

    const forms = await Form.find(query).sort({ updatedAt: -1 });

    // Calculate stats
    const stats = {
      totalForms: await Form.countDocuments({ userId: req.userId }),
      totalResponses: await ResponseModel.countDocuments({
        formId: { $in: forms.map((f) => f._id) },
      }),
      activeForms: await Form.countDocuments({ userId: req.userId, status: 'active' }),
      totalViews: forms.reduce((sum, form) => sum + form.views, 0),
    };

    res.json({ forms, stats });
  } catch (error) {
    console.error('Get forms error:', error);
    res.status(500).json({ message: 'Server error while fetching forms' });
  }
};

// Get single form
export const getForm = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const form = await Form.findOne({ _id: id, userId: req.userId });

    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    res.json({ form });
  } catch (error) {
    console.error('Get form error:', error);
    res.status(500).json({ message: 'Server error while fetching form' });
  }
};

// Update form
export const updateForm = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const { title, description, fields, status } = req.body;

    const form = await Form.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description, fields, status },
      { new: true, runValidators: true }
    );

    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    res.json({
      message: 'Form updated successfully',
      form,
    });
  } catch (error) {
    console.error('Update form error:', error);
    res.status(500).json({ message: 'Server error while updating form' });
  }
};

// Delete form
export const deleteForm = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const form = await Form.findOneAndDelete({ _id: id, userId: req.userId });

    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    // Also delete all responses for this form
    await ResponseModel.deleteMany({ formId: id });

    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Delete form error:', error);
    res.status(500).json({ message: 'Server error while deleting form' });
  }
};

// Increment form views
export const incrementViews = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const form = await Form.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    res.json({ views: form.views });
  } catch (error) {
    console.error('Increment views error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
