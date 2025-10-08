import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-surface-dark shadow-md">
            <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-brand-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary ml-3">
                        Interactive Budget Sheet
                    </h1>
                </div>
                <div className="hidden sm:block">
                     <p className="text-sm text-text-secondary italic">Developed by Aliasghar Bazrafkan</p>
                </div>
            </div>
        </header>
    );
};

export default Header;