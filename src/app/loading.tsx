import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex min-h-screen bg-[#3c023e] flex-col">
            <div className="flex flex-col w-[20vw] fixed">
                <div className="flex flex-col items-center mt-8">
                    <h1 className="font-bold text-white text-[30px] mt-2 mb-6">Dream<span className="font-bold text-[30px] text-[#FECC3D]">Canvas</span></h1>
                    <Skeleton className="w-[20vw] h-[80vh] rounded-xl ml-10" />
                </div>
            </div>
            <div className="flex flex-col w-[80vw] ml-[20vw] mt-[5vh]">
                <Skeleton className="w-[70vw] h-[40vh] rounded-xl ml-20" />
                <Skeleton className="w-[70vw] h-[30vh] rounded-xl mt-20 ml-20 " />
            </div>
        </div>
    )
}