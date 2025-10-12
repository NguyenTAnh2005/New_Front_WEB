import { data_product } from "./data_product";
import egimg1 from "../assets/eg1.png"
import { useState } from "react";
export function ProductCard() {
    const [favorite, setFavorite] = useState();
    return (
        <div className="flex flex-col w-[275px] border rounded-2xl border-gray-200 p-3 group mx-auto mt-10 overflow-hidden
         hover:shadow-lg hover:shadow-mainCL hover:border-mainCL 
         transition-all duration-300 ease-linear">
            <div className="rounded-lg overflow-hidden">
                <img
                    src={egimg1}
                    className="w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                    alt="product"
                />
            </div>
            <span
                title="iPhone 14 Promax"
                className="mt-2 text-[20px] truncate font-semibold font-sans text-mainCL">
                iPhone 14 Pro Max
            </span>
            <span className="text-[14px]">6.75 inch | Dimensity 1200 Ultra </span>
            <span
                title="Original Price"
                className="mt-3 line-through text-[18px] font-thin text-gray-500">9.499.000</span>

            <span
                title="New Price"
                className="text-mainCL align-text-bottom font-sans font-bold text-2xl">
                4.599
                <span className="text-xs font-bold me-2">.000</span>
                đ
            </span>

            <div className="mt-5 flex justify-between">
                <button className="min-w-fit bg-mainCL px-3 py-1 capitalize hover:scale-90
                 text-2xl text-white rounded-lg transition-all duration-300 ease-linear">
                    <i class="bi bi-cart-plus"></i>
                    <span className="ms-2">add to cart</span>
                </button>
                <button
                    title="List Favorite"
                    className="bg-white px-3 text-mainCL rounded-lg text-xl
                 border border-1 border-mainCL hover:text-white hover:border-white hover:bg-mainCL hover:scale-95
                 transition-all duration-300 ease-linear">
                    <i className="ri-poker-hearts-line"></i>
                </button>
            </div>
        </div>
    )
}