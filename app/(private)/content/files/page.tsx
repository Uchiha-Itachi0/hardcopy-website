'use client'
import React, {useEffect, useState} from "react";
import FileBox from "@/components/file_box";
import {HandleHome} from "@/utils/api/handle_home";
import OrderShimmer from "@/components/order_shimmer";


interface FilesProps {
    files: {
        id: string[]
    }
}

export default function Files(props : FilesProps) {

    const filesData = JSON.parse(localStorage.getItem('filesData')!);

    useEffect(() => {
        getAllFiles();
    }, []);

    async function getAllFiles() {
        setLoading(true);
        console.log("This is fileData", filesData);
        const response = await HandleHome.getAllFiles(filesData);
        setFiles(response);
        setLoading(false);

    }

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    return (
        <div className={`flex flex-wrap gap-8 h-full overflow-y-scroll`}>
            {
                loading ? <OrderShimmer total={8} />
                    :
                files.length ? files.map((file: any, index: number) =>
                    <FileBox
                    key = {index}
                        fileName={file.fileType}
                    color={file.color}
                    endPage={file.endPage}
                    startPage={file.startPage}
                    totalCopy={file.numberOfCopies}
                    />
                )
            :
                    <div className={`flex flex-col items-center justify-center gap-4 w-full`}>
                        <h1 className={`text-blue-100 text-2xl`}>No File found.</h1>
                    </div>
            }
        </div>
    )
}