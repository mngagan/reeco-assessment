import { orderSummary } from "../mockData"

export const fetchOrderSummary = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(orderSummary)
    }, 1000);
  })
}