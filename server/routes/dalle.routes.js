import express from 'express';

import * as dotenv from 'dotenv';
import Replicate from 'replicate';
import axios from 'axios';
dotenv.config();

const router = express.Router();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello World Routes' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const model =
      'lucataco/sdxl:c86579ac5193bf45422f1c8b92742135aa859b1850a8e4c531bff222fc75273d';
    const input = {
      prompt,
      width: 384,
      height: 384,
    };
    const output = await replicate.run(model, { input });
    convertImageToBase64(output[0])
      .then((base64Json) => {
        res.status(200).json({ photo: base64Json });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
async function convertImageToBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    return base64Image;
  } catch (error) {
    console.error('Error converting image to Base64:', error.message);
    return null;
  }
}

export default router;
