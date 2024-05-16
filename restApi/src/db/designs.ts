import mongoose, { Schema, Document } from 'mongoose';
import express, { Request, Response } from 'express';

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
