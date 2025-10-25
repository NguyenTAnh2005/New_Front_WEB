export function TextArea({ type, label_content, id_input, cls_icon, placeholder }) {
    return (
        <div className=" flex flex-col">
            <label htmlFor={id_input} className="text-black font-semibold mb-1 capitalize -translate-x-2">{label_content}</label>
            <div className="flex relative">
                <textarea type={type} id={id_input} name={id_input}
                    placeholder={placeholder}
                    className="w-full border border-1 border-gray-400
                        rounded-md py-1 focus:outline-none indent-[40px] text-gray-600" />
                <i className={`${cls_icon} absolute text-mainCL text-[20px] 
                    rounded-md top-0.5 left-0 translate-x-[50%] `}></i>
            </div>
        </div>
    )
}