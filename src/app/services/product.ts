import {Category} from './category';

export interface Product {
  id: number;
  name: string;
  category: Category;
  create_at: string;
  category_id: number;
  updated_at: string;
}

export interface ProductWithCount {
  products: Product[];
  products_count: number;
}
