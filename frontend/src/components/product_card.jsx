import { useEffect, useState } from "react"
export function ProductCard({ product, baselink, max_width = "300px", fs_title = "xl", fs_text = "base", fs_desc = "xs", hover_out = true }) {
    const [favorite, setFavorite] = useState(false);
    function changeStatefavorite() {
        setFavorite(!favorite);
    }
    return (
        <div
            className={`flex flex-col w-full max-w-[${max_width} ] border rounded-2xl border-gray-200 p-2 pb-4 group mx-auto overflow-hidden
         hover:shadow-lg hover:shadow-mainCL hover:border-mainCL hover:-translate-y-1 
         transition-all duration-300 ease-linear bg-white relative text-${fs_text}`}>
            <div className="rounded-lg overflow-hidden">
                <img src={`${baselink}${product.img_link}`}
                    className="w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 aspect-square object-cover" loading="lazy"
                    alt={product.name} />
            </div>
            <span
                title={product.name}
                className={`mt-2 text-${fs_title} truncate font-semibold font-sans text-mainCL`}>
                {product.name}
            </span>
            <span className={`text-${fs_desc} mb-3`}>{product.desc} </span>
            <div className="flex justify-between mx-2 items-center mt-2">
                <span className="capitalize text-gray-500">Original Price</span>
                <span
                    title="Original Price"
                    className={`line-through text-${fs_text} font-thin text-gray-500`}>{product.org_price}.000 đ
                </span>
            </div>
            <div className="flex justify-between mx-2">
                <span className="capitalize font-semibold">New Price</span>
                <span
                    title="New Price"
                    className={`text-mainCL align-text-bottom font-sans font-bold text-${fs_title}`}>
                    {product.new_price}.000 đ
                </span>
            </div>
            <hr className="h-[1px] border-gray-200" />

            <div className="mt-5 flex justify-between">
                <button className={`min-w-fit bg-mainCL px-3 py-1 capitalize hover:scale-90 text-${fs_text} 
                  text-white rounded-lg transition-all duration-300 ease-linear`}>
                    <i className="bi bi-cart-plus"></i>
                    <span className="ms-2 text-[18px]">add to cart</span>
                </button>
                <button
                    title="List Favorite" onClick={changeStatefavorite}
                    className={`px-3 rounded-lg text-${fs_text} border border-1 ${!favorite ? "border-mainCL bg-white text-mainCL" : "border-white bg-mainCL text-white"} transition-all duration-300 ease-linear`}>
                    <i className="bi bi-heart"></i>
                </button>
            </div>
            <div className={`flex bg-mainCL absolute top-2 px-2 left-2 rounded-lg text-white font-semibold text-${fs_text} 
            -translate-y-9 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-linear`}>
                <i className="ri-arrow-down-long-line"></i>
                <span>{product.discount}</span>
            </div>
        </div>
    )
}