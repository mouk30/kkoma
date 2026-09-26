import { MenuItem } from '../data/cafeData';

export interface CartItemOption {
  temp: 'HOT' | 'ICE' | 'NONE';
  extraShot: boolean; // +500 KRW
  sweetness: 'default' | 'less'; // 기본 | 덜 달게
  useTumbler: boolean; // -300 KRW
}

export interface CartItem {
  id: string; // unique item instance id
  menuItem: MenuItem;
  options: CartItemOption;
  quantity: number;
  itemTotalPrice: number;
}
