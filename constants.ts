import type { CategoryConfig, BudgetItem } from './types.ts';
import { MainCategory } from './types.ts';

export const CATEGORIES: CategoryConfig = {
    [MainCategory.BILLS]: ['Rent', 'Sewer', 'Electricity', 'WiFi', 'Water'],
    [MainCategory.DEBT]: ['Car Lease', 'Family Health Care'],
    [MainCategory.SAVINGS]: ['Retirement', 'Bank Saving'],
    [MainCategory.EXPENSES]: ['Sam\'s Club', 'Food', 'Health', 'Clothes', 'Gas'],
};

export const MONTHS: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const generateInitialData = (): Record<string, BudgetItem[]> => {
    const data: Record<string, BudgetItem[]> = {};
    const sampleData: Record<string, number> = {
        'Rent': 1200, 'Sewer': 50, 'Electricity': 80, 'WiFi': 60, 'Water': 40,
        'Car Lease': 400, 'Family Health Care': 300,
        'Retirement': 500, 'Bank Saving': 200,
        'Sam\'s Club': 150, 'Food': 400, 'Health': 100, 'Clothes': 50, 'Gas': 120
    };

    MONTHS.forEach((month, monthIndex) => {
        data[month] = [];
        Object.entries(CATEGORIES).forEach(([mainCat, subCats]) => {
            const mainCategory = mainCat as MainCategory;
            subCats.forEach(subCategory => {
                 const baseAmount = sampleData[subCategory] || 0;
                 const variation = baseAmount * (Math.random() - 0.4) * 0.2 * monthIndex; // Add some variation
                 const amount = Math.max(0, Math.round(baseAmount + variation));

                data[month].push({
                    id: `${month}-${mainCategory}-${subCategory}`,
                    month,
                    mainCategory,
                    subCategory,
                    amount,
                });
            });
        });
    });
    return data;
};

export const INITIAL_BUDGET_DATA = generateInitialData();

const generateInitialSalaries = (): Record<string, number> => {
    const salaries: Record<string, number> = {};
    let baseSalary = 5000;
    MONTHS.forEach((month, index) => {
        baseSalary += Math.random() * 100 - 25;
        if ((index + 1) % 6 === 0) { 
            baseSalary *= 1.02;
        }
        salaries[month] = Math.round(baseSalary);
    });
    return salaries;
};

export const INITIAL_SALARIES = generateInitialSalaries();


export const CATEGORY_COLORS: Record<MainCategory, string> = {
    [MainCategory.BILLS]: '#38bdf8', // sky-400
    [MainCategory.DEBT]: '#f87171', // red-400
    [MainCategory.SAVINGS]: '#4ade80', // green-400
    [MainCategory.EXPENSES]: '#facc15', // yellow-400
};