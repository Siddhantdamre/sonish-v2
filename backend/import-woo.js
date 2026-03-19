import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import User from './models/userModel.js';

dotenv.config();

const importData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is missing');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      console.error('No admin user found. Please run regular seeder first.');
      process.exit(1);
    }

    console.log('Fetching live products from sonish.co.in...');
    const res = await fetch('https://sonish.co.in/wp-json/wc/store/products?per_page=100');
    if (!res.ok) {
       throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const wooProducts = await res.json();

    console.log(`Found ${wooProducts.length} products. Clearing existing DB products...`);
    await Product.deleteMany();

    const newProducts = wooProducts.map(wp => {
      const priceString = wp.prices?.price || '0';
      // Price is in minor units (e.g. 71900 = 719.00)
      const price = parseFloat(priceString) / 100;
      
      return {
        user: adminUser._id,
        name: wp.name || 'Unnamed Product',
        image: wp.images && wp.images.length > 0 ? wp.images[0].src : '/images/sample.jpg',
        brand: 'Sonish Collection',
        category: wp.categories && wp.categories.length > 0 ? wp.categories[0].name : 'Fashion',
        description: wp.description || 'No description available',
        price: price,
        countInStock: wp.is_in_stock ? 50 : 0,
        rating: 5, // Defaulting active imports to 5 star baseline visually
        numReviews: wp.review_count || 1
      };
    });

    await Product.insertMany(newProducts);
    console.log(`✅ ${newProducts.length} Products successfully migrated from WooCommerce to MongoDB!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
