export const getPriceWithOffer = (price = 0, offer = 0) => (price * (((100 - offer) / 100))).toFixed(2)