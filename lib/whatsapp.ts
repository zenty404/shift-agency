export const WHATSAPP_MESSAGE =
  "Bonjour, je souhaite lancer mon projet digital";

/** Display: 07 84 63 97 01 → E.164 without + for wa.me */
export const WHATSAPP_PHONE_WA = "33784639701";

export const WHATSAPP_DISPLAY = "07 84 63 97 01";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_WA}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
