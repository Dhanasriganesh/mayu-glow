import Product from '../models/Product.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const tempId = `prod_${Date.now()}`;
    const imageUrls = [];

    // Handle uploaded file buffers via multer memory storage
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const publicUrl = await Product.uploadImageBuffer(
          tempId,
          file.buffer,
          file.mimetype,
          file.originalname
        );
        imageUrls.push(publicUrl);
      }
    } else if (req.file) {
      const publicUrl = await Product.uploadImageBuffer(
        tempId,
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname
      );
      imageUrls.push(publicUrl);
    }

    // If client passed raw imageUrls array in body
    if (req.body.imageUrls) {
      const bodyUrls = typeof req.body.imageUrls === 'string' ? JSON.parse(req.body.imageUrls) : req.body.imageUrls;
      if (Array.isArray(bodyUrls)) imageUrls.push(...bodyUrls);
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrls
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const existingProduct = await Product.getById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const imageUrls = [...(existingProduct.imageUrls || [])];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const publicUrl = await Product.uploadImageBuffer(
          id,
          file.buffer,
          file.mimetype,
          file.originalname
        );
        imageUrls.push(publicUrl);
      }
    } else if (req.file) {
      const publicUrl = await Product.uploadImageBuffer(
        id,
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname
      );
      imageUrls.push(publicUrl);
    }

    if (req.body.imageUrls) {
      const bodyUrls = typeof req.body.imageUrls === 'string' ? JSON.parse(req.body.imageUrls) : req.body.imageUrls;
      if (Array.isArray(bodyUrls)) {
        imageUrls.length = 0;
        imageUrls.push(...bodyUrls);
      }
    }

    const updatedProduct = await Product.update(id, {
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrls
    });

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.delete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
