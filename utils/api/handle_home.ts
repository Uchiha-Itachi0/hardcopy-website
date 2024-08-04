import {baseUrl} from "@/utils/api/base_url";
import {
    CommonResponseModel,
    FilesRequestModel,
    GetOrderErrorResponseModel,
    GetStoreRequestModel,
    Order
} from "@/utils/types";
import axios from "axios";
import Cookies from "js-cookie";

export class HandleHome{

    static getStores = async (homeData: GetStoreRequestModel) => {
        const url: string = `${baseUrl}/api/order/getByStore`;
        const config = {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        };
        try{
            const response = await axios.post(url, homeData, config);
            return response.data as Order[];
        }
        catch (error: any){
            return error.response.data as GetOrderErrorResponseModel;
        }
    };

    static getAllFiles = async (fileRequestData: FilesRequestModel) => {
        const url: string = `${baseUrl}/api/file/getById`;
        const config = {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        };
        try{
            const response = await axios.post(url, fileRequestData, config);
            // return response.data as Order[];
            return response.data;
        }
        catch (error: any){
            console.log(error.response.data);
            // return error.response.data as GetOrderErrorResponseModel;
        }
    };

    static markOrderAsComplete = async (id: number) => {
        const url: string = `${baseUrl}/api/order/updateOrderStatus`;
        const config = {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        };
        try{
            const response = await axios.post(url, {id}, config);
            return response.data as CommonResponseModel;
        }
        catch (error: any){
            return {
                success: false,
                message: 'Error occurred while marking as completed'
            };
        }
    };
}