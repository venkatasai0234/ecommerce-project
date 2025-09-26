const express = require("express");
const Order = require("../models/order");

const router = express.Router();

// Place an order
router.post("/", async (req, res) => {
  try {
    const { user, products, total } = req.body;

    const newOrder = new Order({
      user,
      products,
      total,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
