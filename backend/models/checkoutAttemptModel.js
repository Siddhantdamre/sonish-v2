import mongoose from 'mongoose';

const checkoutAttemptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    email: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        name: { type: String, required: true },
        image: { type: String, default: '' },
        price: { type: Number, default: 0 },
        qty: { type: Number, default: 1 },
        size: { type: String, default: '' },
      },
    ],
    shippingAddress: {
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      postalCode: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    itemsPrice: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      default: 'Razorpay',
    },
    status: {
      type: String,
      enum: ['initiated', 'dismissed', 'failed', 'completed'],
      default: 'initiated',
    },
    failureReason: {
      type: String,
      default: '',
    },
    razorpayOrderId: {
      type: String,
      default: '',
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

checkoutAttemptSchema.index({ status: 1, updatedAt: -1 });

const CheckoutAttempt = mongoose.model('CheckoutAttempt', checkoutAttemptSchema);

export default CheckoutAttempt;
