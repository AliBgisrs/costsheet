import React, { useMemo } from 'react';
import type { BudgetItem } from '../types.ts';
import { MainCategory } from '../types.ts';
import { MONTHS, CATEGORY_COLORS } from '../constants.ts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlyTrendChartProps {
    data: Record<string, BudgetItem[]>;
}

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ data }) => {

    const trendData = useMemo(() => {
        return MONTHS.map(month => {
            const monthData = data[month] || [];
            const totals: { month: string, [key: string]: string | number } = { month: month.substring(0, 3) };
            
            Object.values(MainCategory).forEach(cat => {
                totals[cat] = 0;
            });

            monthData.forEach(item => {
                (totals[item.mainCategory] as number) += item.amount;
            });
            return totals;
        });
    }, [data]);

    return (
        <div className="bg-surface-dark p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Monthly Trend</h3>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#d1d5db" />
                        <YAxis stroke="#d1d5db" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                            formatter={(value: number) => `$${value.toFixed(2)}`}
                        />
                        <Legend />
                        {Object.values(MainCategory).map(cat => (
                             <Line
                                key={cat}
                                type="monotone"
                                dataKey={cat}
                                stroke={CATEGORY_COLORS[cat]}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 8 }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MonthlyTrendChart;