import express from 'express';
import ShirtDesign from '../db/designs';
import Comment from '../db/comments'; // Подключение модели комментариев
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  // Получение всех комментариев для конкретного дизайна
  router.get('/comments/:designId', async (req, res) => {
    try {
      const comments = await Comment.find({ design: req.params.designId });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Создание нового комментария
  router.post('/comments', async (req, res) => {
    try {
      const { design, text, user } = req.body;

      const newComment = new Comment({ design, user, text });
      const savedComment = await newComment.save();

      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Другие маршруты
};
