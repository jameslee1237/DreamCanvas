import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

export const getPost = async () => {
    const currentClerk = await currentUser();
    if (currentClerk === null) {
        throw new Error("User not found");
    }

    const currentPrisma = await prisma.post.findMany();

    if (currentPrisma === null) {
        throw new Error("User not found");
    }
    return currentPrisma;
}