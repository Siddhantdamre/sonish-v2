import Banner from '../models/bannerModel.js';
import asyncHandler from 'express-async-handler';
import {
  PUBLIC_CACHE_KEYS,
  PUBLIC_CACHE_TTLS,
  invalidatePublicCache,
  setPublicCacheHeaders,
  withPublicCache,
} from '../utils/publicCache.js';

const isValidBannerImage = (image) => {
  if (!image || typeof image !== 'string') {
    return false;
  }

  return (
    image.startsWith('https://') ||
    image.startsWith('data:image/') ||
    image.startsWith('/')
  );
};

const isValidOptionalBannerImage = (image) => {
  if (image === undefined || image === null || image === '') {
    return true;
  }

  return isValidBannerImage(image);
};

const getSafeBannerLink = (link) => {
  const trimmedLink = typeof link === 'string' ? link.trim() : '';
  if (!trimmedLink) {
    return '';
  }

  if (trimmedLink.startsWith('/') || /^https?:\/\//i.test(trimmedLink)) {
    return trimmedLink;
  }

  return '/collections';
};

const normalizePublicBanner = (banner) => ({
  ...banner,
  link: getSafeBannerLink(banner.link),
  desktopImage: banner.desktopImage || '',
  desktopObjectPosition: banner.desktopObjectPosition || 'center 10%',
  mobileObjectPosition: banner.mobileObjectPosition || 'center top',
});

// @desc    Get all active banners
// @route   GET /api/banners
// @access  Public
const getBanners = asyncHandler(async (req, res) => {
  setPublicCacheHeaders(res, {
    browserSeconds: 300,
    edgeSeconds: 600,
    staleSeconds: 900,
  });

  const banners = await withPublicCache(
    PUBLIC_CACHE_KEYS.banners,
    PUBLIC_CACHE_TTLS.banners,
    async () => {
      const activeBanners = await Banner.find({ isActive: true }).sort({ order: 1 }).lean();
      return activeBanners
        .filter((banner) => isValidBannerImage(banner.image))
        .slice(0, 2)
        .map(normalizePublicBanner);
    },
  );
  res.json(banners);
});

// @desc    Get all banners (Admin)
// @route   GET /api/banners/admin
// @access  Private/Admin
const getAdminBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({}).sort({ order: 1 }).lean();
  res.json(banners);
});

// @desc    Create a banner
// @route   POST /api/banners
// @access  Private/Admin
const createBanner = asyncHandler(async (req, res) => {
  const {
    image,
    desktopImage,
    title,
    subtitle,
    description,
    link,
    order,
    desktopObjectPosition,
    mobileObjectPosition,
  } = req.body;

  if (!isValidBannerImage(image)) {
    res.status(400);
    throw new Error('Invalid image format. Must be an HTTPS URL or base64 image data.');
  }

  if (!isValidOptionalBannerImage(desktopImage)) {
    res.status(400);
    throw new Error('Invalid desktop image format. Must be an HTTPS URL or base64 image data.');
  }

  const banner = new Banner({
    image,
    desktopImage: desktopImage || '',
    title: title || '',
    subtitle: subtitle || '',
    description: description || '',
    link: getSafeBannerLink(link),
    desktopObjectPosition: desktopObjectPosition || 'center 10%',
    mobileObjectPosition: mobileObjectPosition || 'center top',
    order: order || 0,
    isActive: true,
  });

  const createdBanner = await banner.save();
  invalidatePublicCache(PUBLIC_CACHE_KEYS.banners);
  res.status(201).json(createdBanner);
});

// @desc    Update a banner
// @route   PUT /api/banners/:id
// @access  Private/Admin
const updateBanner = asyncHandler(async (req, res) => {
  const {
    image,
    desktopImage,
    title,
    subtitle,
    description,
    link,
    isActive,
    order,
    desktopObjectPosition,
    mobileObjectPosition,
  } = req.body;

  if (image !== undefined && !isValidBannerImage(image)) {
    res.status(400);
    throw new Error('Invalid image format. Must be an HTTPS URL or base64 image data.');
  }

  if (!isValidOptionalBannerImage(desktopImage)) {
    res.status(400);
    throw new Error('Invalid desktop image format. Must be an HTTPS URL or base64 image data.');
  }

  const banner = await Banner.findById(req.params.id);

  if (banner) {
    banner.image = image !== undefined ? image : banner.image;
    banner.desktopImage = desktopImage !== undefined ? desktopImage : banner.desktopImage;
    banner.title = title !== undefined ? title : banner.title;
    banner.subtitle = subtitle !== undefined ? subtitle : banner.subtitle;
    banner.description = description !== undefined ? description : banner.description;
    banner.link = link !== undefined ? getSafeBannerLink(link) : banner.link;
    banner.desktopObjectPosition = desktopObjectPosition !== undefined ? desktopObjectPosition : banner.desktopObjectPosition;
    banner.mobileObjectPosition = mobileObjectPosition !== undefined ? mobileObjectPosition : banner.mobileObjectPosition;
    banner.isActive = isActive !== undefined ? isActive : banner.isActive;
    banner.order = order !== undefined ? order : banner.order;

    const updatedBanner = await banner.save();
    invalidatePublicCache(PUBLIC_CACHE_KEYS.banners);
    res.json(updatedBanner);
  } else {
    res.status(404);
    throw new Error('Banner not found');
  }
});

// @desc    Delete a banner
// @route   DELETE /api/banners/:id
// @access  Private/Admin
const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (banner) {
    await banner.deleteOne();
    invalidatePublicCache(PUBLIC_CACHE_KEYS.banners);
    res.json({ message: 'Banner removed' });
  } else {
    res.status(404);
    throw new Error('Banner not found');
  }
});

export {
  getBanners,
  getAdminBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
