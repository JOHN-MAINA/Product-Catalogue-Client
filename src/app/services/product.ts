import {Category} from './category';

export interface Product {
  id: number;
  name: string;
  category: Category;
  create_at: string;
  category_id: number;
  updated_at: string;
}
