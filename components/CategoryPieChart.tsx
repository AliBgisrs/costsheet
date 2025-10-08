import React, { useMemo } from 'react';
import type { BudgetItem } from '../types.ts';
import { MainCategory } from '../types.ts';
import { CATEGORY_COLORS } from '../constants.ts';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CategoryPieChartProps {
    data: BudgetItem[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
    const chartData = useMemo(() => {
        const categoryTotals: Record<MainCategory, number> = {
            [MainCategory.BILLS]: 0,
            [MainCategory.DEBT]: 0,
            [MainCategory.SAVINGS]: 0,
            [MainCategory.EXPENSES]: 0,
        };

        data.forEach(item => {
            if (categoryTotals[item.mainCategory] !== undefined) {
                categoryTotals[item.mainCategory] += item.amount;
            }
        });

        return Object.entries(categoryTotals)
            .map(([name, value]) => ({ name, value }))
            .filter(item => item.value > 0);

    }, [data]);
    
    const total = useMemo(() => chartData.reduce((sum, item) => sum + item.value, 0), [chartData]);

    if (chartData.length === 0) {
        return (
            <div className="bg-surface-dark p-6 rounded-xl shadow-lg flex flex-col items-center justify-center h-96">
                <h3 className="text-xl font-bold mb-4 text-text-primary">Category Breakdown</h3>
                <p className="text-text-secondary">No data to display for this month. Please enter some values.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-surface-dark p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Category Breakdown</h3>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            // Fix: Explicitly type the arguments for the label prop callback to resolve arithmetic operation errors.
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number; }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                        {`${(percent * 100).toFixed(0)}%`}
                                    </text>
                                );
                            }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as MainCategory]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                            formatter={(value: number) => [`$${value.toFixed(2)}`, `Amount`]}
                        />
                        <Legend iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CategoryPieChart;