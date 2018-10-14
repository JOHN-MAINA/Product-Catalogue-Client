export interface Category {
  id: number;
  name: string;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithCount {
  categories: Category[];
  category_count: number;
}
