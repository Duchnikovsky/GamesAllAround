export interface OrderedItemsTypes {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrdersTypes {
  id: string;
  customer: string;
  cost: number;
  status: OrderStatus;
  products: OrderedItemsTypes[];
}

export function colorStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING:
      return "text-yellow-500";
    case OrderStatus.PROCESSING:
      return "text-blue-500";
    case OrderStatus.SHIPPED:
      return "text-green-500";
    case OrderStatus.DELIVERED:
      return "text-green-500";
    case OrderStatus.CANCELLED:
      return "text-red-500";
  }
}
