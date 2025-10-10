import { useState } from "react"
import { useImmer } from "use-immer"
import { list_nav, list_action } from "./data.js"
export function Header() {
    const [navLinks, setNavLinks] = useState(list_nav);
    const [expand, setExpand] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    function changeMode() {
        setExpand(!expand);
    }
    return (
        <>
            {/* ================== MAIN HEADER ---------LG ========================*/}
            <div className="flex flex-row justify-between items-center w-full bg-white px-2 sticky top-0 shadow-xl">
                <NavBrand />
                <NavLink navLinks={navLinks} cls_name="hidden lg:flex lg:gap-7" />
                <NavActions actions={list_action} cls_name="hidden lg:flex lg:gap-10 w-[25%]" />
                <ToggleNav changeMode={changeMode} />
                <NavAccount isLogIn={isLogIn} cls_name="hidden lg:block" />
            </div>
            {/*===================MOBILE ====================================== */}
            <div className={`lg:hidden flex flex-col gap-5 bg-slate-100 transition-all duration-300 ease-linear 
                overflow-hidden shadow-md w-1/2 pl-5 ml-auto ${expand ? "max-h-[900px]" : "max-h-0"}`}>
                <NavLink navLinks={navLinks} cls_name="lg:hidden flex flex-col gap-3 mt-5" />
                <NavActions actions={list_action} cls_name="lg:hidden flex flex gap-5 mx-auto" />
                <div className="flex justify-center mb-5">
                    <NavAccount isLogIn={isLogIn} cls_name="lg:hidden block" />
                </div>
            </div>

        </>
    )
}
function NavBrand() {
    return (
        <div className="flex items-center text-orange-600 text-3xl md:text-4xl lg:text-5xl py-5">
            <i className="ri-smartphone-line font-thin me-1"></i>
            <span className="me-2 font-bold"> Phone </span>
            <span className="font-thin"> React</span>
        </div>
    )
}
function NavLink({ navLinks, cls_name = "" }) {
    const nav_links = navLinks.map(ni => (<NavItem nav_item={ni} key={ni.id} />))
    return (
        <ul className={cls_name + " list-none"} >
            {nav_links}
        </ul>
    )
    // hidden gap-5 lg:flex lg:flex-row
}
function NavItem({ nav_item }) {
    return (
        <li className="hover:text-orange-500 hover:-translate-y-0.5 transition-all ease-linear duration-300 text-xl text-gray-600 font-medium uppercase">
            <a href={"/" + nav_item.content}>
                {nav_item.content}
            </a>
        </li>
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
        <button id={action.id} className="flex items-center text-orange-600 group 
        hover:text-white rounded-lg hover:min-w-20 hover:pr-6 hover:bg-orange-600 hover:shadow-lg transition-all duration-400 ease-linear px-4 py-2">
            <i className={action.clsicon + " text-2xl group-hover:ms-0 me-2"}></i>
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
        <button className={`flex items-center text-orange-600 group 
        hover:text-white rounded-lg hover:pr-6 hover:bg-orange-600 hover:shadow-lg transition-all duration-400 ease-linear py-2 ${cls_name}`}>
            <i className="ri-account-circle-line text-2xl group-hover:ms-4 me-2"></i>
            <span className="hidden text-xl group-hover:block transition-all duration-400 ease-linear">
                {`${isLogIn ? "Hello" : "Log In"}`}
            </span>
        </button>
    )
}