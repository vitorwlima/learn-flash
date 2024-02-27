import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="mt-60 flex items-center justify-center">
      <SignUp />
    </div>
  );
}
