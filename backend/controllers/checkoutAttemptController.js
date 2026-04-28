import asyncHandler from 'express-async-handler';
import CheckoutAttempt from '../models/checkoutAttemptModel.js';

const normalizeCartItems = (cartItems = []) =>
  Array.isArray(cartItems)
    ? cartItems.map((item) => ({
        product: item.product || item._id,
        name: item.name || 'Untitled Product',
        image: item.image || '',
        price: Number(item.price) || 0,
        qty: Number(item.qty || item.cartQuantity || 1) || 1,
        size: item.selectedSize || item.size || '',
      }))
    : [];

// @desc    Create a checkout attempt
// @route   POST /api/checkout-attempts
// @access  Private
const createCheckoutAttempt = asyncHandler(async (req, res) => {
  const checkoutAttempt = await CheckoutAttempt.create({
    user: req.user._id,
    email: req.body.email || req.user.email || '',
    name: req.body.name || req.user.name || '',
    cartItems: normalizeCartItems(req.body.cartItems),
    shippingAddress: req.body.shippingAddress || {},
    itemsPrice: Number(req.body.itemsPrice) || 0,
    discountPrice: Number(req.body.discountPrice) || 0,
    totalPrice: Number(req.body.totalPrice) || 0,
    paymentMethod: req.body.paymentMethod || 'Razorpay',
    status: 'initiated',
    razorpayOrderId: req.body.razorpayOrderId || '',
  });

  res.status(201).json(checkoutAttempt);
});

// @desc    Update a checkout attempt
// @route   PUT /api/checkout-attempts/:id
// @access  Private
const updateCheckoutAttempt = asyncHandler(async (req, res) => {
  const checkoutAttempt = await CheckoutAttempt.findById(req.params.id);

  if (!checkoutAttempt) {
    res.status(404);
    throw new Error('Checkout attempt not found');
  }

  const isOwner = checkoutAttempt.user.toString() === req.user._id.toString();
  if (!isOwner && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized to update this checkout attempt');
  }

  if (req.body.status !== undefined) {
    checkoutAttempt.status = req.body.status;
  }

  if (req.body.failureReason !== undefined) {
    checkoutAttempt.failureReason = req.body.failureReason;
  }

  if (req.body.razorpayOrderId !== undefined) {
    checkoutAttempt.razorpayOrderId = req.body.razorpayOrderId;
  }

  const updated = await checkoutAttempt.save();
  res.json(updated);
});

// @desc    Get all checkout attempts for admin
// @route   GET /api/checkout-attempts/admin
// @access  Private/Admin
const getAdminCheckoutAttempts = asyncHandler(async (_req, res) => {
  const attempts = await CheckoutAttempt.find({})
    .populate('user', 'name email createdAt shippingAddress')
    .populate('order', '_id createdAt')
    .sort({ updatedAt: -1 });

  res.json(attempts);
});

export {
  createCheckoutAttempt,
  updateCheckoutAttempt,
  getAdminCheckoutAttempts,
};
