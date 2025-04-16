export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export type Budget = {
  categoryId: string;
  amount: number;
  month: string; // Format: YYYY-MM
};

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  type: 'income' | 'expense';
  categoryId: string;
}

export interface CategorySummary {
  categoryId: string;
  total: number;
  budget: number;
  percentage: number;
}

export const CATEGORIES: Category[] = [
  { id: 'housing', name: 'Housing', color: 'hsl(var(--chart-1))', icon: 'home' },
  { id: 'transportation', name: 'Transportation', color: 'hsl(var(--chart-2))', icon: 'car' },
  { id: 'food', name: 'Food & Dining', color: 'hsl(var(--chart-3))', icon: 'utensils' },
  { id: 'utilities', name: 'Utilities', color: 'hsl(var(--chart-4))', icon: 'plug' },
  { id: 'entertainment', name: 'Entertainment', color: 'hsl(var(--chart-5))', icon: 'tv' },
  { id: 'shopping', name: 'Shopping', color: 'hsl(var(--chart-1))', icon: 'shopping-bag' },
  { id: 'healthcare', name: 'Healthcare', color: 'hsl(var(--chart-2))', icon: 'heart' },
  { id: 'income', name: 'Income', color: 'hsl(var(--chart-3))', icon: 'wallet' },
  { id: 'other', name: 'Other', color: 'hsl(var(--chart-4))', icon: 'more-horizontal' },
];