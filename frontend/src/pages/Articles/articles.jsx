import { ArticleCard } from "../../components/article_card.jsx";
import { eg_article } from "./data.js";
import { scrollToTopSmooth } from "../../utils/scroll_top_smooth.jsx"


export function ArticlesPage() {
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/";

    const articlesList = [];
    for (let i = 0; i < 8; i++) {
        articlesList.push(
            <ArticleCard key={"article" + i} baselink={base_link} article={eg_article[0]}
                fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} />
        );
    }

    return (
        <>
            {scrollToTopSmooth()}
            <div className="flex justify-center">
                <SearchBar />
            </div>
            <div className="py-5 flex flex-col relative animate__animated animate__fadeIn">
                <div className="text-center mb-5">
                    <p className="text-[50px] font-semibold text-mainCL">Articles Page</p>
                    <p className="text-[20px] text-gray-600">Latest news and insights about phones.</p>
                </div>
                <div className={`grid gap-4 px-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-[90%] mx-auto`}>
                    {articlesList}
                </div>
            </div>
            <div className="my-10">
                <Pagination />
            </div>
        </>
    );
}
function SearchBar() {
    return (
        <div className="flex my-5 w-[75%] md:w-[50%]">
            <input type="text" className="w-full px-5 rounded-l-md py-2 outline-none" placeholder="Seach Article....." />
            <button type="button">
                <i className="bi bi-search py-2 bg-mainCL text-white px-3 rounded-r-md"></i>
            </button>
        </div>
    )
}

function Pagination() {
    return (
        <>
            <div className=" w-[55%] lg:w-[30%] mx-auto flex justify-center gap-1">
                <CellControl control={"Prev"} />
                <Cell index_page={"Page 1"} />
                <CellControl control={"Next"} />
            </div>
            <div className="mx-auto flex justify-center mt-3 items-center">
                <span className="me-5">Go to page:</span>
                <input type="number" className="outline-none indent-4 w-20 py-1 rounded-l-md border border-gray-400" />
                <button className="bg-mainCL text-white text-base px-2 py-1 rounded-r-md border border-mainCL" >OK</button>
            </div>
        </>
    )
}
//============================== PHẦN CELL PAGINATION
function Cell({ index_page }) {
    return (
        <div
            title={`Go to page ${index_page}`}
            className="text-mainCL text-base bg-white px-2 py-2 cursor-pointer font-semibold border border-gray-300">
            <span>{index_page}</span>
        </div>
    )
}
//============================== PHẦN CELL CONTROL PAGINATION
function CellControl({ control }) {
    return (
        <div
            title={`Go to ${control} page`}
            className="text-mainCL text-base bg-white px-2 py-2 cursor-pointer font-semibold border border-gray-300">
            <span>{control}</span>
        </div>
    )
}