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
            <div>
                {children}
            </div>
            <BackToHomeButton />
        </>
    )
}