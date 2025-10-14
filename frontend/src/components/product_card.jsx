import egimg1 from "../assets/eg1.png"
import { useEffect, useState } from "react"
export function ProductCard({ product }) {
    const [favorite, setFavorite] = useState(false);
    function changeStatefavorite() {
        setFavorite(!favorite);
    }
    return (
        <div
            className="flex flex-col w-full max-w-[350px] border rounded-2xl border-gray-200 p-2 pb-4 group mx-auto overflow-hidden
         hover:shadow-lg hover:shadow-mainCL hover:border-mainCL hover:-translate-y-1 
         transition-all duration-300 ease-linear bg-white relative">
            <div className="rounded-lg overflow-hidden">
                <img src={egimg1}
                    className="w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 aspect-square object-cover"
                    alt="product" />
            </div>
            <span
                title="iPhone 14 Promax"
                className="mt-2 text-[20px] truncate font-semibold font-sans text-mainCL">
                {product.name}
            </span>
            <span className="text-[14px]">{product.desc} </span>
            <span
                title="Original Price"
                className="mt-3 line-through text-[18px] font-thin text-gray-500">{product.org_price}.000</span>

            <span
                title="New Price"
                className="text-mainCL align-text-bottom font-sans font-bold text-2xl">
                {product.new_price}<span className="text-xs font-bold me-2">.000</span> đ
            </span>

            <div className="mt-5 flex justify-between px-5">
                <button className="min-w-fit bg-mainCL px-3 py-1 capitalize hover:scale-90
                 text-2xl text-white rounded-lg transition-all duration-300 ease-linear">
                    <i className="bi bi-cart-plus"></i>
                    <span className="ms-2">add to cart</span>
                </button>
                <button
                    title="List Favorite" onClick={changeStatefavorite}
                    className={`px-3  rounded-lg text-xl
                 border border-1 ${!favorite ? "border-mainCL bg-white text-mainCL" : "border-white bg-mainCL text-white"} transition-all duration-300 ease-linear`}>
                    <i className="ri-poker-hearts-line"></i>
                </button>
            </div>
            <div className="flex bg-mainCL absolute top-2 px-2 left-2 rounded-lg text-white font-semibold text-[16px] 
            -translate-y-9 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-linear">
                <i className="ri-arrow-down-long-line"></i>
                <span>{product.discount}</span>
            </div>
        </div>
    )
}