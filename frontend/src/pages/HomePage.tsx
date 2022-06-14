import React from "react";
import HomeForm from '~components/Home/HomeForm'

function HomePage() {
    return (
        <div className="staking w-full">
            <section className="w-full md:w-560px lg:w-560px xl:w-560px m-auto relative xs:px-2">
                <div className="flex flex-row justify-between items-center">
                    <h1 className={"text-white text-3xl"}>
                        Register
                    </h1>
                </div>
                <div className={"bg-cardBg rounded-2xl p-5 mb-2 mt-5"}>
                    <HomeForm />
                </div>
            </section>
        </div>
    )
}

export default HomePage;
