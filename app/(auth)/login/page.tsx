'use client'
import {useState} from "react";
import {
    GetStoreRequestModel,
    LoginErrorResponseModel,
    LoginRequestModel,
    LoginSuccessResponseModel,
    SendOTPRequestModel
} from "@/utils/types";
import {HandleLogin} from "@/utils/api/handle_login";
import {ShowSnackbar} from "@/components/snackbar";
import validatePhone from "@/utils/validator/phone_validator";
import Cookies from "js-cookie";
import {HandleHome} from "@/utils/api/handle_home";
import {redirect, useRouter} from "next/navigation";

export default function LoginPage() {


    const router = useRouter();



    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [isRequestOtpFails, setIsRequestOtpFails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState({
        show: false,
        message: '',
        time: 0
    });
    const [isValidPhone, setIsValidPhone] = useState(true);

    const closeSnackbar = () => {
        setShowSnackbar({
            show: false,
            message: '',
            time: 0
        });
    };
    function handlePhoneChange(phoneNumber: string): void{
        setPhone(phoneNumber);
        if(phoneNumber.length === 0){
            setIsValidPhone(true);
            return;
        }
        const isValid = validatePhone(phoneNumber);
        setIsValidPhone(isValid);
    }
    async function handleLogin(): Promise<void>{
        setLoading(true);
        const adminDetails: LoginRequestModel = {
            mobileNumber: `+91${phone}`,
            otp: otp
        }
        const response: LoginSuccessResponseModel | LoginErrorResponseModel = await HandleLogin.verifyLogin(adminDetails);
        console.log(response);
        // // @ts-ignore
        if(!response.success){
            setShowSnackbar({
                show: true,
                message: response.message,
                time: 3000
            });
            setLoading(false);
            return;
        }
        // @ts-ignore
        Cookies.set('token', response!.data.token, {expires: 7});
        // @ts-ignore
        localStorage.setItem('storeId', response!.data.storeId);
        setLoading(false);
        const homeData: GetStoreRequestModel = {
            storeId: localStorage.getItem('storeId')!,
            pageNumber: 0,
        }

        router.push("/content");


    }

    async function handleGenerateOtp(): Promise<void>{
        setLoading(true);
        const otpRequestData: SendOTPRequestModel = {
            mobileNumber: `+91${phone}`
        }
        if(!isValidPhone){
            setLoading(false);
            return;
        }
        const response = await HandleLogin.requestOTP(otpRequestData);
        if(response.success){
            setShowOtp(true);
            setIsRequestOtpFails(false);

        }
        else{
            setIsRequestOtpFails(true);
        }
        setLoading(false);
        setShowSnackbar({
            show: true,
            message: response.message,
            time: 3000
        });
    }
    return (
        <main className="relative flex flex-col items-center justify-center h-screen bg-white overflow-hidden">
            {
                showSnackbar.show &&
                <ShowSnackbar message={showSnackbar.message} time={showSnackbar.time} onClose={closeSnackbar}/>
            }
            Big circle
            <div className="absolute -top-[400px] lg:-top-[600px] -left-96 h-[1000px] lg:h-[1200px] w-[1000px] lg:w-[1200px] rounded-full bg-green-100"></div>
            <div className="absolute  -bottom-20 -left-28 h-[300px] w-[300px] rounded-full bg-green-300"></div>
            {/*X-----*/}
            <div className="flex items-center absolute z-10 top-12 left-[6vw] lg:left-[14vw] select-none">
                <h1 className="text-green-300 font-bold text-7xl">X</h1>
                <div className="bg-green-300 h-4 w-56"></div>
            </div>
            {/*Right side*/}
            <div className="absolute h-[50vh] w-20 top-0 right-0 bg-green-100"></div>
            <div className="absolute h-[50vh] w-20 bottom-0 right-0 bg-green-200"></div>
            <div className="absolute h-20 w-20 bg-green-200 top-[45%] rounded-full right-0"></div>
            <div className="absolute h-20 w-20 bg-green-100 top-[47%] rounded-full right-0"></div>
            <div className="absolute h-20 w-20 bg-green-200 top-[49%] rounded-full right-0"></div>
            <div className="absolute h-20 w-20 bg-green-100 top-[51%] rounded-full right-0"></div>
            {/* HardCopy text */}
            <div className="absolute bottom-24 right-4 lg:right-8 select-none">
                <h1 className="text-green-300 font-bold text-5xl lg:text-6xl">HardCopy</h1>
                <div className="absolute right-36 lg:right-44 -bottom-5 bg-green-300 h-4 w-40 lg:w-56"></div>
            </div>
            <div className=" relative z-[1] bg-white flex flex-col items-center justify-center p-6 h-[60vh] lg:h-[70vh] w-[30vw] lg:w-[25vw] border-[1px] border-black shadow-2xl radius rounded-3xl">
                <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-between py-10 gap-8 border-[1px] border-black rounded-3xl shadow-2xl">
                    <h1 className="text-green-300 font-bold text-[4vw] lg:text-[3vw] select-none">Welcome</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className={`${ showOtp ? 'translate-x-[1000%]': 'translate-x-0'} flex items-center absolute text-green-300 transition duration-300`}>
                            <div className={`flex flex-col items-center mb-5 ml-3`}>
                                <p className={`text-black`}>🇮🇳</p>
                                <p className={`text-black text-xl`}>+91</p>
                            </div>
                            <div className={`${isValidPhone ? 'mb-2' : '-mb-3'} flex flex-col`}>
                                <input className={`w-[90%] border-b-[1px] border-black focus:border-b-[1px] focus:outline-none  p-2 m-2 bg-white text-green-300 text-[1.5vw] lg:text-[1.5vw] transition duration-300`} type="text" placeholder="Phone Number" onChange={(e) => handlePhoneChange(e.target.value)} />
                                {!isValidPhone && <p className={`text-red-600 text-sm`}>Please enter a valid phone number.</p>}
                            </div>
                        </div>

                        <input className={`${showOtp ? 'translate-x-0' : 'translate-x-[1000%]'} border-b-[1px] border-black focus:border-b-[1px] focus:outline-none  p-2 m-2 bg-white text-green-300 text-[1.5vw] lg:text-[1.2vw]`} type="text" placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />

                    </div>
                    {/*<div className="flex flex-col items-center justify-center select-none">*/}
                    {/*    <button onClick={handleLogin} className="text-white rounded-xl bg-green-300 px-[4vw] py-[0.5vw]">Get OTP</button>*/}
                    {/*</div>*/}
                    {showOtp &&
                        <p onClick={handleGenerateOtp} className="text-green-300 text-[1.5vw] lg:text-[1vw] font-bold !select-none cursor-pointer">Resend OTP</p>

                    }

                    <div className="flex flex-col items-center justify-center select-none">
                        <button onClick={showOtp ? handleLogin : handleGenerateOtp} className="text-white rounded-xl bg-green-300 px-[4vw] py-[0.5vw]">{
                            loading ?
                                    <div className="flex justify-center items-center">
                                        <div className="border-t-2 border-white border-solid rounded-full w-8 h-8 animate-spin"></div>
                                    </div> :
                                showOtp ?
                                    'Login' :
                                'Generate OTP'
                        }</button>
                    <div className={`${isRequestOtpFails ? 'block' : 'hidden'}`}>
                        <p className={`text-green-300 text-xs pt-6 mx-3 font-bold text-center`}>Sorry, But you are not connected with us
                            <span className={`text-blue-100 cursor-pointer`}> Become our partner</span> or <span className={`text-blue-100 cursor-pointer`}>Download our app</span>
                        </p>

                    </div>

                    </div>

                </div>
            </div>
        </main>
    )
}