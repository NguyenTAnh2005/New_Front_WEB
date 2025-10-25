import { useState, useEffect } from "react"
import { company, ram, rom, os, chip, support } from "./data";
import { ProductCard } from "../../components/product_card";
import { scrollToTopSmooth } from "../../utils/scroll_top_smooth";
import { Input } from "../../components/login_signup_forgotpass/input.jsx";

export function PhonesPage() {
    const [arrPhones, setArrPhones] = useState([]);
    const [valueInput, setValueInput] = useState("");
    const [keySearch, setKeySearch] = useState("");
    const [expand, setExpand] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState({});

    // BỔ SUNG: State để lưu tổng số trang và trạng thái tải
    const [maxPage, setMaxPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    //=== Hàm xử lý thay đổi Filter CheckBox
    function handleChangeFilterCheckBox(type, value, isChecked) {
        setFilterCriteria((prev) => {
            const current_values = prev[type] || [];
            if (isChecked) {
                if (!current_values.includes(value)) {
                    return { ...prev, [type]: [...current_values, value] };
                }
            }
            else {
                return { ...prev, [type]: current_values.filter(v => v !== value) };
            }
            return prev;
        });
        // Trả về trang đầu tiên sau khi lọc
        setCurrentPage(1);
    }

    //=== Các State cho Sort + Pagnation 
    const [sortMode, setSortMode] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // ===Cập nhật curent Page khi nhân next hoặc Prev
    function handleControlCurrentPage(value) {
        if (value === "Prev") {
            // maxPage được lấy từ Backend
            currentPage > 1 && setCurrentPage((prev) => prev - 1);
            scrollToTopSmooth();
        }
        else if (value === "Next") {
            // maxPage được lấy từ Backend
            currentPage < maxPage && setCurrentPage((prev) => prev + 1);
            scrollToTopSmooth();
        }
    }

    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"

    function changeModeExpand() {
        scrollToTopSmooth();
        setTimeout(() => {
            setExpand((prev) => !prev);
        }, 300);

    }

    // ===============================================
    // HÀM MỚI: GỌI API ĐỂ LỌC, SẮP XẾP, VÀ PHÂN TRANG
    // ===============================================
    async function fetchFilteredProducts() {
        setIsLoading(true); // Bắt đầu tải

        // 1. Xây dựng Tham số Truy vấn (Query Parameters)
        const params = new URLSearchParams();

        // Thêm các tham số từ State
        if (keySearch) {
            params.append('search', keySearch); // search=tên_sản_phẩm
        }

        // Thêm tham số Lọc (Filter)
        Object.entries(filterCriteria).forEach(([type, values]) => {
            if (values.length > 0) {
                // Backend sẽ nhận chuỗi: company=Nubia,Xiaomi&ram=8,12
                params.append(type, values.join(','));
            }
        });

        // Thêm tham số Sắp xếp (Sort)
        params.append('sort', sortMode); // sort=Asc/Desc/default

        // Thêm tham số Phân trang (Pagination)
        params.append('page', currentPage);
        params.append('limit', itemsPerPage);

        // 2. Gọi API Backend (Sử dụng endpoint thực tế của bạn)
        try {
            // Ví dụ: GET /api/phones?search=...&company=...&page=...
            const response = await fetch(`/api/phones?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Backend PHẢI trả về JSON có products và maxPage (hoặc totalCount)
            const data = await response.json();

            // 3. Cập nhật State
            setArrPhones(data.products || []); // Danh sách sản phẩm đã được lọc
            setMaxPage(data.maxPage || 1);     // Tổng số trang từ Backend

        } catch (error) {
            console.error("Error fetching filtered products:", error);
            setArrPhones([]);
            setMaxPage(1);
        } finally {
            setIsLoading(false); // Kết thúc tải
        }
    }


    // ===============================================
    // EFFECT MỚI: CHẠY LẠI KHI CÁC TIÊU CHÍ THAY ĐỔI
    // ===============================================
    useEffect(() => {
        // Hàm này sẽ được gọi mỗi khi keySearch, filterCriteria, sortMode, hoặc currentPage thay đổi
        fetchFilteredProducts();
    }, [keySearch, filterCriteria, sortMode, currentPage]);

    // Bây giờ, arrPhones đã là danh sách đã được lọc và phân trang.
    const currentProducts = arrPhones;
    // maxPage đã được cập nhật từ Backend

    return (
        <div className="py-5 flex flex-col relative animate__animated animate__fadeIn">
            {/* ============================ PHẦN SEARCH BAR  */}
            <div className="flex flex-col gap-0 lg:flex-row lg:gap-5 justify-center w-full items-center mb-3 ">
                <SearchBar setKeySearch={setKeySearch} valueInput={valueInput} setValueInput={setValueInput} setCurrentPage={setCurrentPage} />
                <ModeSortPrice sortMode={sortMode} setSortMode={setSortMode} />
            </div>

            {/* ============================ PHẦN LIST PHONES  */}
            <div className={`grid gap-4 px-5 grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 z-0 sm:grid-cols-2 w-[90%] mx-auto`}>

                {/* HIỂN THỊ LOADING HOẶC SẢN PHẨM */}
                {isLoading ? (
                    <div className="w-full col-span-full text-center py-10">
                        <span className="text-[24px] font-semibold text-mainCL">Loading products...</span>
                    </div>
                ) : (
                    <List_Phones allproducts={currentProducts} base_link={base_link} hover_out={false} valueInput={valueInput} />
                )}
            </div>
            {/* ============================ PHẦN MÀN ĐEN CHE NỘI DUNG KHI MỞ FILTER VÀ NGĂN KO CHO CLICK BÊN NGOÀI FILTER */}
            <div className={`absolute bg-black w-full top-0 left-0 h-[100%]
                 ${!expand ? "opacity-0 pointer-events-none" : "opacity-40 pointer-events-auto "}`}>
            </div>
            { /*==============================Phần filter  */}
            <div className={`absolute w-auto ml-3
                ${!expand ? "pointer-events-none" : "pointer-events-auto "}`}>
                <Filter expand={expand} changeModeExpand={changeModeExpand} handleChangeFilterCheckBox={handleChangeFilterCheckBox} />
            </div>

            {/* ============================ PHẦN ICON BỘ LỌC  */}
            <div className={`bg-mainCL text-white text-xl p-0 py-1 px-2 z-10 rounded-full fixed top-25 left-5 cursor-pointer
                transition-all ease-in-out duration-500 ${expand ? " opacity-0 -translate-x-full " : "opacity-100 translate-x-0 "}`}>
                <i className="bi bi-funnel-fill" onClick={changeModeExpand}>Filter</i>
            </div>
            {/* ============================ PHẦN PAGINATION  */}
            <div className="mt-10">
                {/* Sử dụng maxPage đã được cập nhật từ Backend */}
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
function Filter({ expand, changeModeExpand, handleChangeFilterCheckBox }) {

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
                        <FilterPart arr={company} title={"Brand"} type="company" cls_icon={"bi bi-buildings-fill"} handleChangeFilterCheckBox={handleChangeFilterCheckBox} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={ram} title={"Ram"} type="ram" cls_icon={"bi bi-memory"} handleChangeFilterCheckBox={handleChangeFilterCheckBox} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={rom} title={"Rom"} type="rom" cls_icon={"bi bi-database-fill"} handleChangeFilterCheckBox={handleChangeFilterCheckBox} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={os} title={"Operating System"} type="os" cls_icon={"bi bi-android2"} handleChangeFilterCheckBox={handleChangeFilterCheckBox} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={chip} title={"Chip"} type="chip" cls_icon={"bi bi-cpu-fill"} handleChangeFilterCheckBox={handleChangeFilterCheckBox} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={support} title={"Suport"} type="support" cls_icon={"bi bi-plus-circle-fill"} handleChangeFilterCheckBox={handleChangeFilterCheckBox} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPartPrice title={"Price"} cls_icon={"bi bi-cash-coin"} />
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
function CheckBoxValueOfFilter({ id_input, content, type, handleChangeFilterCheckBox }) {
    const [clicked, setClicked] = useState(false);
    function changeModeInput() {
        handleChangeFilterCheckBox(type, content, !clicked);
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
                    {content}{typeof content === "number" ? " GB" : ""}
                </span>
            </label>
        </div>
    )
}
//---------------------------- PHẦN Nhóm các input cùng loại
function FilterPart({ title, arr, cls_icon, handleChangeFilterCheckBox, type }) {
    const copy_arr = arr.map(ip => {
        return <CheckBoxValueOfFilter id_input={ip.id} content={ip.content} key={ip.id} handleChangeFilterCheckBox={handleChangeFilterCheckBox} type={type} />
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
function FilterPartPrice({ title, cls_icon }) {
    return (
        <>
            <span className="text-xl font-semibold flex gap-2 text-mainCL items-center">
                <i className={cls_icon}></i>
                {title}
            </span>
            <div className="flex flex-col px-3">
                <Input type={"number"} label_content={"Min Price"} id_input={"ft_a7_ip1"} cls_icon={"bi bi-coin"} />
                <Input type={"number"} label_content={"Max Price"} id_input={"ft_a7_ip2"} cls_icon={"bi bi-coin"} />
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
    const [falseCurrentPage, setFalseCurrentPage] = useState(false);
    function handleClickSetValuePageInput(e) {
        setValuePageInput(e.target.value);
    };
    function handleSetCurrentPage() {
        const pageNumber = Number(valuePageInput);
        if (pageNumber >= 1 && pageNumber <= max_page) {
            setCurrentPage(pageNumber);
            scrollToTopSmooth();
            setFalseCurrentPage(false);
        }
        else {
            setFalseCurrentPage(true);
        }
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
            {falseCurrentPage && <div className="w-[100%] text-center text-red-600 font-semibold">Invalid page number</div>}

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
