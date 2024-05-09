import Sidebar from "@/components/Sidebar";

export default function MessageLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar>
                <div className="flex h-full w-full justify-center">
                    {children}
                </div>
            </Sidebar>
        </div>
    );
}


