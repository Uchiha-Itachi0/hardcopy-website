export interface CommonResponseModel {
    message: string,
    success: boolean,
}

export interface Filters {
    applied: Filter[],
    apply: Filter[];
}

export interface Filter {
    text: string;
    isActive: boolean;
    id: number,
    order: number,
}

export interface LoginRequestModel {
    mobileNumber: string
    otp: string,
}

export interface LoginSuccessResponseModel {
    message: string,
    success: boolean,
    data: {
        token: string,
        mobileNumber: string,
    }
}

export interface LoginErrorResponseModel {
    message: string,
    success: boolean,
}

export interface SendOTPRequestModel {
    mobileNumber: string,
}

export interface SendOTPResponseModel {
    message: string,
    success: boolean,
}

export interface GetStoreRequestModel {
    storeId: string,
    pageNumber: number,
}

export interface Order {
    id: number,
    orderStatus: string,
    fileNames: string[],
    localDateTime: string,
    orderAmount: number,
    userId: string,
    userName: string
}

export interface GetOrderErrorResponseModel {
    message: string,
    success: boolean,
}

export interface FilesRequestModel {
    id: string[],
}

export interface FileResponseModel {

}