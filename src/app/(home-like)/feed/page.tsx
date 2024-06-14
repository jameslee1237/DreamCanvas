import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";

export default function FeedPage() {
    return (
        redirect("/main")
    )
}

