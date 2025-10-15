import { useState, useEffect } from "react"
import { ProductCard } from "../../components/product_card"
import { ArticleCard } from "../../components/article_card"
import { Product_Deals } from "../../components/product_deals.jsx"
import { data_product, data_article, data_service, data_sale } from "./data.js"
import banner_img from "../../assets/chess.png"

export function HomePage() {
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"
    const [products, setProducts] = useState([]);
    const [articles, setArticles] = useState([]);
    const [pSales, setPSales] = useState([]);
    const [services, setService] = useState(data_service);
    useEffect(() => {
        async function loadAllData() {
            const [product_data, article_data, deal_data] = await Promise.all([
                /* Với file json thì vite cấu hình nên để ngoài thư mục src,
                 thường để trong public và với các file public khi import path 
                 thi tự dộng cd về root sẵn nên ko cần ../ hay ./ = FROM CHAT GPT = 
                 => KO hiểu lắm => Tính năng mới (0`_o)  \(0 o 0)/ @_@*/
                fetchJsonToListObj("/products.json"),
                fetchJsonToListObj("/articles.json"),
                fetchJsonToListObj("/deals.json")
            ]);
            setProducts(product_data);
            setPSales(deal_data);
            setArticles(article_data);
        }
        loadAllData();
    }, []);
    /* Lam fetc co tung list thi hoi loang ngoang, ket hop voi promise de fetch chung 1 lan tien hon - Cre Chat GPT*/
    // useEffect(() => {
    //     async function fetchData() {
    //         const data = await fetchJsonToListObj("/products.json");
    //         setProducts(data);
    //     }
    //     fetchData();
    // }, []);
    const copy_products = products.map(p => {
        return <ProductCard key={p.id + p.version} product={p} baselink={base_link} />
    });

    const copy_articles = articles.map(a => {
        return <ArticleCard article={a} key={a.id} baselink={base_link} />
    });

    const copy_pSales = pSales.map(ps => {
        return <Product_Deals p_sale={ps} key={ps.id} baselink={base_link} />
    });

    return (
        <>
            <Home_Banner services={services} />
            <div className="flex flex-col items-center bg-white pt-5 pb-10 px-5">
                <p className="text-black text-[50px] font-semibold capitalize mt-10 text-center">Popular Phones</p>
                <p className="text-[24px] text-gray-600 text-center">Discover our best-selling phones</p>
                <div className="mt-10 px-5 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-7 gap-y-7">
                    {copy_products}
                </div>
                <button className="mt-10 capitalize text-mainCL font-semibold text-[24px] rounded-xl px-3 py-1 hover:scale-90 hover:bg-mainCL hover:-translate-y-1 hover:text-white transition-all duration-300 ease-linear"> View All Phones</button>
            </div>
            <div className="flex flex-col items-center bg-black pt-5 pb-10 px-5">
                <p className="text-white text-[50px] font-semibold capitalize mt-10 text-center">Special Deals</p>
                <p className="text-[24px] text-gray-600 text-center">Limited time offers - Don't miss out!</p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7">
                    {copy_pSales}
                </div>
                <button className="mt-10 capitalize text-mainCL font-semibold text-[24px] rounded-xl px-3 py-1 hover:scale-90 hover:bg-mainCL hover:-translate-y-1 hover:text-white transition-all duration-300 ease-linear"> View All Deals</button>
            </div>
            <div className="flex flex-col items-center bg-white pt-5 pb-10 px-5">
                <p className="text-black text-[50px] font-semibold capitalize mt-10 text-center">Latest Technology Article </p>
                <p className="text-[24px] text-gray-600 text-center">Stay updated with tech news and reviews</p>
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
                <div className=" grid gap-5 mx-5 grid-cols-2 md:grid-cols-4">
                    {copy_services}
                </div>
            </div>
            <div className="w-full lg:w-[40%] rounded-2xl">
                <img src={banner_img} className="w-[80%] mx-auto mt-10 lg:mt-0 shadow-2xl rounded-2xl" loading="lazy" alt="BANNER" />
            </div>
        </div>
    )
}
function Service_Item({ service }) {
    return (
        <div className="flex flex-col bg-white items-center p-1 rounded-xl border border-1 border-white hover:shadow-mainCL hover:shadow-md hover:border-mainCL  hover:-translate-y-1 transition-all duration-300 ease-linear">
            <i className={`${service.cls_icon} text-[35px] text-mainCL`}></i>
            <p className="text-[18px] font-semibold text-center">{service.title}</p>
            <p className="text-gray-600 text-[12px] text-center">{service.desc}</p>
        </div>
    )
}

async function fetchJsonToListObj(src_fetch) {
    try {
        const response = await fetch(src_fetch);
        !response.ok && { throw: new Error("Loading") }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Loi Fetch DL:" + error);
        return [];
    }
}
