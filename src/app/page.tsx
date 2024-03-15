'use client';
import { UserButton } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-in");
  }

  return (
    <div className="flex w-full h-full bg-white">
      <div className="items-center justify-center">
        <UserButton />
          <button 
            className="bg-red-300"
            onClick={handleClick}
          >Sign in</button>
      </div>
    </div>
  );
}
