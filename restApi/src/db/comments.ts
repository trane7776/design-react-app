import mongoose, { Schema, Document } from 'mongoose';

// Интерфейс для документа комментария
interface IComment extends Document {
  design: string;
  user: string;
  text: string;
  createdAt: Date;
}

// Схема Mongoose для комментария
const CommentSchema: Schema = new Schema({
  design: { type: Schema.Types.ObjectId, ref: 'ShirtDesign', required: true },
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Экспорт модели комментария
export default mongoose.model<IComment>('Comment', CommentSchema);
