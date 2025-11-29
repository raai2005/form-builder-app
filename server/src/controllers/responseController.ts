import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import ResponseModel from '../models/Response';
import Form from '../models/Form';
import { AuthRequest } from '../middleware/auth';

// Validation rules
export const responseValidation = [
  body('data').isObject().withMessage('Response data must be an object'),
];

// Submit form response (public endpoint)
export const submitResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { formId } = req.params;
    const { data } = req.body;

    // Check if form exists and is active
    const form = await Form.findById(formId);
    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    if (form.status !== 'active') {
      res.status(400).json({ message: 'This form is not accepting responses' });
      return;
    }

    // Create response
    const response = new ResponseModel({
      formId,
      data,
      ipAddress: req.ip,
    });

    await response.save();

    // Increment response count on form
    await Form.findByIdAndUpdate(formId, { $inc: { responseCount: 1 } });

    res.status(201).json({
      message: 'Response submitted successfully',
      responseId: response._id,
    });
  } catch (error) {
    console.error('Submit response error:', error);
    res.status(500).json({ message: 'Server error while submitting response' });
  }
};

// Get all responses for a form (protected)
export const getFormResponses = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { formId } = req.params;

    // Verify form belongs to user
    const form = await Form.findOne({ _id: formId, userId: req.userId });
    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    const responses = await ResponseModel.find({ formId }).sort({ submittedAt: -1 });

    res.json({
      responses,
      total: responses.length,
    });
  } catch (error) {
    console.error('Get responses error:', error);
    res.status(500).json({ message: 'Server error while fetching responses' });
  }
};

// Get single response (protected)
export const getResponse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const response = await ResponseModel.findById(id).populate('formId');
    if (!response) {
      res.status(404).json({ message: 'Response not found' });
      return;
    }

    // Verify form belongs to user
    const form = await Form.findOne({ _id: response.formId, userId: req.userId });
    if (!form) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    res.json({ response });
  } catch (error) {
    console.error('Get response error:', error);
    res.status(500).json({ message: 'Server error while fetching response' });
  }
};

// Delete response (protected)
export const deleteResponse = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const response = await ResponseModel.findById(id);
    if (!response) {
      res.status(404).json({ message: 'Response not found' });
      return;
    }

    // Verify form belongs to user
    const form = await Form.findOne({ _id: response.formId, userId: req.userId });
    if (!form) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    await ResponseModel.findByIdAndDelete(id);

    // Decrement response count
    await Form.findByIdAndUpdate(response.formId, { $inc: { responseCount: -1 } });

    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    console.error('Delete response error:', error);
    res.status(500).json({ message: 'Server error while deleting response' });
  }
};
