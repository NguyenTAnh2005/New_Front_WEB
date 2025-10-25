import { ArticleCard } from "../../components/article_card.jsx";
import { eg_article } from "./data.js";

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
        <div className="py-5 flex flex-col relative animate__animated animate__fadeIn">
            <div className="text-center mb-5">
                <p className="text-[50px] font-semibold text-mainCL">Articles Page</p>
                <p className="text-[20px] text-gray-600">Latest news and insights about phones.</p>
            </div>
            <div className={`grid gap-4 px-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-[90%] mx-auto`}>
                {articlesList}
            </div>
        </div>
    );
}