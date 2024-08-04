import LightButton from "@/components/ligth_button";
import {FaCheck} from "react-icons/fa";
import {useRouter} from "next/navigation";
// import {rou} from "next/router";


interface OrderBoxProps {
    filesData?: string[];
    totalFiles?: number;
    amount?: number;
    phoneNumber?: string;
    userName?: string;
    dateTime?: string;
    showNew?: boolean;
    orderStatus?: string;
    toggleDialog: () => void;
}
export default function OrderBox({
    showNew = false,
    filesData = [],
    totalFiles = 1,
    amount = 1,
    phoneNumber = '1',
    userName = 'Sakshi Papat',
    dateTime = '20 April 2024',
    orderStatus = 'Pending',
    toggleDialog
                                 } : OrderBoxProps) {


    const router = useRouter();



    const handleDownload = () => {}
    function handleFiles(filesData: any){

        // router.push('/files');
        const fileObj = {
            id: filesData
        }

        localStorage.setItem('filesData', JSON.stringify(fileObj));
        router.push('/content/files');
    }
    return (
        <div onClick={() => handleFiles(filesData)} className={`cursor-pointer relative flex flex-col gap-6 border-[1px] rounded-2xl border-white w-[43vw] p-4`}>
            <div className={` ${showNew ? 'block' : 'hidden'} absolute p-[2px] px-4 bg-dark-200 text-sm text-blue-100 -top-3`}>
                <span>NEW</span>
            </div>
            <div>
                <LightButton orderStatus={orderStatus} toggleDialog={toggleDialog} text={"Mark as Complete"} type="Complete">
                    <FaCheck />
                </LightButton>
            </div>
            <div className={`flex flex-col gap-6`}>
                <h1 className={`text-gray-400`}>Total Files: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>{totalFiles}</span></h1>
                <h1 className={`text-gray-400`}>Amount: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>₹ {amount}</span></h1>
                <h1 className={`text-gray-400`}>Name: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>{userName}</span></h1>
                <h1 className={`text-gray-400`}>Phone Number: <span className={`!opacity-100 text-white font-bold text-2xl ml-5`}>{phoneNumber.replace("+91", "")}</span></h1>
            </div>
            <div className={`absolute top-4 right-8 text-white text-[12px]`}>
                <p>{dateTime}</p>
            </div>
        </div>
    );
}