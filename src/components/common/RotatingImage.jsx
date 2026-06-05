import { ASSET_PATH } from "../../constants/assets";

// Local filenames get the "/assets/" prefix (unchanged behaviour); absolute
// URLs (e.g. images coming from the API) are used as-is.
const resolveImageSrc = (image) => (/^https?:\/\//i.test(image) ? image : `${ASSET_PATH}${image}`);

const RotatingImage = ({ images, alt, className = "", activeIndex = 0, placeholder = "Images not uploaded yet" }) => {
  const imageList = images.filter(Boolean);
  const [primaryImage, secondaryImage] = imageList;

  // No image available (e.g. the API has none yet): keep the card box and show
  // a short placeholder message instead of a broken/empty image.
  if (!primaryImage) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
        <span className="px-4 text-center text-[11px] font-light uppercase tracking-wide text-[#154527]/60 md:text-[13px]">{placeholder}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={resolveImageSrc(primaryImage)}
        alt={alt}
        className={`h-full w-full object-cover transition duration-700 ${secondaryImage && activeIndex === 1 ? "opacity-0" : "opacity-100 group-hover:scale-105"}`}
      />
      {secondaryImage && (
        <img
          src={resolveImageSrc(secondaryImage)}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${activeIndex === 1 ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
};

export default RotatingImage;
