export const baseURL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const brandLogo =
  "https://ik.imagekit.io/acrrubsd0/Untitled%20design.png?updatedAt=1770381393453";

const sanitizeEnvValue = (value = "") => value.trim().replace(/^"(.*)"$/, "$1");

export const RESTAURANTS_API_URL = sanitizeEnvValue(
  process.env.USE_LIVE_SWIGGY_API || ""
);

export const MENU_API_URL = sanitizeEnvValue(
  process.env.RESTAURANTS_API_URL || ""
);

// Use live Swiggy endpoints whenever both env URLs are available.
export const USE_LIVE_SWIGGY_API = Boolean(
  RESTAURANTS_API_URL && MENU_API_URL
);
