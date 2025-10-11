export function SubscribleForm() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 py-5 lg:py-12 bg-orange-600 text-white px-10 lg:px-0 rounded-lg mt-1">
            <div className="flex flex-col items-center lg:my-auto">
                <span className="lg:text-[36px] text-[28px] text-center font-sans font-bold">Subscribe to Our Newsletter</span>
                <span className="lg:text-[18px] text-[16px] text-center">Get the latest deals and tech news delivered to your inbox</span>
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 lg:flex-row lg:gap-10 lg:mt-0">
                <input type="email" placeholder="Enter your email"
                    className="border border-gray-300 rounded-lg  w-72 sm:w-80 lg:w-96 py-2.5 pl-2.5 text-black focus:outline-none" />
                <button className="bg-white text-black rounded-xl text-[20px] xl:text-[24px] px-6 py-2
                 hover:text-orange-600 hover:bg-black
                 transition-all ease-linear duration-300">
                    Subcrible
                </button>
            </div>


        </div>

    )
}