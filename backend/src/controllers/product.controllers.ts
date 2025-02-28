import { Request, Response } from 'express';
import mongoose from 'mongoose';
import productModel from '../models/product.model';
import { ProductStatus, ProductStatusMapping } from '../enums/product.enum';
import categoryModel from '../models/category.model';

export const getAllProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await productModel.find().populate('category_id').populate('brand_id');
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

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id).populate('category_id');
    if (!product) {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      return;
    }
    res.status(200).json({ message: 'Lấy sản phẩm thành công', product });
  } catch (error) {
    res.status(500).json({ message: 'Error getting product', error });
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
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(id, 'ID');
    const { name, description, price, category_id, image_url, brand_id, status } = req.body;

    if (!name || !description || !price || !category_id || !image_url || !brand_id || !status) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ các trường của sản phẩm'
      });
      return;
    }
    if (!Object.values(ProductStatus).includes(status as ProductStatus)) {
      res.status(400).json({ success: false, message: 'Trạng thái sản phẩm không hợp lệ' });
      return;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, description, price, category_id, image_url, brand_id, status },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      return;
    }

    res.status(200).json({ message: 'Cập nhật sản phẩm thành công', product: updatedProduct });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error product up: ${error.message}`);
    } else {
      console.error('Error product up:', error);
    }
  }
};
export const toggleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    console.log('ID Product:', id);
    console.log('Status Product:', status);

    if (!id) {
      res.status(400).json({ message: 'Vui lòng cung cấp ID sản phẩm' });
      return;
    }

    if (!status || typeof status !== 'string' || !(status.toUpperCase() in ProductStatusMapping)) {
      res.status(400).json({ message: 'Trạng thái sản phẩm không hợp lệ' });
      return;
    }

    const mappedStatus = ProductStatusMapping[status as keyof typeof ProductStatusMapping];

    const product = await productModel.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      return;
    }

    product.status = mappedStatus;
    await product.save();

    res.status(200).json({
      message: `Trạng thái sản phẩm đã được cập nhật thành công: ${mappedStatus}`,
      product
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái sản phẩm', error });
  }
};

export const getNewProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await productModel
      .find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate('category_id')
      .populate('brand_id');

    if (!result || result.length === 0) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm mới' });
      return;
    }
    res.status(200).json({ success: true, message: 'Lấy sản phẩm mới thành công', products: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi lấy sản phẩm mới', error });
  }
};

export const getSaleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await productModel
      .find({ discount: { $gt: 0 } })
      .populate('category_id')
      .populate('brand_id')
      .limit(10);
    if (!result || result.length === 0) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm giảm giá' });
      return;
    }
    res.status(200).json({ success: true, message: 'Lấy sản phẩm giảm giá thành công', products: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi lấy sản phẩm giảm giá', error });
  }
};

export const getHotProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await productModel
      .find()
      .sort({ quantity_sold: -1 })
      .limit(10)
      .populate('category_id')
      .populate('brand_id');

    if (!result || result.length === 0) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm bán chạy' });
      return;
    }
    res.status(200).json({ success: true, message: 'Lấy sản phẩm bán chạy thành công', products: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi lấy sản phẩm bán chạy', error });
  }
};

// Lấy sản phẩm dành cho chó
export const getDogProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Tìm category có category_name là "Chó"
    const dogCategory = await categoryModel.findOne({ category_name: 'Chó' });
    if (!dogCategory) {
      res.status(404).json({ success: false, message: 'Không tìm thấy danh mục sản phẩm cho chó' });
      return;
    }

    // Tìm tất cả sản phẩm có category_id trùng với id của category Chó
    const result = await productModel
      .find({ category_id: dogCategory._id })
      .limit(8)
      .populate('category_id')
      .populate('brand_id');

    if (!result || result.length === 0) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm dành cho chó' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Lấy sản phẩm dành cho chó thành công',
      products: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy sản phẩm dành cho chó',
      error
    });
  }
};

// Lấy sản phẩm dành cho mèo
export const getCatProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Tìm category có category_name là "Mèo"
    const catCategory = await categoryModel.findOne({ category_name: 'Mèo' });
    if (!catCategory) {
      res.status(404).json({ success: false, message: 'Không tìm thấy danh mục sản phẩm cho mèo' });
      return;
    }

    // Tìm tất cả sản phẩm có category_id trùng với id của category Mèo
    const result = await productModel
      .find({ category_id: catCategory._id })
      .limit(8)
      .populate('category_id')
      .populate('brand_id');

    if (!result || result.length === 0) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm dành cho mèo' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Lấy sản phẩm dành cho mèo thành công',
      products: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy sản phẩm dành cho mèo',
      error
    });
  }
};
