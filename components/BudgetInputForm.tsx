import React from 'react';
import type { BudgetItem, MainCategory } from '../types.ts';
import { CATEGORIES } from '../constants.ts';
import { CategoryIcon } from './IconComponents.tsx';

interface BudgetInputFormProps {
    month: string;
    budgetItems: BudgetItem[];
    onItemChange: (itemId: string, field: 'subCategory' | 'amount', value: string | number) => void;
    onItemAdd: (mainCategory: MainCategory) => void;
    onItemRemove: (itemId: string) => void;
}

const BudgetInputForm: React.FC<BudgetInputFormProps> = ({ month, budgetItems, onItemChange, onItemAdd, onItemRemove }) => {

    return (
        <div className="bg-surface-dark p-6 rounded-xl shadow-lg h-full">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Budget for {month}</h2>
            <div className="space-y-6">
                {Object.entries(CATEGORIES).map(([mainCategory, subCategories]) => {
                    const mc = mainCategory as MainCategory;
                    
                    const customItems = budgetItems.filter(i => 
                        i.mainCategory === mc && !subCategories.includes(i.subCategory)
                    );
                    
                    return (
                    <div key={mainCategory}>
                        <div className="flex items-center mb-3">
                            <CategoryIcon category={mc} className="h-6 w-6 mr-3 text-brand-primary" />
                            <h3 className="text-xl font-semibold text-text-secondary">{mainCategory}</h3>
                        </div>
                        <div className="space-y-3 pl-9">
                            {subCategories.map(subCategory => {
                                const item = budgetItems.find(i => i.mainCategory === mc && i.subCategory === subCategory);
                                if (!item) return null;

                                return (
                                <div key={item.id} className="flex items-center justify-between">
                                    <label htmlFor={item.id} className="text-text-secondary">
                                        {subCategory}
                                    </label>
                                    <div className="relative">
                                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                                        <input
                                            type="number"
                                            id={item.id}
                                            value={item.amount}
                                            onChange={(e) => onItemChange(item.id, 'amount', Number(e.target.value))}
                                            className="w-32 bg-gray-700 border border-gray-600 rounded-md py-2 pl-7 pr-2 text-right text-text-primary focus:ring-brand-primary focus:border-brand-primary transition"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                );
                            })}
                            
                            {customItems.map(item => (
                                <div key={item.id} className="flex items-center justify-between gap-2">
                                    <input
                                        type="text"
                                        value={item.subCategory}
                                        onChange={(e) => onItemChange(item.id, 'subCategory', e.target.value)}
                                        placeholder="Description"
                                        className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-text-primary focus:ring-brand-primary focus:border-brand-primary transition"
                                    />
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                                        <input
                                            type="number"
                                            value={item.amount}
                                            onChange={(e) => onItemChange(item.id, 'amount', Number(e.target.value))}
                                            className="w-28 bg-gray-700 border border-gray-600 rounded-md py-2 pl-7 pr-2 text-right text-text-primary focus:ring-brand-primary focus:border-brand-primary transition"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                    <button 
                                        onClick={() => onItemRemove(item.id)} 
                                        className="text-gray-500 hover:text-red-400 transition-colors duration-200 p-1 rounded-full flex-shrink-0"
                                        aria-label="Remove item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}

                             <div className="pt-2">
                                <button
                                    onClick={() => onItemAdd(mc)}
                                    className="text-brand-primary hover:text-brand-secondary transition duration-200 text-sm font-medium flex items-center"
                                >
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Other
                                </button>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
};

export default BudgetInputForm;