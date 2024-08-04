import {MouseEventHandler} from "react";

interface DialogBoxProps {
    showDialog: boolean;
    onYes: (event: any) => void;
    onNo: (event: any) => void;
    message?: string;
}

const dialogBox: React.FC<DialogBoxProps> = ({onNo, onYes, showDialog, message}: DialogBoxProps) => {

    return (
        <div onClick={(event) => onNo(event)} className={`${showDialog ? 'false' : 'hidden' } fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center cursor-default`}>
            <div onClick={(event) => event.stopPropagation()} className="text-center w-96 bg-white py-8  rounded-lg flex flex-col items-center">
                <h1 className="text-2xl font-bold text-black mx-4">{message}</h1>
                <span className={`h-[2px] bg-gray-200 w-full mt-8`}></span>
                <div className="flex gap-4 mt-4 px-4 w-full">
                    <button onClick={(event) => onYes(event)} className="w-1/2 bg-green-300 px-4 py-2 rounded-lg text-white font-bold">Yes</button>
                    <button onClick={(event) => onNo(event)} className="w-1/2 bg-red-300 px-4 py-2 rounded-lg text-white font-bold">No</button>
                </div>
            </div>
        </div>
    );
}

export default dialogBox;