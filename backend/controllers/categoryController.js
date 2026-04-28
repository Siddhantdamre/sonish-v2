import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import {
  PUBLIC_CACHE_KEYS,
  PUBLIC_CACHE_TTLS,
  invalidatePublicCache,
  setPublicCacheHeaders,
  withPublicCache,
} from '../utils/publicCache.js';

const buildCategoryCountMap = async () => {
  const counts = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);

  return counts.reduce((accumulator, entry) => {
    accumulator[entry._id] = entry.count;
    return accumulator;
  }, {});
};

// @desc    Get all active categories (public)
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  setPublicCacheHeaders(res, {
    browserSeconds: 300,
    edgeSeconds: 600,
    staleSeconds: 900,
  });

  const categoriesWithCount = await withPublicCache(
    PUBLIC_CACHE_KEYS.categories,
    PUBLIC_CACHE_TTLS.categories,
    async () => {
      const [categories, countMap] = await Promise.all([
        Category.find({ isActive: true }).sort({ order: 1 }).lean(),
        buildCategoryCountMap(),
      ]);

      return categories.map((category) => ({
        ...category,
        productCount: countMap[category.name] || 0,
      }));
    },
  );

  res.json(categoriesWithCount);
});

// @desc    Get all categories (admin)
// @route   GET /api/categories/admin
// @access  Private/Admin
const getAdminCategories = asyncHandler(async (req, res) => {
  const [categories, countMap] = await Promise.all([
    Category.find({}).sort({ order: 1 }).lean(),
    buildCategoryCountMap(),
  ]);

  const categoriesWithCount = categories.map((category) => ({
    ...category,
    productCount: countMap[category.name] || 0,
  }));

  res.json(categoriesWithCount);
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image, order, fontFamily } = req.body;

  const exists = await Category.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
  if (exists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({
    name,
    description: description || '',
    image: image || '',
    fontFamily: fontFamily || '',
    order: order || 0,
    parent: req.body.parent || '',
    isComingSoon: req.body.isComingSoon || false,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
  });

  invalidatePublicCache(PUBLIC_CACHE_KEYS.categories);
  res.status(201).json(category);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    const { name, description, image, fontFamily, isActive, order, parent, isComingSoon } = req.body;
    category.name = name !== undefined ? name : category.name;
    category.description = description !== undefined ? description : category.description;
    category.image = image !== undefined ? image : category.image;
    category.fontFamily = fontFamily !== undefined ? fontFamily : category.fontFamily;
    category.isActive = isActive !== undefined ? isActive : category.isActive;
    category.order = order !== undefined ? order : category.order;
    category.parent = parent !== undefined ? parent : category.parent;
    category.isComingSoon = isComingSoon !== undefined ? isComingSoon : category.isComingSoon;

    const updated = await category.save();
    invalidatePublicCache(PUBLIC_CACHE_KEYS.categories);
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.deleteOne();
    invalidatePublicCache(PUBLIC_CACHE_KEYS.categories);
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export { getCategories, getAdminCategories, createCategory, updateCategory, deleteCategory };
