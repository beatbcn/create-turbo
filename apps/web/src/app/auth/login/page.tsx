import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { LoginForm } from "./form";

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="-mt-16 min-h-screen w-full pt-16 lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Login to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden overflow-hidden bg-muted lg:block">
        <Image
          src="/assets/map.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full -rotate-12 scale-150 object-cover opacity-20"
        />
      </div>
    </div>
  );
}
