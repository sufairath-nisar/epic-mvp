export const ASSET_PATH = "/assets/";

// Absolute URLs (e.g. images from the API) are used as-is; bare filenames get
// the local "/assets/" prefix.
export const resolveAssetUrl = (value) => (value && /^https?:\/\//i.test(value) ? value : `${ASSET_PATH}${value}`);
