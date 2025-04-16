"use client";

import { Card } from "@/components/ui/card";
import { Transaction, CATEGORIES } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useMemo } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface DashboardCardsProps {
  transactions: Transaction[];
}

export default function DashboardCards({ transactions }: DashboardCardsProps) {
  const summary = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyTransactions = transactions.filter(
      (t) => t.date.toISOString().slice(0, 7) === currentMonth
    );

    const totalIncome = monthlyTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = monthlyTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const topCategory = CATEGORIES.reduce(
      (max, category) => {
        const total = monthlyTransactions
          .filter((t) => t.type === "expense" && t.categoryId === category.id)
          .reduce((sum, t) => sum + t.amount, 0);
        return total > max.total ? { category, total } : max;
      },
      { category: CATEGORIES[0], total: 0 }
    );

    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses,
      topCategory,
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Monthly Income</p>
          <div className="flex items-center gap-2">
            <ArrowUpIcon className="w-4 h-4 text-green-500" />
            <p className="text-2xl font-bold">{formatCurrency(summary.income)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Monthly Expenses</p>
          <div className="flex items-center gap-2">
            <ArrowDownIcon className="w-4 h-4 text-red-500" />
            <p className="text-2xl font-bold">{formatCurrency(summary.expenses)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Monthly Balance</p>
          <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatCurrency(summary.balance)}
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Top Spending Category</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{summary.topCategory.category.name}</p>
            <p className="text-sm text-muted-foreground">
              ({formatCurrency(summary.topCategory.total)})
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}