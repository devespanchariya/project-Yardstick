"use client";

import { Transaction } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

interface ExpensesChartProps {
  transactions: Transaction[];
}

export default function ExpensesChart({ transactions }: ExpensesChartProps) {
  const monthlyData = useMemo(() => {
    const data: { [key: string]: { expenses: number; income: number } } = {};
    
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!data[monthYear]) {
        data[monthYear] = { expenses: 0, income: 0 };
      }
      
      if (transaction.type === 'expense') {
        data[monthYear].expenses += transaction.amount;
      } else {
        data[monthYear].income += transaction.amount;
      }
    });

    return Object.entries(data)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, values]) => ({
        month,
        expenses: values.expenses,
        income: values.income,
      }));
  }, [transactions]);

  if (monthlyData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={(value) => {
            const [year, month] = value.split("-");
            return `${month}/${year.slice(2)}`;
          }}
        />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
          labelFormatter={(label) => {
            const [year, month] = label.split("-");
            return `${month}/${year}`;
          }}
        />
        <Bar dataKey="income" fill="hsl(var(--chart-2))" name="Income" />
        <Bar dataKey="expenses" fill="hsl(var(--chart-1))" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}