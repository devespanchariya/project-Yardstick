# project-Yardstick
# Personal Finance Tracker

A modern web application for tracking personal finances, built with Next.js and React. This application helps users manage their income, expenses, and budgets with an intuitive interface and insightful visualizations.

## Features

### Transaction Management
- Add, edit, and delete financial transactions
- Categorize transactions (income/expense)
- Detailed transaction history with filtering options
- Support for multiple expense categories

### Budgeting
- Set monthly budgets by category
- Track budget vs. actual spending
- Visual budget progress indicators
- Monthly budget rollover tracking

### Analytics & Visualization
- Monthly income vs. expenses overview
- Category-wise expense breakdown
- Budget vs. actual comparison charts
- Interactive data visualizations using Recharts

### Dashboard
- Real-time financial summary
- Monthly balance tracking
- Top spending categories
- Quick access to common actions

## Technology Stack

- **Framework**: Next.js 13 with React 18
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page component
├── components/          # React components
│   ├── BudgetChart.tsx  # Budget visualization
│   ├── CategoryChart.tsx# Category breakdown chart
│   ├── DashboardCards.tsx# Summary cards
│   └── ...             # Other components
├── lib/                 # Utility functions and types
│   ├── types.ts        # TypeScript types/interfaces
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

## Features in Detail

### Transaction Management
- Transaction form with category selection
- Date and amount validation
- Description and category tracking
- Edit and delete functionality

### Budgeting System
- Monthly budget setting by category
- Visual budget tracking
- Overspending alerts
- Budget vs. actual comparison

### Reporting & Analytics
- Monthly expense trends
- Category-wise spending analysis
- Budget adherence tracking
- Interactive charts and graphs

