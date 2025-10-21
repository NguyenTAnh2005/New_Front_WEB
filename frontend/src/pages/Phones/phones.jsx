import { useState, useEffect } from "react"
import { arr1_company, arr2_ram, arr3_rom, arr4_os, arr5_chip, arr_6_support, arr_7_price } from "./data";
import { fetchJsonToListObj } from "../../utils/fetch_async_await";
import { ProductCard } from "../../components/product_card";

export function PhonesPage() {
    const [arrPhones, setArrPhones] = useState([]);
    const [keySearch, setKeySearch] = useState("");
    const [expand, setExpand] = useState(true);
    function changeModeExpand() {
        setExpand((prev) => !prev);
    }
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"

    useEffect(() => {
        async function fetchData() {
            const response = await fetchJsonToListObj("/all-product.json");
            setArrPhones(response);
        }
        fetchData();
    }, []);


    return (
        <div className="my-5 flex relative">
            <div className={`transition-all ease-out duration-500 ${expand ? "min-w-[320px] max-w-[320px] " : "min-w-0 max-w-0"} px-2 `}>
                <Filter expand={expand} changeModeExpand={changeModeExpand} />

            </div>
            <div className={`flex-grow-1`}>
                <div className={`grid gap-4 px-5 ${expand ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-6"}`}>
                    <List_Phones keySearch={keySearch} products={arrPhones} base_link={base_link} />
                </div>
            </div>
        </div>
    )
}

// ============================= PHẦN FILTER
function Filter({ expand, changeModeExpand }) {

    return (
        <>
            <div className={`w-full transition-all ease-in-out duration-500 ${expand ? "opacity-100" : "opacity-0"}`}>
                <div className="flex justify-between bg-mainCL text-white w-full px-2 text-[20px] font-semibold items-center rounded-t-md">
                    <i className="bi bi-funnel"></i>
                    <span className="text-[24px] font-semibold">Filter</span>
                    <div onClick={changeModeExpand} className={`transition-transform duration-300 ease-linear rotate-90`}>
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
                <div className={` flex flex-col max-h-[600px] overflow-y-scroll  bg-white rounded-b-lg border-[1px] border-gray-300`}>
                    <div className="mt-5 px-2">
                        <FilterPart arr={arr1_company} title={"Brand"} cls_icon={"bi bi-buildings-fill"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={arr2_ram} title={"Ram"} cls_icon={"bi bi-memory"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={arr3_rom} title={"Rom"} cls_icon={"bi bi-database-fill"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={arr4_os} title={"Operating System"} cls_icon={"bi bi-android2"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={arr5_chip} title={"Chip"} cls_icon={"bi bi-cpu-fill"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={arr_6_support} title={"Suport"} cls_icon={"bi bi-plus-circle-fill"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPartPrice arr={arr_7_price} title={"Price"} cls_icon={"bi bi-cash-coin"} />
                    </div>
                    <button type="button" className="mt-5 mb-10 bg-mainCL text-white text-[20px] py-1 w-[90%] mx-auto rounded-md">
                        <span>Filter</span>
                    </button>
                </div>
            </div>
            <div className={`bg-white text-mainCL text-[20px] p-0 py-1 px-2 z-10 rounded-full transition-all ease-in-out duration-500 ${expand ? " opacity-0 -translate-x-full" : "opacity-100 translate-x-0"} absolute top-0`}>
                <i className="bi bi-funnel-fill" onClick={changeModeExpand}></i>
            </div>
        </>
    )
}
function CheckBoxValueOfFilter({ id_input, content }) {
    const [clicked, setClicked] = useState(false);
    function changeModeInput() {
        setClicked((prev) => !prev);
    }

    return (
        <div className="px-2">
            <input type="checkbox" name={id_input} id={id_input} className="hidden" checked={clicked} onChange={changeModeInput} />
            <label htmlFor={id_input} className="cursor-pointer flex items-center">
                <i
                    className={`block text-green-600 text-[20px] transform bi 
                        ${clicked ? "bi bi-bookmark-plus-fill" : "bi bi-bookmark-plus"}`}>
                </i>
                <span className="ms-1 flex gap-1">
                    {content}
                </span>
            </label>
        </div>
    )
}

function FilterPart({ title, arr, cls_icon }) {
    const copy_arr = arr.map(ip => {
        return <CheckBoxValueOfFilter id_input={ip.id} content={ip.content} key={ip.id} />
    });
    return (
        <>
            <span className="text-[20px] ml-2 font-semibold flex items-center gap-2 text-mainCL">
                <i className={cls_icon + " text-[18px]"}></i>
                {title}
            </span>
            <div className="grid lg:grid-cols-2">
                {copy_arr}
            </div>
        </>
    )
}

function FilterPartPrice({ title, arr, cls_icon }) {
    const copy_arr = arr.map(ip => {
        return <CheckBoxValueOfFilter id_input={ip.id} content={ip.content} key={ip.id} />
    });
    return (
        <>
            <span className="text-[20px] font-semibold flex gap-2 text-mainCL items-center">
                <i className={cls_icon}></i>
                {title}
            </span>
            <div className="flex flex-col">
                {copy_arr}
            </div>
        </>
    )
}

// ============================= Phan Load DS
function List_Phones({ products, keySearch, base_link }) {

    const data = [];
    const key = (keySearch || "").trim().toLowerCase();
    // (keySearch || "") đảm bảo không gây lỗi undentified khi người dùng ko nhập j cả
    for (const product of products) {
        console.log(product.id);
        if (key && !product.name.trim().toLowerCase().includes(key)) {
            continue;
        }
        data.push(<ProductCard baselink={base_link} product={product} key={`${product.name}-${product.version}`} hover_out={false} width={"300px"} fs_title={"15px"} fs_text={"12px"} fs_desc={"10px"} />)
    }
    return data;
}
//============================== PHẦN SHOW PAGINATION
//============================== PHẦN SHOW THANH TÌM KIÉM
