"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    GlobalApi.registerUser(username, email, password).then(
      (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.jwt);
        toast("Account created succesfully");
        router.push("/");
        setIsloading(false);
      },
      (e) => {
        toast(e.response?.data?.error?.message);
        setIsloading(false);
      }
    );
  };
  return (
    <div className=" flex  items-baseline justify-center my-10">
      <div className=" flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200 rounded-md">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={200}
            height={200}
            alt="logo"
            className=" rounded-lg"
          />
        </Link>
        <h2 className=" font-bold text-3xl mt-2">Create Account</h2>
        <h2 className=" text-gray-500 mt-2">
          Enter your Email and password to create account
        </h2>
        <div className=" w-full flex flex-col gap-5 mt-7">
          <form
            action=""
            className=" flex flex-col gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="name@example.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={!username || !password || !email} type="submit">
              {isLoading ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          <div className="flex items-center flex-col md:flex-row gap-2">
            <p className=" ">Already have an account?</p>
            <Link
              href={"/sign-in"}
              className=" bg-green-600 p-2 rounded-md text-white font-bold hover:bg-slate-200 hover:text-green-600 transition-all ease-in-out"
            >
              Click here to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
