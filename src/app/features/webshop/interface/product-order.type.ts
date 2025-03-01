export type OrderType = 'asc' | 'desc';

export interface ProductOrder {
  id: string;
  label: string;
  sortBy: string;
  order: OrderType;
}