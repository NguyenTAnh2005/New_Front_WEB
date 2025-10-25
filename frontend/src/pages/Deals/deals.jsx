import { Product_Deals } from "../../components/product_deals.jsx";
import { eg_deal } from "./data.js";

export function DealsPage() {
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/";

    const dealsList = [];
    for (let i = 0; i < 10; i++) {
        dealsList.push(
            <Product_Deals key={"deal" + i} baselink={base_link} p_sale={eg_deal[0]}
                max_width="200px" fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} />
        );
    }

    return (
        <div className="py-5 flex flex-col relative animate__animated animate__fadeIn">
            <div className="text-center mb-5">
                <p className="text-[50px] font-semibold text-mainCL">Deals Page</p>
                <p className="text-[20px] text-gray-600">Amazing deals on phones!</p>
            </div>
            <div className={`grid gap-4 px-5 grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-[95%] mx-auto`}>
                {dealsList}
            </div>
        </div>
    );
}