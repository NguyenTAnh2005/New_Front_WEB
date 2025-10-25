import { TextArea } from "../../components/text_area"
export function ContactsPage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <p className="text-[50px] font-semibold text-mainCL mb-10">Contacs Us</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 xl:gap-16 mb-10">
                    <InfoUs cls_icon={"bi bi-envelope-at"} title={"Email Us"} content_1={"23050118@student.bdu.edu.vn"} content_2={"aovFF@garena.com"} />
                    <InfoUs cls_icon={"bi bi-telephone-plus"} title={"Call Us"} content_1={"+84 328884320"} content_2={"Open 24/7"} />
                    <InfoUs cls_icon={"bi bi-geo-alt"} title={"Visit Us"} content_1={"504 Binh Duong Street"} content_2={"Hiep Thanh, Ho Chi Minh City"} />
                    <div className="col-span-full">
                        <AboutUs />
                    </div>
                </div>
            </div>
            <div className="w-[90%] mx-auto py-10">
                <SendUs />
            </div>
        </>

    )
}

function InfoUs({ cls_icon, title, content_1, content_2 }) {
    return (
        <div className="bg-white flex flex-col p-5 rounded-md border border-gray-100 shadow-md w-full min-w-[240px]">
            <div className="mb-5">
                <i className={`${cls_icon} px-2 rounded-md text-3xl bg-orange-100 text-mainCL`}></i>
            </div>
            <span className="text-xl font-bold mb-3">{title}</span>
            <span className="text-base font-light">{content_1}</span>
            <span className="text-base font-light">{content_2}</span>

        </div>
    )
}

function AboutUs() {
    return (
        <div className="bg-white flex flex-col p-5 rounded-md border border-gray-100 shadow-md w-full">
            <div className="mb-5">
                <i className={`bi bi-people px-2 rounded-md text-3xl bg-orange-100 text-mainCL`}></i>
            </div>
            <span className="text-xl font-bold mb-3">About Us</span>
            <span className="text-base font-light">Binh Duong University</span>
            <span className="text-base font-light">Faculity Of Infomation, Robotics, and Artificial Intelligence</span>
            <p className="mt-3 font-semibold">Member Of Group (2023-2027)</p>
            <ul className="list-none text-xs font-thin">
                <li>Nguyen Tuan Anh</li>
                <li>Le Ngoc Sang</li>
                <li>Nguyen Manh Phat</li>
                <li>Le Dinh Tuyen</li>
            </ul>
        </div>
    )
}
function SendUs() {
    return (
        <form className="bg-white px-10 rounded-xl shadow-xl py-10">
            <div className="text-center text-5xl capitalize text-mainCL font-semibold mb-10">Send us Message</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input type={"text"} label_content={"Your Name"} placeholder={"Enter Your Name"} id_input={"ct_ip1"} cls_icon={"bi bi-person-vcard"} />
                <Input type={"email"} label_content={"Email Address"} placeholder={"Your Email Address"} id_input={"ct_ip2"} cls_icon={"bi bi-envelope-at"} />
                <div className="col-span-full">
                    <Input type={"text"} label_content={"Subject"} placeholder={"How can we help?"} id_input={"ct_ip3"} cls_icon={"bi bi-person-vcard"} />
                </div>
                <div className="col-span-full">
                    <TextArea type={"text"} label_content={"Message"} placeholder={"Tell us about your problem..... :D"} id_input={"ct_ip4"} cls_icon={"bi bi-chat-dots"} />
                </div>
            </div>
            <button type="submit" className="bg-mainCL text-white text-2xl py-2 px-4 rounded-md mt-10">
                <i className="bi bi-send-arrow-up"></i>
                <span className="ms-2">Send Message</span>
            </button>
        </form>
    )
}

export function Input({ type, label_content, id_input, cls_icon, placeholder }) {
    return (
        <div className=" flex flex-col">
            <label htmlFor={id_input} className="text-black font-semibold mb-1 capitalize -translate-x-2">{label_content}</label>
            <div className="flex relative">
                <input type={type} id={id_input} name={id_input}
                    placeholder={placeholder}
                    className="w-full border border-1 border-gray-400
                        rounded-md py-1 focus:outline-none indent-[40px] text-gray-600" />
                <i className={`${cls_icon} absolute text-mainCL text-[20px] 
                    rounded-md top-0.5 left-0 translate-x-[50%] `}></i>
            </div>
        </div>
    )
}
