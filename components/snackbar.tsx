'use client'

import {useEffect, useState} from "react";

export function ShowSnackbar({message, time, onClose}: {message: string, time: number, onClose(): void}) {

    const [show, setShow] = useState(true);
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setShow(false);
                onClose();
            }, time);
        }
    }, [show, time, onClose]);
    return (
        <div className={`${show ? 'translate-y-0': 'translate-y-[1000%]'} transition duration-300 fixed bottom-8 text-center rounded-md z-50 w-72 bg-green-300 shadow-2xl p-3`}>
            <h1 className={`text-white`}>{message}</h1>
        </div>
    );
}