'use client'
import React, {useState} from "react";
import { MdAccountCircle } from "react-icons/md";


interface HomeLayoutProps {
    children: React.ReactNode | React.ReactNode[];
    showFilters: boolean;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({
                                                   children,
                                                   showFilters = true,
                                               }: HomeLayoutProps) => {

    return (
        <main className="h-screen px-2 w-screen dark:bg-dark-300">
            <nav className="fixed left-0 flex flex-col justify-between items-center py-6 w-16 h-screen dark:bg-dark-200">
                <div>
                    <h1 className="text-5xl dark:text-white">H</h1>
                </div>
                <div>
                    <div className="cursor-pointer p-2 border-2 border-blue-100 rounded-full">
                        <MdAccountCircle className="text-2xl dark:text-white" />
                    </div>
                </div>
            </nav>

            <div className="fixed left-20 p-6 right-4 top-32 h-[78%] rounded-2xl dark:bg-dark-200">
                {children}
            </div>
        </main>

    );
};

export default HomeLayout;
