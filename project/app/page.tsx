"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet } from "lucide-react";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";
import ExpensesChart from "@/components/ExpensesChart";
import CategoryChart from "@/components/CategoryChart";
import BudgetChart from "@/components/BudgetChart";
import BudgetForm from "@/components/BudgetForm";
import DashboardCards from "@/components/DashboardCards";
import { Transaction, Budget } from "@/lib/types";

export default function Home() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const handleAddTransaction = (transaction: Transaction) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id ? transaction : t
      ));
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, { ...transaction, id: Date.now().toString() }]);
    }
    setIsTransactionFormOpen(false);
  };

  const handleAddBudget = (budget: Budget) => {
    if (editingBudget) {
      setBudgets(budgets.map(b =>
        b.categoryId === editingBudget.categoryId && b.month === editingBudget.month
          ? budget
          : b
      ));
      setEditingBudget(null);
    } else {
      setBudgets([...budgets, budget]);
    }
    setIsBudgetFormOpen(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsTransactionFormOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-foreground">Personal Finance Tracker</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setEditingBudget(null);
                setIsBudgetFormOpen(true);
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Wallet className="w-5 h-5" />
              Set Budget
            </Button>
            <Button
              onClick={() => {
                setEditingTransaction(null);
                setIsTransactionFormOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add Transaction
            </Button>
          </div>
        </div>

        <DashboardCards transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Monthly Overview</h2>
            <ExpensesChart transactions={transactions} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Expense Categories</h2>
            <CategoryChart transactions={transactions} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Budget vs Actual</h2>
            <BudgetChart transactions={transactions} budgets={budgets} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionList
              transactions={transactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </Card>
        </div>

        <TransactionForm
          isOpen={isTransactionFormOpen}
          onClose={() => {
            setIsTransactionFormOpen(false);
            setEditingTransaction(null);
          }}
          onSubmit={handleAddTransaction}
          editingTransaction={editingTransaction}
        />

        <BudgetForm
          isOpen={isBudgetFormOpen}
          onClose={() => {
            setIsBudgetFormOpen(false);
            setEditingBudget(null);
          }}
          onSubmit={handleAddBudget}
          editingBudget={editingBudget}
        />
      </div>
    </div>
  );
}