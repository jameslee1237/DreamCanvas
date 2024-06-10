import Link from "next/link";
import React from "react";

export default function FeedPage() {
    return (
        <div className="flex flex-col">
            Feed Page
            <Link href="/feed/1">
                temp
            </Link>
        </div>
    )
}