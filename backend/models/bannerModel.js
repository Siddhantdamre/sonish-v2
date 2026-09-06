import mongoose from 'mongoose';

const bannerSchema = mongoose.Schema(
  {
    image: {
      type: String, // Mobile/Default image
      required: true,
    },
    desktopImage: {
      type: String, // PC Specific image (Optional)
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    desktopObjectPosition: {
      type: String,
      default: 'center 10%',
    },
    mobileObjectPosition: {
      type: String,
      default: 'center top',
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
