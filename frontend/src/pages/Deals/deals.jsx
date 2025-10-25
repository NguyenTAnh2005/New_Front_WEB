import { Product_Deals } from "../../components/product_deals.jsx";
import { eg_deal } from "./data.js";
import { scrollToTopSmooth } from "../../utils/scroll_top_smooth.jsx"

export function DealsPage() {
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/";

    const dealsList = [];
    for (let i = 0; i < 10; i++) {
        dealsList.push(
            <Product_Deals key={"deal" + i} baselink={base_link} p_sale={eg_deal[0]}
                max_width="200px" fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} hover_out={false} />
        );
    }
    const dealsListWeek = [];
    for (let i = 0; i < 5; i++) {
        dealsListWeek.push(
            <Product_Deals key={"deal" + i} baselink={base_link} p_sale={eg_deal[0]}
                max_width="200px" fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} hover_out={false} />
        );
    }

    return (
        <>
            {scrollToTopSmooth()}
            <div className="flex flex-col relative animate__animated animate__fadeIn">
                {/* =================== TIÊU ĐỀ CHUNG =================== */}
                <div className="text-center text-mainCL bg-white py-5">
                    <span className="text-4xl font-semibold capitalize ">
                        <i className="bi bi-cart4 text-5xl"></i> các ưu đãi hấp dẫn
                    </span>
                    <p className="text-base mt-3 font-semibold">
                        Đừng bỏ lỡ: Tổng hợp các chương trình giảm giá và khuyến mãi đặc biệt từ các thương hiệu hàng đầu.
                    </p>
                </div>

                {/* =================== OCTOBER SALE =================== */}
                <div className="flex flex-col justify-evenly items-center gap-3 bg-saleGradient text-white text-2xl py-10 px-5">
                    <span className="flex items-center gap-3">
                        <span className="text-5xl font-medium">October's Sale</span>
                    </span>

                    <div className="flex justify-center gap-2 text-base font-semibold mb-8">
                        <Date dd={2} dd_top={"nd"} mm={"Oct"} yy={2025} />
                        <i className="bi bi-arrow-right text-xl"></i>
                        <Date dd={29} dd_top={"nd"} mm={"Oct"} yy={2025} />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-[95%] mx-auto gap-x-4 gap-y-6 items-stretch">
                        {dealsList}
                    </div>
                </div>

                {/* =================== BLACK WEEK =================== */}
                <div className="bg-black text-white py-14 mt-0">
                    <div className="text-center font-semibold">
                        <p className="text-5xl font-semibold uppercase">Black Week</p>
                        <div className="flex gap-3 justify-center mt-5 mb-8 items-center">
                            <Date dd={25} dd_top={"th"} mm={"Oct"} yy={2025} />
                            <i className="bi bi-arrow-right text-xl"></i>
                            <Date dd={31} dd_top={"th"} mm={"Oct"} yy={2025} />
                        </div>
                    </div>
                    <div className="grid gap-x-4 gap-y-6 px-5 grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-[95%] mx-auto items-stretch">
                        {dealsListWeek}
                    </div>
                </div>
            </div>
        </>
    );
}
function Date({ dd, dd_top, mm, yy }) {
    return (
        <span>
            {mm}, {dd}<sup>{dd_top}</sup>, {yy}
        </span>
    )
}