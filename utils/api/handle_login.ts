import axios from "axios";
import {
    CommonResponseModel,
    LoginErrorResponseModel,
    LoginRequestModel,
    LoginSuccessResponseModel,
    SendOTPRequestModel,
    SendOTPResponseModel
} from "@/utils/types";
import {errorHandler} from "@/utils/error_handler";
import {baseUrl} from "@/utils/api/base_url";

export class HandleLogin {

    static verifyToken = async (token: string) => {
        const url = `${baseUrl}/api/auth/verifyToken`;
        const headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        const requestOptions = {
            method: 'POST',
            headers: headers,
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data as CommonResponseModel;
        } catch (error: any) {
            return {
                success: false,
                message: 'Something went wrong',
            }
        }
    };
    static requestOTP = async (otpRequestData: SendOTPRequestModel) => {
        console.log("THis is running");
        const { mobileNumber } = otpRequestData;
        try{
            const url = `${baseUrl}/api/auth/requestOtp/store`;
            const data = {
                mobileNumber,
            };
            const response = await axios.post(url, data);
            const { message, success } = response.data as SendOTPResponseModel;
            console.log(response.data);
            return {
                success,
                message,
                status: response.status,
            };

        }
        catch (error: any) {
            console.log(error);
            console.log("Getting inside the error");

            let message = 'Something went wrong. We are trying to fix the issue';
            let success = false;
            let status = 500;

            // Check if error.response and error.response.data exist
            if (error.response) {
                status = error.response.status || 500;
                if (error.response.data) {
                    message = error.response.data.message || message;
                    success = error.response.data.success ?? false;
                }
            }

            return {
                success,
                message,
                status,
            };
        }

    };

    static verifyLogin = async (loginRequestData: LoginRequestModel) => {
        const { mobileNumber, otp} = loginRequestData;
        try{
            const url = `${baseUrl}/api/auth/login/store`;
            const data = {
                mobileNumber,
                otp,
            };
            const response = await axios.post(url, data);
            return response.data as LoginSuccessResponseModel;

        }
        catch (error: any) {
            return error.response.data as LoginErrorResponseModel;
        }
    };
}