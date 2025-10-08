import React, { useState, useMemo } from 'react';
import { MONTHS, INITIAL_BUDGET_DATA, INITIAL_SALARIES } from './constants.ts';
import type { BudgetItem, MainCategory } from './types.ts';
import BudgetInputForm from './components/BudgetInputForm.tsx';
import CategoryPieChart from './components/CategoryPieChart.tsx';
import MonthlyTrendChart from './components/MonthlyTrendChart.tsx';
import Header from './components/Header.tsx';
import CategoryTotals from './components/CategoryTotals.tsx';

const App: React.FC = () => {
    const [budgetData, setBudgetData] = useState<Record<string, BudgetItem[]>>(INITIAL_BUDGET_DATA);
    const [salaries, setSalaries] = useState<Record<string, number>>(INITIAL_SALARIES);
    const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[0]);

    const handleItemChange = (itemId: string, field: 'subCategory' | 'amount', value: string | number) => {
        setBudgetData(prevData => {
            const monthData = [...(prevData[selectedMonth] || [])];
            const itemIndex = monthData.findIndex(item => item.id === itemId);

            if (itemIndex > -1) {
                const updatedItem = { ...monthData[itemIndex], [field]: value };
                const newMonthData = [...monthData];
                newMonthData[itemIndex] = updatedItem;
                
                return {
                    ...prevData,
                    [selectedMonth]: newMonthData,
                };
            }
            return prevData;
        });
    };
    
    const handleItemAdd = (mainCategory: MainCategory) => {
        setBudgetData(prevData => {
            const monthData = [...(prevData[selectedMonth] || [])];
            const newItem: BudgetItem = {
                id: `item-${Date.now()}`,
                month: selectedMonth,
                mainCategory,
                subCategory: '',
                amount: 0,
            };
            return {
                ...prevData,
                [selectedMonth]: [...monthData, newItem],
            };
        });
    };

    const handleItemRemove = (itemId: string) => {
        setBudgetData(prevData => {
            const monthData = (prevData[selectedMonth] || []).filter(item => item.id !== itemId);
            return {
                ...prevData,
                [selectedMonth]: monthData,
            };
        });
    };

    const handleSalaryChange = (month: string, amount: number) => {
        setSalaries(prevSalaries => ({
            ...prevSalaries,
            [month]: amount,
        }));
    };

    const currentMonthData = useMemo(() => {
        return budgetData[selectedMonth] || [];
    }, [budgetData, selectedMonth]);

    return (
        <div className="min-h-screen bg-background-dark text-text-primary font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="mb-8 p-6 bg-surface-dark rounded-xl shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 space-y-4 sm:space-y-0">
                        <div>
                            <label htmlFor="month-select" className="block text-sm font-medium text-text-secondary mb-2">
                                Select Month
                            </label>
                            <select
                                id="month-select"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full sm:w-auto p-3 bg-gray-700 border border-gray-600 rounded-lg text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
                            >
                                {MONTHS.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                         <div>
                             <label htmlFor="salary-input" className="block text-sm font-medium text-text-secondary mb-2">
                                Salary for {selectedMonth}
                            </label>
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                                <input
                                    type="number"
                                    id="salary-input"
                                    value={salaries[selectedMonth] || ''}
                                    onChange={(e) => handleSalaryChange(selectedMonth, Number(e.target.value))}
                                    className="w-full sm:w-48 bg-gray-700 border border-gray-600 rounded-md py-2.5 pl-7 pr-2 text-left text-text-primary focus:ring-brand-primary focus:border-brand-primary transition"
                                    placeholder="Enter salary"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <BudgetInputForm
                            month={selectedMonth}
                            budgetItems={currentMonthData}
                            onItemChange={handleItemChange}
                            onItemAdd={handleItemAdd}
                            onItemRemove={handleItemRemove}
                        />
                    </div>
                    <div className="lg:col-span-3 space-y-8">
                         <CategoryTotals data={currentMonthData} />
                         <CategoryPieChart data={currentMonthData} />
                         <MonthlyTrendChart data={budgetData} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;