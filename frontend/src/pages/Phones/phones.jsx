import { useState, useEffect } from "react"
import { arr1_company, arr2_ram, arr3_rom, arr4_os, arr5_chip, arr_6_support, arr_7_price } from "./data";
import { ProductCard } from "../../components/product_card";
import { scrollToTopSmooth } from "../../utils/scroll_top_smooth";
import { flatArrObjPhone } from "../../utils/flat_arr_obj_phone.jsx";

export function PhonesPage() {
    const [arrPhones, setArrPhones] = useState([]);
    const [valueInput, setValueInput] = useState("");
    const [keySearch, setKeySearch] = useState("");
    const [expand, setExpand] = useState(false);
    //=== Các State cho Sort + Pagnation 
    const [sortMode, setSortMode] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // ===Cập nhật curent Page khi nhân next hoặc Prev
    function handleControlCurrentPage(value) {
        if (value === "Prev") {
            currentPage > 1 && setCurrentPage((prev) => prev - 1);
            scrollToTopSmooth();
        }
        else if (value === "Next") {
            currentPage < maxPage && setCurrentPage((prev) => prev + 1);
            scrollToTopSmooth();
        }
    }

    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"

    function changeModeExpand() {
        // === THÊM ĐOẠN NÀY ĐỂ CUỘN LÊN ĐẦU TRANG ===
        scrollToTopSmooth();
        setTimeout(() => {
            setExpand((prev) => !prev);
        }, 300);

    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await flatArrObjPhone("/all-product.json");
                setArrPhones(response);
            }
            catch (error) { console.error("Error fetching data:", error); }
        }
        fetchData();
    }, []);

    // Lọc sản phẩm theo search trước
    // Hàm filter thì khi trả về nếu true thì giữ lại, false thì loại bỏ
    const filteredProducts = arrPhones.filter(product => {
        if (!keySearch) return true;
        const key = keySearch.trim().toLowerCase();
        const productName = product.phone_name.trim().toLowerCase();
        return productName.includes(key);
    });
    //Sort sản phẩm
    if (sortMode === "Asc") {
        filteredProducts.sort((a, b) => a.variant_ph_new_price - b.variant_ph_new_price);
    }
    else if (sortMode === "Desc") {
        filteredProducts.sort((a, b) => b.variant_ph_new_price - a.variant_ph_new_price);
    }
    // Tính toán phân trang sau khi đã lọc
    const maxPage = Math.ceil(filteredProducts.length / itemsPerPage);
    const startPdt = (currentPage - 1) * itemsPerPage;
    const endPdt = startPdt + itemsPerPage;
    const currentProducts = filteredProducts.slice(startPdt, endPdt);

    return (
        <div className="py-5 flex flex-col relative animate__animated animate__fadeIn">
            {/* ============================ PHẦN SEARCH BAR  */}
            <div className="flex flex-col  gap-0 lg:flex-row lg:gap-5 justify-center w-full items-center mb-3 ">
                <SearchBar setKeySearch={setKeySearch} valueInput={valueInput} setValueInput={setValueInput} setCurrentPage={setCurrentPage} />
                <ModeSortPrice sortMode={sortMode} setSortMode={setSortMode} />
            </div>
            {/* ============================ PHẦN LIST PHONES  */}
            <div className={`grid gap-4 px-5 grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 z-0 sm:grid-cols-2 w-[90%] mx-auto`}>

                <List_Phones allproducts={currentProducts} base_link={base_link} hover_out={false} valueInput={valueInput} />
            </div>
            {/* ============================ PHẦN MÀN ĐEN CHE NỘI DUNG KHI MỞ FILTER VÀ NGĂN KO CHO CLICK BÊN NGOÀI FILTER */}
            <div className={`absolute bg-black w-full top-0 left-0 h-[100%] 
                 ${!expand ? "opacity-0 pointer-events-none" : "opacity-40 pointer-events-auto "}`}>
            </div>
            { /*==============================Phần filter  */}
            <div className={`absolute w-auto ml-3 
                ${!expand ? "pointer-events-none" : "pointer-events-auto "}`}>
                <Filter expand={expand} changeModeExpand={changeModeExpand} />
            </div>
            {/* ============================ PHẦN ICON BỘ LỌC  */}
            <div className={`bg-mainCL text-white text-xl p-0 py-1 px-2 z-10 rounded-full fixed top-25 left-5 cursor-pointer
                transition-all ease-in-out duration-500 ${expand ? " opacity-0 -translate-x-full " : "opacity-100 translate-x-0 "}`}>
                <i className="bi bi-funnel-fill" onClick={changeModeExpand}>Filter</i>
            </div>
            {/* ============================ PHẦN PAGINATION  */}
            <div className="mt-10">
                <Pagination current_page={currentPage} setCurrentPage={setCurrentPage} max_page={maxPage} controlFunction={handleControlCurrentPage} />
            </div>
        </div>
    )
}
// ============================= Phan Load DS
function List_Phones({ allproducts, base_link, valueInput }) {
    const data = allproducts.map(product => (
        <ProductCard baselink={base_link} product={product} key={product.variant_key} hover_out={false}
            max_width={"200px"} fs_title={"base"} fs_text={"sm"} fs_desc={"xs"}
        />
    ));
    if (data.length === 0) {
        return (
            <div className="w-full col-span-full text-center">
                <span className="text-center col-span-full text-[20px] font-semibold">No products found with "{valueInput}"</span>
            </div>)
    }
    return data;
}
// ============================= PHẦN FILTER
//---------------------------- FILTER
function Filter({ expand, changeModeExpand }) {

    return (
        <>
            <div className={`w-full transition-all ease-in-out duration-500 ${expand ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}>
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
        </>
    )
}
//---------------------------- CHECKBOX CỦA FILTER
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
//---------------------------- PHẦN Nhóm các input cùng loại
function FilterPart({ title, arr, cls_icon }) {
    const copy_arr = arr.map(ip => {
        return <CheckBoxValueOfFilter id_input={ip.id} content={ip.content} key={ip.id} />
    });
    return (
        <>
            <span className="text-xl ml-2 font-semibold flex items-center gap-2 text-mainCL">
                <i className={cls_icon + " text-lg"}></i>
                {title}
            </span>
            <div className="grid lg:grid-cols-3">
                {copy_arr}
            </div>
        </>
    )
}
//---------------------------- PHẦN Nhóm các input cùng loại PRICE
function FilterPartPrice({ title, arr, cls_icon }) {
    const copy_arr = arr.map(ip => {
        return (<CheckBoxValueOfFilter id_input={ip.id} content={ip.content} key={ip.id} />)
    });
    return (
        <>
            <span className="text-xl font-semibold flex gap-2 text-mainCL items-center">
                <i className={cls_icon}></i>
                {title}
            </span>
            <div className="flex flex-col">
                {copy_arr}
            </div>
        </>
    )
}
//============================== PHẦN SHOW THANH TÌM KIÉM
function SearchBar({ valueInput, setValueInput, setKeySearch, setCurrentPage }) {
    function handleInputChange(e) {
        setValueInput(e.target.value);
    }
    function handleSearch() {
        setKeySearch(valueInput);
        setCurrentPage(1);
    }
    return (
        <div className="flex my-5 w-[75%] md:w-[50%]">
            <input type="text" className="w-full px-5 rounded-l-md py-2 outline-none" placeholder="Seach Phone....." value={valueInput} onChange={handleInputChange} />
            <button type="button" onClick={handleSearch}>
                <i className="bi bi-search py-2 bg-mainCL text-white px-3 rounded-r-md"></i>
            </button>
        </div>
    )
}
//============================== PHẦN SHOW PAGINATION
function Pagination({ current_page, controlFunction, setCurrentPage, max_page }) {
    const [valuePageInput, setValuePageInput] = useState();
    function handleClickSetValuePageInput(e) {
        setValuePageInput(e.target.value);
    };
    function handleSetCurrentPage() {
        const pageNumber = Number(valuePageInput);
        if (pageNumber >= 1 && pageNumber <= max_page) {
            setCurrentPage(pageNumber);
        }
        else { alert(`Please enter a page number between 1 and ${max_page}`); }
    }

    return (
        <>
            <div className=" w-[55%] lg:w-[30%] mx-auto flex justify-center gap-1">
                <CellControl control={"Prev"} controlFunction={() => { controlFunction("Prev") }} />
                <Cell index_page={"Page " + current_page} />
                <CellControl control={"Next"} controlFunction={() => { controlFunction("Next") }} />
            </div>
            <div className="mx-auto flex justify-center mt-3 items-center">
                <span className="me-5">Go to page:</span>
                <input type="number" className="outline-none indent-4 w-20 py-1 rounded-l-md border border-gray-400" onChange={handleClickSetValuePageInput} />
                <button className="bg-mainCL text-white text-base px-2 py-1 rounded-r-md border border-mainCL" onClick={handleSetCurrentPage}>OK</button>
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
function CellControl({ control, controlFunction }) {
    return (
        <div
            title={`Go to ${control} page`}
            onClick={controlFunction}
            className="text-mainCL text-base bg-white px-2 py-2 cursor-pointer font-semibold border border-gray-300">
            <span>{control}</span>
        </div>
    )
}
//============================== PHẦN SORT PRICE
function ModeSortPrice({ sortMode, setSortMode }) {
    const [openOption, setOpenOption] = useState(false);
    function handleChangeModeSelect() {
        setOpenOption((prev) => !prev);
    }
    return (
        <div>
            <div className="text-mainCL flex bg-white border justify-between border-gray-300 px-3 py-2 cursor-pointer gap-20" onClick={handleChangeModeSelect}>
                <span>{sortMode}</span>
                <i className={`bi bi-caret-down-fill transition-transform duration-500 ease-in-out ${openOption ? "rotate-180" : "rotate-0"}`} ></i>
            </div>
            {openOption && (
                <div className="w-auto relative">
                    <div className="absolute mt-1 z-10 w-full">
                        <ModeOption content={"default"} setSortMode={setSortMode} closeSelect={handleChangeModeSelect} />
                        <ModeOption content={"Asc"} setSortMode={setSortMode} closeSelect={handleChangeModeSelect} />
                        <ModeOption content={"Desc"} setSortMode={setSortMode} closeSelect={handleChangeModeSelect} />
                    </div>
                </div>

            )}
        </div>
    )
}
//============================== PHẦN OPTION SORT PRICE
function ModeOption({ content, setSortMode, closeSelect }) {
    function handleSelect() {
        setSortMode(content);
        closeSelect();
    }
    return (
        <div className="text-mainCL bg-white border border-gray-300 px-2 py-1 cursor-pointer hover:bg-gray-200" onClick={handleSelect}>
            <span>{content}</span>
        </div>
    )
}

//=============================== Ham loc Sp theo gia tri checkbox

