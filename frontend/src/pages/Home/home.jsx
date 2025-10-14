import { useState } from "react"
import { ProductCard } from "../../components/product_card"
import { ArticleCard } from "../../components/article_card"
import { data_product, data_article, data_service } from "./data.js"
import banner_img from "../../assets/chess.png"
import eg_img from "../../assets/eg1.png"

export function HomePage() {
    const [products, setProducts] = useState(data_product);
    const [articles, setArticles] = useState(data_article);
    const [services, setService] = useState(data_service);
    const copy_products = products.map(p => {
        return <ProductCard key={p.id + p.version} product={p} />
    });
    const copy_articles = articles.map(a => {
        return <ArticleCard article={a} key={a.id} />
    })

    return (
        <>
            <Home_Banner services={services} />
            <div className="mt-10 flex flex-col items-center bg-white py-5">
                <p className="text-black text-[50px] font-semibold capitalize">Popular Phones</p>
                <p className="text-[24px] text-gray-600">Discover our best-selling phones</p>
                <div className="mt-10 px-5 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-7 gap-y-7">
                    {copy_products}
                </div>
                <button className="mt-10 capitalize text-mainCL font-semibold text-[24px] rounded-xl px-3 py-1 hover:scale-90 hover:bg-mainCL hover:-translate-y-1 hover:text-white transition-all duration-300 ease-linear"> View All Phones</button>
            </div>
            <div className="mt-10 flex flex-col items-center bg-white py-5">
                <p className="text-black text-[50px] font-semibold capitalize">Latest Technology Article </p>
                <p className="text-[24px] text-gray-600">Stay updated with tech news and reviews</p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7">
                    {copy_articles}
                </div>
                <button className="mt-10 capitalize text-mainCL font-semibold text-[24px] rounded-xl px-3 py-1 hover:scale-90 hover:bg-mainCL hover:-translate-y-1 hover:text-white transition-all duration-300 ease-linear"> View All Articles</button>
            </div>
            <Product_Deals />
        </>

    )

}

function Home_Banner({ services }) {
    const copy_services = services.map(s => {
        return <Service_Item service={s} key={s.id} />
    })
    return (
        <div className="flex flex-col lg:flex-row md:items-center py-5">
            <div className="flex flex-col w-full lg:w-[50%]">
                <p className="text-black text-center text-[45px] font-medium mb-1">Discover Your Perfect Phone</p>
                <p className="text-gray-600 text-center text-[16px] mb-10">Get the latest smartphones with exclusive deals and fast delivery. Premium quality at unbeatable prices.</p>
                <div className="flex justify-evenly">
                    {copy_services}
                </div>
            </div>
            <div className="w-full lg:w-[50%] rounded-2xl">
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
function Deals() {

}
function Product_Deals() {
    return (
        <div className="flex justify-between w-full min-h-[250px] max-w-[500px] text-deal_CL1 bg-deal_CL2">
            <div>
                <p className="text-[24px] font-semibold">SAMSUNG Galaxy S23 Ultra</p>
                <p className="text-white line-through">11.455.000</p>
                <p className="text-yellow-300 line-through italic">6.599.000</p>
                <p className="text-[24px] font-bold">5.549.000</p>
                <button>View Infomation</button>
            </div>
            <div className="w-[35%]">
                <img src={eg_img} className="w-full" />
            </div>
        </div>
    )
}