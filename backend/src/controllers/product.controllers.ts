import { Request, Response } from 'express';
import mongoose from 'mongoose';
import productModel from '../models/product.model';

export const getAllProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await productModel.find().populate('category_id');
    res.status(200).json({ success: true, result });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error product up: ${error.message}`);
    } else {
      console.error('Error product up:', error);
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const insertProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category_id, image_url, brand_id, status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      res.status(400).json({ message: 'Invalid category_id' });
      return;
    }

    const newProduct = new productModel({
      name,
      description,
      price,
      category_id,
      image_url,
      brand_id,
      status
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};
