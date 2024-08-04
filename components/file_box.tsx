import LightButton from "@/components/ligth_button";
import {IoDownloadOutline} from "react-icons/io5";
import {IoIosCloudDownload} from "react-icons/io";
import {FaCheck} from "react-icons/fa";
import React, {useState} from "react";
import {Filters} from "@/utils/types";

interface FileBoxProps {
    fileName?: string;
    totalCopy?: number;
    color?: string;
    startPage?: number;
    endPage?: number;
    dateTime?: string;
    showNew?: boolean;
}
export default function FileBox({
    showNew = false,
    fileName = 'Sakshi.pdf',
    totalCopy = 1,
    color = 'Black and White',
    startPage = 1,
    endPage = 20,
    dateTime = '20 April 2024',

                                } : FileBoxProps) {

    const [printers, setPrinters] = useState<MediaDeviceInfo[]>([]);
    const [selectedPrinter, setSelectedPrinter] = useState<string | null>(null);

    const handlePrint = () => {
        const fetchPrinters = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                // const printerList = devices.filter((device) => device.kind === 'printer');
                // setPrinters(printerList);
                console.log(devices);
            } catch (error) {
                console.error('Error fetching printers:', error);
            }
        };

        fetchPrinters()
    }
    return (
        <div className={`relative flex flex-col gap-6 border-[1px] rounded-2xl border-white w-[43vw] p-4`}>
            <div className={`absolute p-[2px] px-4 bg-dark-200 text-sm text-blue-100 -top-3`}>
                <span>NEW</span>
            </div>
            <div>
                <LightButton text={"Mark as Complete"} type={'Complete'}>
                    <FaCheck />
                </LightButton>
            </div>
            <div className={`flex flex-col gap-6`}>
                <h1 className={`text-gray-400`}>File Name: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>{fileName}</span></h1>
                <h1 className={`text-gray-400`}>Total Copy: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>{totalCopy}</span></h1>
                <h1 className={`text-gray-400`}>Color: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>{startPage}</span></h1>
                <h1 className={`text-gray-400`}>Start Page: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>{startPage}</span></h1>
                <h1 className={`text-gray-400`}>End Page: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>{endPage}</span></h1>
            </div>
            <div className={`absolute bottom-8 right-8`}>
                <LightButton text={"Download"} type={'Print'} handlePrint={handlePrint}>
                    <IoIosCloudDownload className={`text-white text-xl`} />
                </LightButton>
            </div>
            <div className={`absolute top-4 right-8 text-white text-[12px]`}>
                <p>{dateTime}</p>
            </div>
        </div>
    );
}