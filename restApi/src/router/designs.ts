import express from 'express';
import ShirtDesign from '../db/designs';
import { isAuthenticated } from '../middlewares';
import { getUserById } from '../db/users';
export default (router: express.Router) => {
  // GET all shirt designs
  router.get('/design', async (req: express.Request, res: express.Response) => {
    try {
      const designs = await ShirtDesign.find();
      res.json(designs);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // GET a specific shirt design by ID
  router.get(
    '/design/:id',
    async (req: express.Request, res: express.Response) => {
      try {
        const design = await ShirtDesign.findById(req.params.id);
        if (!design) {
          return res.status(404).json({ message: 'Shirt design not found' });
        }
        res.json(design);
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
    }
  );
  // GET all shirt designs for a specific user
  router.get('/user-designs', async (req, res) => {
    try {
      const { user } = req.query;
      const designs = await ShirtDesign.find({ user });
      res.json(designs);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // DELETE a shirt design by ID
  router.delete('/design/:id', async (req, res) => {
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
  // POST a new shirt design
  router.post(
    '/design',
    async (req: express.Request, res: express.Response) => {
      try {
        const newDesign = new ShirtDesign(req.body);

        const savedDesign = await newDesign.save();
        res.status(201).json(savedDesign);
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
    }
  );

  // PUT (replace) a shirt design by ID
  router.put(
    '/design/:id',
    isAuthenticated,
    async (req: express.Request, res: express.Response) => {
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
    }
  );

  // PATCH (update) a shirt design by ID
  router.patch(
    '/design/:id',
    isAuthenticated,
    async (req: express.Request, res: express.Response) => {
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
    }
  );
};
