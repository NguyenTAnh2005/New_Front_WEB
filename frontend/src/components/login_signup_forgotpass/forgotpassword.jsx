import { Input } from "./input"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
export function ForgotPassword() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // Đóng modal khi nhấn "X"
    function closeModal() {
        setShowModal(false);
        navigate("/login");
    }


    return (
        <div className="flex items-center animate__animated animate__fadeIn">
            <div method="post" className="w-full text-gray-500 max-w-[350px] px-5 py-5 my-10 rounded-xl border-gray-300 border-[1px] mx-auto bg-white">
                <div className="text-center mb-5">
                    <p className="text-[28px] font-bold text-black">Having Trouble Log In?</p>
                    <p>No worries, let’s reset your password.</p>
                </div>
                <Input id_input={"fp_ip1"} type={"email"} label_content={"email"} cls_icon={"bi bi-envelope"} />
                <p className="my-2 text-center text-xs">Input your Email. We'll send new password to your email!</p>
                <button type=""
                    onClick={() => { setShowModal(true) }}
                    className="mt-2 bg-mainCL w-full text-white text-[18px] font-semibold rounded-lg">
                    Send
                </button>
            </div>
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center">
                        <div className="bg-white rounded-lg flex flex-col relative pt-2.5 p-5">
                            <p className="text-mainCL font-semibold mb-2 text-[20px]">Done</p>
                            <p className="text-xs">We have sent new password to your emai. Let's go!</p>
                            <i className="bi bi-x absolute right-5 top-2.5 text-[20px]" onClick={closeModal}></i>
                        </div>
                    </div>
                )
            }
        </div>
    )
}