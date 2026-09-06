import Settings from '../models/settingsModel.js';
import asyncHandler from 'express-async-handler';
import {
  PUBLIC_CACHE_KEYS,
  PUBLIC_CACHE_TTLS,
  invalidatePublicCache,
  setPublicCacheHeaders,
  withPublicCache,
} from '../utils/publicCache.js';

// @desc    Get system settings
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res) => {
  setPublicCacheHeaders(res, {
    browserSeconds: 300,
    edgeSeconds: 600,
    staleSeconds: 900,
  });

  const settings = await withPublicCache(
    PUBLIC_CACHE_KEYS.settings,
    PUBLIC_CACHE_TTLS.settings,
    async () => {
      let existingSettings = await Settings.findOne().lean();

      if (!existingSettings) {
        const createdSettings = await Settings.create({
          activeFont: "'Inter', sans-serif",
          editorialImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
        });

        return createdSettings.toObject();
      }

      return existingSettings;
    },
  );

  res.json(settings);
});

// @desc    Update system settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  
  if (!settings) {
    settings = new Settings();
  }

const { activeFont, editorialImage } = req.body;
  if (activeFont) settings.activeFont = activeFont;
  if (editorialImage) settings.editorialImage = editorialImage;

  const updatedSettings = await settings.save();
  invalidatePublicCache(PUBLIC_CACHE_KEYS.settings);
  res.json(updatedSettings);
});
