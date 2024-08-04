'use client'
import React from "react";
import DialogBox from "@/components/dialog_box";

interface LightButtonProps {
    text: String;
    type: string;
    children: React.ReactNode;
    orderStatus?: string;
    handlePrint?: () => void;
    toggleDialog?: () => void;
}


export default function LightButton({ orderStatus, toggleDialog, text, type, handlePrint, children } : LightButtonProps) {

    const [completed, setCompleted] = React.useState(false);
    let orderStatusColor = '';
    switch (orderStatus) {
        case "PENDING":
            orderStatusColor = 'bg-transparent';
            break;
        case "COMPLETED":
            orderStatusColor = 'bg-green-200';
            break;

    }
    const handleClick = (type: string, event: React.MouseEvent) => {
        event.stopPropagation();
        switch (type) {
            case "Complete":
                if (toggleDialog) {
                    toggleDialog();
                }
                break;
            case "Print":
                handlePrint!();

        }
    }

    return (
            <div onClick = {(event) => handleClick(type, event)} className={`${orderStatusColor} cursor-pointer flex items-center w-max p-2 rounded-lg border-dark-100 border-[1px]`}>
                <p className="font-bold text-[12px] text-white mr-10">{text}</p>
                {children}
            </div>

    );
}