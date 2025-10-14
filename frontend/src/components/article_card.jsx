import chessImg from '../assets/chess.png'
import { useState } from 'react'

export function ArticleCard({ article }) {
    return (
        <div className='flex flex-col w-full max-w-[450px] border bg-white rounded-lg group hover:shadow-2xl
        hover:-translate-y-1 transition-all duration-300 ease-linear mx-auto'>
            <div className='overflow-hidden rounded-tr-lg rounded-tl-lg'>
                <img src={chessImg} className='w-full group-hover:scale-110 transition-transform ease-linear duration-300' />
            </div>
            <div className='flex flex-col px-3'>
                <p className='text-black font-medium text-[24px]'>
                    {article.title}
                </p>
                <p className='text-gray-500'>
                    {article.desc}
                </p>
                <a href={article.link} className='ml-auto text-[18px] py-2 mt-6 mb-3 flex text-mainCL transition-all duration-300 ease-linear
            group items-center '>
                    <p>Read More</p>
                    <i className="bi bi-arrow-right-short text-[24px] group-hover:translate-x-1 transition-all duration-300 ease-linear"></i>
                </a>
            </div>

        </div>
    )
}


// export function ArticleCard() {
//     return (
//         <div className='flex flex-col min-w-[350px] max-w-[500px] border bg-white rounded-lg group hover:shadow-2xl
//         hover:-translate-y-1 transition-all duration-300 ease-linear mx-auto mt-10'>
//             <div className='overflow-hidden rounded-tr-lg rounded-tl-lg'>
//                 <img src={chessImg} className='w-full group-hover:scale-110 transition-transform ease-linear duration-300' />
//             </div>
//             <div className='flex flex-col px-3'>
//                 <p className='text-black font-medium text-[24px]'>
//                     iPhone 15 vs Samsung Galaxy S24: The Ultimate Comparison
//                 </p>
//                 <p className='text-gray-500'>
//                     An in-depth comparison of two flagship devices that are competing for the top spot in the premium smartphone market.
//                 </p>
//                 <a href="" className='ml-auto text-[18px] py-2 mt-6 mb-3 flex text-mainCL transition-all duration-300 ease-linear
//             group items-center '>
//                     <p>Read More</p>
//                     <i className="bi bi-arrow-right-short text-[24px] group-hover:translate-x-1 transition-all duration-300 ease-linear"></i>
//                 </a>
//             </div>

//         </div>
//     )
// }
