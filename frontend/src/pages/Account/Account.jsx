import { useState } from "react";
import { account } from "./data";
import { priceFormatter } from "../../utils/format_price"
import { Link, Outlet, useNavigate } from "react-router-dom";

const base_link = "/Account"
export function Account() {
    return (
        <div className="bg-gray-300 py-10">
            <div>
                <AccountPart1 acc={account} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 w-[90%] mx-auto mt-5 gap-5">
                <AccountNavBar />
                <div className="lg:col-span-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

function AccountPart1({ acc }) {
    return (
        <div className=" flex justify-evenly bg-white w-[90%] mx-auto p-5 rounded-xl border border-gray-300">
            <div className="flex gap-2 ">
                <div className="ml-5 bg-orange-200 rounded-full p-4">
                    <i className="bi bi-person-gear text-5xl text-mainCL"></i>
                </div>
                <div className="flex flex-col justify-center text-lg">
                    <p className="font-bold">{acc.account_last_name} {acc.account_first_name}</p>
                    <p>{acc.account_email}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="bg-[#39FF14] flex items-center rounded-full p-4">
                    <i className="bi bi-cart-check text-5xl "></i>
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <span className="text-xl">So don hang da mua: <span className="font-bold">2</span></span>
                    <span className="text-xl">So tien tich luy: <span className="font-bold text-mainCL">{priceFormatter("10000000")}</span> ₫</span>
                </div>
            </div>
        </div>
    )
}
function AccountNavBar() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row lg:flex-col lg:gap-2 bg-white rounded-md overflow-hidden py-3 px-3">
            <AccountNavBarItem content={"Thong tin khach hang"} link={"info1"} />
            <AccountNavBarItem content={"Thong tin bao mat"} link={"info2"} />
            <AccountNavBarItem content={"So dia chi"} link={"address"} />
            <AccountNavBarItem content={"Theo doi don hang"} link={"order"} />
            <AccountNavBarItem content={"Chinh sach bao mat"} link={"policy"} />
            <div className="font-semibold py-2 indent-2 cursor-pointer rounded-md relative"
                onClick={() => navigate('/')}>
                Dang Xuat
            </div>
        </div>
    )

}
import { NavLink } from "react-router-dom";

function AccountNavBarItem({ content, link }) {
    return (
        <NavLink
            to={link}
            className={({ isActive }) =>
                `font-semibold py-2 indent-2 cursor-pointer rounded-md relative ${isActive ? "bg-orange-300" : ""}`
            }
        >
            {({ isActive }) => (
                <>
                    {content}
                    <div className={`absolute top-0 -translate-x-4 h-full w-1 rounded-md ${isActive ? "bg-mainCL" : ""}`}></div>
                </>
            )}
        </NavLink>
    )
}
// ${choose === link && "bg-orange-300"}