import { ASSET_PATH } from "../../constants/assets";

const RotatingImage = ({ images, alt, className = "", activeIndex = 0 }) => {
  const imageList = images.filter(Boolean);
  const [primaryImage, secondaryImage] = imageList;

  if (!primaryImage) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={`${ASSET_PATH}${primaryImage}`}
        alt={alt}
        className={`h-full w-full object-cover transition duration-700 ${secondaryImage && activeIndex === 1 ? "opacity-0" : "opacity-100 group-hover:scale-105"}`}
      />
      {secondaryImage && (
        <img
          src={`${ASSET_PATH}${secondaryImage}`}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${activeIndex === 1 ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
};

export default RotatingImage;
