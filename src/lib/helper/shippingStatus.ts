import { SHIPPING_METHOD, SHIPPING_TYPES } from '../../constants';

interface Order {
  purchase_date: Date | string;
  shipping_method: SHIPPING_TYPES;
}

export const calcShippingStatus = (order: Order): { shipping_date: Date; delivered_date: Date } => {
  const shipping = SHIPPING_METHOD[order.shipping_method];

  const avgDays = Math.ceil((shipping.lead_time.min + shipping.lead_time.max) / 2); // Average for a more accurate lead time

  const purchaseDate = new Date(order.purchase_date);
  const shippingDate = new Date(purchaseDate);
  const deliveredDate = new Date(purchaseDate);

  // Calculate shipping and delivered dates
  shippingDate.setDate(purchaseDate.getDate() + avgDays / 2); // 50% of lead time
  deliveredDate.setDate(purchaseDate.getDate() + avgDays); // 100% of lead time

  return { shipping_date: shippingDate, delivered_date: deliveredDate };
};
