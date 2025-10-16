import { useState } from "react"
import { Link } from "react-router-dom";
export function LogIn() {
    const [showPass, setShowPass] = useState(false);
    function changeModePass() {
        return setShowPass(!showPass);
    }
    return (
        <div className="border border-gray-300 border-1 rounded-2xl bg-white text-gray-500
        w-full max-w-[400px] px-10 py-10 text-[16px] z-0">
            <div className="text-center mb-7">
                <p className="text-black text-[28px] font-bold">
                    Welcome Back!
                </p>
                <p>Sign in to continue to your account</p>
            </div>
            <div className=" flex flex-col mb-4">
                <label htmlFor="" className="text-black font-semibold mb-1 -translate-x-2">Email Address</label>
                <div className="flex relative">
                    <input type="email"
                        placeholder="Enter your email"
                        className="w-full border border-1 border-gray-400
                        rounded-md py-1 focus:outline-none indent-[40px] text-gray-600" />
                    <i className="bi bi-envelope absolute text-mainCL text-[20px] 
                    rounded-md top-0.5 left-0 translate-x-[50%] "></i>
                </div>
            </div>
            <div className=" flex flex-col relative mb-2">
                <label htmlFor="" className="text-black font-semibold mb-1 -translate-x-2">Password</label>
                <div className="flex relative">
                    <input type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-[100%] border border-1 border-gray-400
                        rounded-md py-1 focus:outline-none indent-[40px] text-gray-600" />
                    <i className="bi bi-lock absolute text-mainCL text-[20px] 
                    rounded-md top-0.5 left-0 translate-x-[50%] "></i>
                </div>
                <i onClick={changeModePass}
                    className={` text-mainCL text-[18px] absolute top-[50%] right-[2%] 
                    bi ${showPass ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
            </div>
            <div className="text-xs font-semibold text-mainCL text-end">
                <a href="">forgot password?</a>
            </div>
            <button type="submit"
                className="bg-mainCL w-full rounded-lg mt-5 text-white text-[20px] font-semibold
                items-center py-1 mb-2">
                Log In
            </button>
            <div className="relative mb-4 mt-4">
                <hr className="border-gray-300 border-1 mx-5" />
                <span className="absolute ml-[50%] px-3 text-mainCL font-medium bg-white top-0 left-0 -translate-x-[50%] -translate-y-[50%]">
                    or
                </span>
            </div>
            <div className="flex justify-center">
                <span>Dont have an account?</span>
                <span className="text-mainCL font-bold ms-2">Sign Up</span>
            </div>
            <Link to="/Home">
                Continue without account?
            </Link>
        </div>
    )
}