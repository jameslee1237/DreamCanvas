import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <SignUp 
      signInUrl={"/sign-in"}
      afterSignInUrl={"/main"}
      afterSignUpUrl={"/main"}
    />
  );
}