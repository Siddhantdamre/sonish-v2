const ProductSkeleton = ({ isFeatured = false }) => {
  const heightClass = isFeatured ? 'h-full min-h-[450px]' : 'h-[450px]';

  return (
    <div className="flex flex-col animate-pulse h-full">
      {/* Image Skeleton */}
      <div className={`w-full bg-charcoal/10 mb-4 rounded-sm flex-1 ${heightClass}`}></div>

      {/* Details Skeleton */}
      <div className="flex flex-col space-y-3 mt-auto">
        {/* Brand */}
        <div className="h-3 w-1/3 bg-charcoal/10 rounded-sm"></div>
        {/* Name */}
        <div className="h-4 w-3/4 bg-charcoal/10 rounded-sm"></div>
        {/* Price */}
        <div className="h-4 w-1/4 bg-charcoal/10 rounded-sm"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

