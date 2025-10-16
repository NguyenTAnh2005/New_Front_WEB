import { useLocation } from "react-router-dom"
import { use, useState } from "react"
import { useImmer } from "use-immer"
import { list_nav, list_action } from "./data.js"
import { Link } from "react-router-dom";
export function Header() {
    const [navLinks, setNavLinks] = useState(list_nav);
    const [expand, setExpand] = useState(false);
    const [isLogIn, setIsLogIn] = useState(true);
    function changeMode() {
        setExpand(!expand);
    }
    return (
        <>
            {/* ================== MAIN HEADER ---------LG ========================*/}
            <div className="flex flex-row justify-between items-center w-full bg-white px-2 sticky top-0 shadow-md z-50">
                <NavBrand />
                <NavLink navLinks={navLinks} cls_name="hidden lg:flex lg:gap-7" />
                <NavActions actions={list_action} cls_name="hidden lg:flex lg:gap-5 w-[20%]" />
                <ToggleNav changeMode={changeMode} />
                <NavAccount isLogIn={isLogIn} cls_name="hidden lg:flex" />
            </div>
            {/*===================MOBILE ====================================== */}
            <div className={`lg:hidden flex flex-col gap-5 bg-white transition-all duration-500 ease-linear absolute 
                overflow-hidden shadow-md w-full lg:w-1/2 pl-5 ml-auto ${expand ? "max-h-[900px]" : "max-h-0"}`}>
                <NavLink navLinks={navLinks} cls_name="lg:hidden flex flex-col gap-3 mt-5" />
                <NavActions actions={list_action} cls_name="lg:hidden flex flex gap-5 mx-auto" />
                <div className="flex justify-center mb-5">
                    <NavAccount isLogIn={isLogIn} cls_name="lg:hidden flex" />
                </div>
            </div>

        </>
    )
}
function NavBrand() {
    return (
        <a className="flex items-center text-mainCL text-2xl md:text-3xl lg:text-4xl py-4" href="/Home">
            <i className="bi bi-phone me-1"></i>
            <span className="me-2 font-bold"> Phone </span>
            <span className="font-thin"> React</span>
        </a>
    )
}
function NavLink({ navLinks, cls_name = "" }) {
    const location = useLocation();
    const nav_links = navLinks.map(ni => (<NavItem nav_item={ni} key={ni.id} location={location} />))
    return (
        <ul className={cls_name + " list-none"} >
            {nav_links}
        </ul>
    )
}
function NavItem({ nav_item, location }) {
    return (
        <li className={`text-lg xl:text-xl text-gray-400 font-medium relative group hover:text-mainCL transition-colors duration-300 ease-linear ${location.pathname === `/${nav_item.content}` && "text-mainCL"}`}>
            <Link to={"/" + nav_item.content} >
                {nav_item.content}
            </Link >
            <span className=" hidden lg:block absolute  h-0.5 bg-mainCL translate-y-3 w-0 group-hover:w-full group-hover:-translate-x-[0%] z-10 bottom-0 left-0 translate-x-[50%] transition-all ease-linear duration-400">

            </span>
        </li >
    )
}
function NavActions({ actions, cls_name = "" }) {
    const list_act = actions.map(act => <Action action={act} key={act.id} />);
    return (
        <div className={cls_name}>
            {list_act}
        </div>
    )
}
function Action({ action }) {
    return (
        <button id={action.id} className="flex flex-col xl:flex-row xl:justify-center items-center text-mainCL group 
        hover:text-white rounded-lg hover:pr-6 hover:bg-mainCL hover:shadow-lg hover:shadow-mainCL transition-all duration-400 ease-linear px-4 py-2">
            <i className={action.clsicon + " text-2xl group-hover:ms-0 align-middle"}></i>
            <span className="hidden text-xl group-hover:block transition-all duration-400 ease-linear">{action.content}</span>
        </button>
    )
}
function ToggleNav({ changeMode }) {
    return (
        <i className="ri-menu-fill text-4xl bg-white p-2 rounded-lg block lg:hidden" onClick={changeMode}></i>
    )

}
function NavAccount({ isLogIn, cls_name = "" }) {
    return (
        <button className={`flex flex-col xl:flex-row xl:justify-center items-center text-mainCL group lg:w-[10%]
        hover:text-white rounded-lg hover:pr-6 hover:bg-mainCL hover:shadow-lg hover:shadow-mainCL transition-all duration-400 ease-linear px-4 py-2 ${cls_name}`}>
            <i className="bi bi-person-vcard text-2xl group-hover:ms-0 align-middle"></i>
            <span className="hidden text-xl group-hover:block transition-all duration-400 ease-linear">
                {`${isLogIn ? "Hello" : "Log In"}`}
            </span>
        </button>
    )
}