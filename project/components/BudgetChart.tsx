"use client";

import { Transaction, Budget, CATEGORIES, CategorySummary } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo } from "react";
import { formatCurrency } from "@/lib/utils";

interface BudgetChartProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function BudgetChart({ transactions, budgets }: BudgetChartProps) {
  const budgetData = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyTransactions = transactions.filter(
      (t) => t.date.toISOString().slice(0, 7) === currentMonth && t.type === "expense"
    );

    return CATEGORIES
      .filter((category) => category.id !== "income")
      .map((category) => {
        const budget = budgets.find((b) => b.categoryId === category.id)?.amount || 0;
        const actual = monthlyTransactions
          .filter((t) => t.categoryId === category.id)
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          name: category.name,
          budget,
          actual,
          remaining: Math.max(0, budget - actual),
        };
      })
      .filter((data) => data.budget > 0 || data.actual > 0);
  }, [transactions, budgets]);

  if (budgetData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No budget data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={budgetData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => formatCurrency(value)} />
        <Legend />
        <Bar dataKey="actual" fill="hsl(var(--chart-1))" name="Actual" />
        <Bar dataKey="remaining" fill="hsl(var(--chart-2))" name="Remaining" stackId="budget" />
      </BarChart>
    </ResponsiveContainer>
  );
}