'use client'


import {ThemeProvider} from "next-themes";
import React from "react";

export default function ThemeProviderWrapper({children}: {children: React.ReactNode}) {
    return (
        <ThemeProvider enableSystem={true} attribute='class' defaultTheme="system">
            {children}
        </ThemeProvider>
    );
}