import React, { useMemo, useState, useEffect } from 'react';
import type { BudgetItem } from '../types.ts';
import { MainCategory } from '../types.ts';
import { CATEGORY_COLORS } from '../constants.ts';
import { CategoryIcon } from './IconComponents.tsx';

interface CategoryTotalsProps {
    data: BudgetItem[];
}

const CategoryTotals: React.FC<CategoryTotalsProps> = ({ data }) => {
    const [totalCost, setTotalCost] = useState<number | null>(null);

    const categoryTotals = useMemo(() => {
        const totals: Record<MainCategory, number> = {
            [MainCategory.BILLS]: 0,
            [MainCategory.DEBT]: 0,
            [MainCategory.SAVINGS]: 0,
            [MainCategory.EXPENSES]: 0,
        };

        data.forEach(item => {
            if (totals[item.mainCategory] !== undefined) {
                totals[item.mainCategory] += item.amount;
            }
        });

        return totals;
    }, [data]);

    useEffect(() => {
        setTotalCost(null);
    }, [data]);

    const handleReportClick = () => {
        const cost =
            (categoryTotals[MainCategory.BILLS] || 0) +
            (categoryTotals[MainCategory.DEBT] || 0) +
            (categoryTotals[MainCategory.EXPENSES] || 0);
        setTotalCost(cost);
    };

    return (
        <div className="bg-surface-dark p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Category Totals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(categoryTotals).map(([category, total]) => (
                    <div key={category} className="bg-gray-700 p-4 rounded-lg flex items-center" style={{ borderLeft: `4px solid ${CATEGORY_COLORS[category as MainCategory]}` }}>
                         <div className="mr-4" style={{ color: CATEGORY_COLORS[category as MainCategory] }}>
                            <CategoryIcon category={category as MainCategory} className="h-8 w-8" />
                         </div>
                         <div>
                            <p className="text-sm text-text-secondary">{category}</p>
                            <p className="text-2xl font-bold text-text-primary">${total.toLocaleString()}</p>
                         </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center">
                <button
                    onClick={handleReportClick}
                    className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-dark focus:ring-brand-primary"
                    aria-label="Report total costs for the month"
                >
                    Report Total Costs
                </button>
                {totalCost !== null && (
                    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <p className="text-sm text-text-secondary">Total Costs (Bills + Debt + Expenses)</p>
                        <p className="text-3xl font-bold text-brand-primary">${totalCost.toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryTotals;