'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  }

  const handleSignUp = () => {
    router.push("/sign-up")
  }

  return (
    <div className="flex w-screen h-screen bg-white items-center justify-center">
      <div className="bg-blue-300 text-center justify-center flex flex-col w-[33vw] h-[66vh] rounded-2xl">
        <h1 className="font-bold text-[36px] mb-16">Dream<span className="font-bold text-[36px]">Canvas</span></h1>
        <div className="text-[20px] flex flex-col items-center">
          <button 
            className="mt-16 w-fit bg-green-400 hover:bg-green-700 rounded-md px-4 py-2"
            onClick={handleSignIn}
          >Sign in</button>
          <button 
            className="mt-4 w-fit bg-green-400 hover:bg-green-700 rounded-md px-4 py-2"
            onClick={handleSignUp}
          >Sign up</button>
        </div>
      </div>
    </div>
  );
}
