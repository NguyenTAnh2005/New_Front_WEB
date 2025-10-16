export function Product_Deals({ p_sale, baselink }) {
    return (
        <div className="w-full max-w-[325px] border bg-white border-gray-300 rounded-xl mx-auto mt-10 overflow-hidden pb-5 shadow-sm relative group hover:-translate-y-2 hover:shadow-white  hover:shadow-2xl transition-all duration-300 ease-linear">
            <div className="m-3 overflow-hidden rounded-xl group">
                <img src={`${baselink}${p_sale.img_link}`} className="w-full group-hover:scale-110 transition-transform duration-300 ease-linear" loading="lazy" alt={p_sale.name} />
            </div>
            <div className="flex flex-col px-3">
                <span className="text-black font-semibold text-[20px] mb-2">{p_sale.name}</span>
                <div className="flex justify-between px-3 text-gray-500 mb-1">
                    <span className="capitalize">Original price: </span>
                    <span className="line-through text-[14px]">{p_sale.org_price} ₫</span>
                </div>
                <div className="flex justify-between px-3 text-slate-800">
                    <span className="capitalize">Store price:</span>
                    <span className="line-through text-[16px]">{p_sale.new_price} ₫</span>
                </div>
                <hr className=" border-[1px] mt-3 mb-1" />
                <div className="bg-orange-100 text-mainCL flex flex-col rounded-xl py-3 mt-2 border-mainCL border">
                    <div className="flex justify-between px-3 items-center">
                        <span className="font-semibold capitalize">Sale price:</span>
                        <span className="text-[20px] font-semibold">{p_sale.sale_price} ₫</span>
                    </div>
                    <span className="mx-auto mt-2">Save {Number(p_sale.org_price) - Number(p_sale.sale_price)} ₫ ({p_sale.discount} off)</span>
                </div>
                <button className="bg-mainCL mt-5 text-white text-center py-2 rounded-xl text-[20px] font-medium"><a href="">View Details</a></button>
            </div>
            <div className="absolute bg-[#ff0000] text-white capitalize top-3 right-3 px-3 py-[0.5] rounded-full ">
                <i className="bi bi-tag"></i>
                <span className="ms-1">Sale</span>
            </div>
        </div>
    )
}