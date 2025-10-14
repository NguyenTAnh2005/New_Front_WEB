import { useState } from "react"
import { ProductCard } from "../../components/product_card"
import { ArticleCard } from "../../components/article_card"
import { data_product } from "../../components/data_product"
import { data_article } from "../../components/data_article"

export function HomePage() {
    const [products, setProducts] = useState(data_product);
    const [articles, setArticles] = useState(data_article);
    const copy_products = products.map(p => {
        return <ProductCard key={p.id + p.version} product={p} />
    });
    const copy_articles = articles.map(a => {
        return <ArticleCard article={a} key={a.id} />
    })

    return (
        <>
            <div>
                <div className="px-5 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 gap-y-10">
                    {copy_products}
                </div>
                <div></div>
            </div>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 gap-y-10">
                    {copy_articles}
                </div>
            </div>
        </>

    )

}