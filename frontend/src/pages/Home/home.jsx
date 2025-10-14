import { useState } from "react"
import { ProductCard } from "../../components/product_card"
import { ArticleCard } from "../../components/article_card"
import { data_product, data_article, data_service, data_sale } from "./data.js"
import banner_img from "../../assets/chess.png"
import eg_img from "../../assets/eg1.png"

export function HomePage() {
    const [products, setProducts] = useState(data_product);
    const [articles, setArticles] = useState(data_article);
    const [services, setService] = useState(data_service);
    const [pSales, setPSales] = useState(data_sale);
    const copy_products = products.map(p => {
        return <ProductCard key={p.id + p.version} product={p} />
    });
    const copy_articles = articles.map(a => {
        return <ArticleCard article={a} key={a.id} />
    });
    const copy_pSales = pSales.map(ps => {
        return <Product_Deals p_sale={ps} key={ps.id} />
    });

    return (
        <>
            <Home_Banner services={services} />
            <div className="flex flex-col items-center bg-white pt-5 pb-10">
                <p className="text-black text-[50px] font-semibold capitalize mt-10">Popular Phones</p>
                <p className="text-[24px] text-gray-600">Discover our best-selling phones</p>
                <div className="mt-10 px-5 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-7 gap-y-7">
                    {copy_products}
                </div>
                <button className="mt-10 capitalize text-mainCL font-semibold text-[24px] rounded-xl px-3 py-1 hover:scale-90 hover:bg-mainCL hover:-translate-y-1 hover:text-white transition-all duration-300 ease-linear"> View All Phones</button>
            </div>
            <div className="flex flex-col items-center bg-black pt-5 pb-10 ">
                <p className="text-white text-[50px] font-semibold capitalize mt-10">Special Deals</p>
                <p className="text-[24px] text-gray-600">Limited time offers - Don't miss out!</p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7">
                    {copy_pSales}
                </div>
                <button className="mt-10 capitalize text-mainCL font-semibold text-[24px] rounded-xl px-3 py-1 hover:scale-90 hover:bg-mainCL hover:-translate-y-1 hover:text-white transition-all duration-300 ease-linear"> View All Deals</button>
            </div>
            <div className="flex flex-col items-center bg-white pt-5 pb-10">
                <p className="text-black text-[50px] font-semibold capitalize mt-10">Latest Technology Article </p>
                <p className="text-[24px] text-gray-600">Stay updated with tech news and reviews</p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7">
                    {copy_articles}
                </div>
                <button className="mt-10 capitalize text-mainCL font-semibold text-[24px] rounded-xl px-3 py-1 hover:scale-90 hover:bg-mainCL hover:-translate-y-1 hover:text-white transition-all duration-300 ease-linear"> View All Article</button>
            </div>

        </>

    )

}

function Home_Banner({ services }) {
    const copy_services = services.map(s => {
        return <Service_Item service={s} key={s.id} />
    })
    return (
        <div className="flex flex-col lg:flex-row md:items-center py-10">
            <div className="flex flex-col w-full lg:w-[60%]">
                <p className="text-black text-center text-[45px] font-medium mb-1">Discover Your Perfect Phone</p>
                <p className="text-gray-600 text-center text-[16px] mb-10">Get the latest smartphones with exclusive deals and fast delivery. Premium quality at unbeatable prices.</p>
                <div className="flex justify-evenly">
                    {copy_services}
                </div>
            </div>
            <div className="w-full lg:w-[40%] rounded-2xl">
                <img src={banner_img} className="w-[60%] lg:w-[80%] mx-auto mt-10 lg:mt-0 shadow-2xl rounded-2xl" alt="" />
            </div>
        </div>
    )
}
function Service_Item({ service }) {
    return (
        <div className="flex flex-col bg-white items-center p-1 rounded-xl border border-1 border-white hover:shadow-mainCL hover:shadow-md hover:border-mainCL  hover:-translate-y-1 transition-all duration-300 ease-linear">
            <i className={`${service.cls_icon} text-[35px] text-mainCL`}></i>
            <p className="text-[18px] font-semibold">{service.title}</p>
            <p className="text-gray-600 text-[12px]">{service.desc}</p>
        </div>
    )
}
function Product_Deals({ p_sale }) {
    return (
        <div className="w-full max-w-[350px] border bg-white border-gray-300 rounded-xl mx-auto mt-10 overflow-hidden pb-5 shadow-sm relative group hover:-translate-y-2 hover:shadow-white  hover:shadow-2xl transition-all duration-300 ease-linear">
            <div className="m-3 overflow-hidden rounded-xl group">
                <img src={eg_img} className="w-full group-hover:scale-110 transition-transform duration-300 ease-linear" />
            </div>
            <div className="flex flex-col px-3">
                <span className="text-black font-semibold text-[20px] mb-2">{p_sale.name}</span>
                <div className="flex justify-between px-3 text-gray-500 mb-1">
                    <span className="capitalize">Original price: </span>
                    <span className="line-through">{p_sale.org_price} ₫</span>
                </div>
                <div className="flex justify-between px-3 text-slate-800">
                    <span className="capitalize">Store price:</span>
                    <span className="line-through">{p_sale.new_price} ₫</span>
                </div>
                <hr className=" border-[1px] mt-3 mb-1" />
                <div className="bg-orange-100 text-mainCL flex flex-col rounded-xl py-3 mt-2 border-mainCL border">
                    <div className="flex justify-between px-3 items-center">
                        <span className="font-semibold capitalize">Sale price:</span>
                        <span className="text-[24px] font-semibold">{p_sale.sale_price} ₫</span>
                    </div>
                    <span className="mx-auto mt-2">Save {Number(p_sale.org_price) - Number(p_sale.sale_price)} ₫ ({p_sale.discount} off)</span>
                </div>
                <a className="bg-mainCL mt-5 text-white text-center py-2 rounded-xl text-[20px] font-medium">View Details</a>
            </div>
            <div className="absolute bg-[#ff0000] text-white capitalize top-3 right-3 px-3 py-[0.5] rounded-full ">
                <i className="bi bi-tag"></i>
                <span className="ms-1">Sale</span>
            </div>
        </div>
    )
}