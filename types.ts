
export enum MainCategory {
    BILLS = 'Bills',
    DEBT = 'Debt',
    SAVINGS = 'Savings',
    EXPENSES = 'Expenses'
}

export interface BudgetItem {
    id: string;
    month: string;
    mainCategory: MainCategory;
    subCategory: string;
    amount: number;
}

export interface CategoryConfig {
    [key: string]: string[];
}
