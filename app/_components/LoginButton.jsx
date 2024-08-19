"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  return (
    <Link href={"/create-account"}>
      <Button className="bg-green-600">Login</Button>
    </Link>
  );
};

export default LoginButton;
