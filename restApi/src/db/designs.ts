import mongoose, { Schema, Document } from 'mongoose';
import express, { Request, Response } from 'express';
import ShirtDesign, { IShirtDesign } from '../models/ShirtDesign';
const router = express.Router();

// GET all shirt designs
router.get('/', async (req: Request, res: Response) => {
  try {
    const designs = await ShirtDesign.find();
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a specific shirt design by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const design = await ShirtDesign.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ message: 'Shirt design not found' });
    }
    res.json(design);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new shirt design
router.post('/', async (req: Request, res: Response) => {
  try {
    const newDesign = new ShirtDesign(req.body);
    const savedDesign = await newDesign.save();
    res.status(201).json(savedDesign);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a shirt design by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedDesign = await ShirtDesign.findByIdAndDelete(req.params.id);
    if (!deletedDesign) {
      return res.status(404).json({ message: 'Shirt design not found' });
    }
    res.json({ message: 'Shirt design deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT (replace) a shirt design by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDesign = await ShirtDesign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDesign) {
      return res.status(404).json({ message: 'Shirt design not found' });
    }
    res.json(updatedDesign);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH (update) a shirt design by ID
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDesign = await ShirtDesign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDesign) {
      return res.status(404).json({ message: 'Shirt design not found' });
    }
    res.json(updatedDesign);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
// Define the interface for the shirt design document
interface IShirtDesign extends Document {
  user: string;
  name: string;
  image: string;
  description: string;
  prompt: string;
  comments: string[];
}

// Define the Mongoose schema for the shirt design
const ShirtDesignSchema: Schema = new Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  prompt: { type: String, required: true },
  comments: { type: [String], default: [] },
});

// Create and export the Mongoose model for the shirt design
export default mongoose.model<IShirtDesign>('ShirtDesign', ShirtDesignSchema);
