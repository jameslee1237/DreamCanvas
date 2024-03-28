"use client";
import BackToHomeButton from "@/components/BacktoHome";
import "../globals.css";

export default function ExperienceDetailLayout ({
    children,
} : {
    children: React.ReactNode
}) {

    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#3c023e]">    
                <div className="flex flex-col w-[20vw]">
                    <div className="flex flex-col items-center mt-8">
                        <h1 className="font-bold text-white text-[30px] mt-2 mb-6">DreamCanvas</h1>
                    </div>
                </div>
                <div className="flex">
                    {children}
                </div>
            </div>
            <BackToHomeButton />
        </>
    )
}