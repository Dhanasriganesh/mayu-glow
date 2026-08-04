import Order from '../models/Order.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, total } = req.body;
    if (!items || !items.length || total === undefined) {
      return res.status(400).json({ error: 'Items and total price are required' });
    }

    const orderData = {
      userId: req.user.uid,
      items,
      total
    };

    const newOrder = await Order.create(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.getByUserId(req.user.uid);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updatedOrder = await Order.updateStatus(id, status);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
